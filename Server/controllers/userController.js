const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const supabase = require("../utils/client");
const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");
const { allPrograms } = require("./programController");
const determineEligibilityForAllPrograms = require("../utils/determineEligibility");

const createAuthClient = (auth) => {
  try {
    const client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_PUBLIC_ANON_KEY,
      {
        db: {
          schema: "public",
        },
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        global: {
          headers: auth
            ? {
                Authorization: auth,
              }
            : null,
        },
      }
    );

    return client;
  } catch {
    return null;
  }
};

exports.verifySession = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: "fail",
      error: "authenticationError",
      message:
        "Authentication is required. Please sign in to access this resource",
    });
  }

  const AuthJWT = authHeader.split("Bearer ")[1];

  const decodedJWT = jwt.decode(AuthJWT);

  if (Date.now() >= decodedJWT.exp * 1000) {
    return res.status(401).json({
      status: "fail",
      error: "expiredSessionError",
      message:
        "Your session has expired. Please log in again to access this resource",
    });
  }

  try {
    jwt.verify(AuthJWT, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({
      status: "fail",
      error: "invalidSessionError",
      message:
        "Your session is invalid. Please log in again to access this resource",
    });
  }

  const authClient = createAuthClient(authHeader);
  req.jwt = decodedJWT;
  req.authClient = authClient;

  next();
});

exports.verifyAdmin = catchAsync(async (req, res, next) => {
  const supabase = req.authClient;

  if (!supabase) {
    return res.status(401).json({
      status: "fail",
      error: "JWT failure - invalid JWT",
    });
  }

  const { data, error } = await supabase.from("profiles").select("role");

  if (error) {
    return res.status(404).json({
      status: "fail",
      error,
    });
  }

  const role = data[0]["role"];

  if (role != "admin") {
    return res.status(403).json({
      status: "fail",
      error: "forbiddenRouteError",
      message: "You must be an administrator to access this resource",
    });
  }

  const serviceRoleClient = createServiceRoleClient();

  req.serviceRoleClient = serviceRoleClient;

  next();
});

exports.adminStats = catchAsync(async (req, res, next) => {
  const programs = await allPrograms((adminAccess = true));

  if (!programs) {
    res.status(404).json({
      status: "fail",
      message: "Unable to retrieve programs",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      programs,
    },
  });
});

exports.adminGetUsers = catchAsync(async (req, res, next) => {
  const supabase = req.serviceRoleClient;

  if (!supabase) {
    return res.status(401).json({
      status: "fail",
      error: "JWT failure - invalid JWT",
    });
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "user");

  if (error) {
    return next(new AppError(error.message), 500);
  }

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.adminUpdateRegisteredPrograms = catchAsync(async (req, res, next) => {
  const supabase = req.serviceRoleClient;

  if (!supabase) {
    return res.status(401).json({
      status: "fail",
      error: "JWT failure - invalid JWT",
    });
  }

  const uid = req.params.id;

  const { data: selectData, error: selectError } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "user")
    .eq("id", uid);

  if (selectError) {
    return next(new AppError(error.message), 500);
  }

  if (selectData.length == 0) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  const currRegisteredPrograms = selectData[0]["registered_programs"];

  const newRegisteredPrograms = req.body["registeredPrograms"];

  const currPendingPrograms = selectData[0]["pending_programs"];

  if (!newRegisteredPrograms) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please input new registered program data into req.body.registeredPrograms",
    });
  }

  if (!Array.isArray(newRegisteredPrograms)) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please format new registered program data as a list of program IDs",
    });
  }

  for (let i = 0; i < newRegisteredPrograms.length; i++) {
    newRegisteredPrograms[i] = String(newRegisteredPrograms[i]);
  }

  const finalRegisteredPrograms = [
    ...new Set([...currRegisteredPrograms, ...newRegisteredPrograms]),
  ];

  const finalPendingPrograms = currPendingPrograms.filter((id) => {
    return newRegisteredPrograms.indexOf(id) == -1;
  });

  for (let i = 0; i < newRegisteredPrograms.length; i++) {
    newRegisteredPrograms[i] = String(newRegisteredPrograms[i]);
  }

  const { data: programSelectData, error: programSelectError } = await supabase
    .from("programs")
    .select("*")
    .in("program_id", newRegisteredPrograms);

  if (programSelectError) {
    return next(new AppError("Failure to select information", 500));
  }

  programSelectData
    .filter((program) => {
      return currRegisteredPrograms.indexOf(program.program_id) != -1;
    })
    .forEach(async (program) => {
      const updatedNumSignedUp = program.num_signed_up + 1;

      const { data: updateData, error: updateError } = await supabase
        .from("programs")
        .update({ num_signed_up: updatedNumSignedUp })
        .eq("program_id", program.program_id)
        .select();

      if (updateError) {
        return next(new AppError(updateError.message), 500);
      }
    });

  const { data: patchData, error: patchError } = await supabase
    .from("profiles")
    .update({
      registered_programs: finalRegisteredPrograms,
    })
    .eq("id", uid)
    .select();

  if (patchError) {
    return next(new AppError(patchError.message), 500);
  }

  const { data: pendingData, error: pendingError } = await supabase
    .from("profiles")
    .update({
      pending_programs: finalPendingPrograms,
    })
    .eq("id", uid)
    .select();

  res.status(201).json({
    status: "success",
    data: {
      registered_programs: patchData[0].registered_programs,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const supabase = req.authClient;

  if (!supabase) {
    return res.status(401).json({
      status: "fail",
      error: "JWT failure - invalid JWT",
    });
  }

  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    return res.status(404).json({
      status: "fail",
      error,
    });
  }

  res.status(200).json({
    status: "success",
    data,
  });
});

const createServiceRoleClient = () => {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
};

// POST signup user
exports.signup = catchAsync(async (req, res, next) => {
  // Get the info about the user
  const newUserInfo = req.body;

  // Sign the user up
  // THIS IS BAD AND ONLY FOR TESTING DEAR GOD DONT KEEP THIS
  const { data, error: signUpError } = await supabase.auth.signUp({
    email: newUserInfo["email"],
    password: newUserInfo["password"],
  });

  if (signUpError) {
    res.status(error["status"]).json({
      status: "fail",
      error,
    });
  }

  const serviceRoleClient = createServiceRoleClient();

  const uid = data.user.id;

  const eligibility = newUserInfo["eligibility"] || {};

  const eligible_programs = newUserInfo["eligiblePrograms"] || [];

  if (Object.keys(eligibility).length != 0 && eligible_programs.length == 0) {
    const programs = await allPrograms();

    const filteredPrograms = determineEligibilityForAllPrograms(
      eligibility,
      programs
    );

    filteredPrograms.forEach((program) => {
      eligible_programs.push(program.program_id);
    });
  }

  const first_name = newUserInfo["firstName"] || "";
  const last_name = newUserInfo["lastName"] || "";

  const { error: profileError } = await serviceRoleClient
    .from("profiles")
    .insert({
      id: uid,
      user_id: uid,
      role: "user",
      eligibility,
      eligible_programs,
      first_name,
      last_name,
      email: newUserInfo["email"],
      registered_programs: [],
    });

  if (profileError) {
    res.status(500).json({
      status: "fail",
      profileError,
    });
  }

  const jwtToken = data.session.access_token;

  /* const options = {
    maxAge: 7200000,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "None",
  }; 

  res.cookie("jwt", jwtToken, options); */

  res.set({
    "Set-Cookie": `jwt=${jwtToken}; HttpOnly; Secure; SameSite='None'; Max-Age=7200000`,
  });

  if (process.env.NODE_ENV == "development") {
    res.status(201).json({
      status: "success",
      jwt: jwtToken,
    });
  } else {
    res.status(201).json({
      status: "success",
    });
  }
});

exports.patchEligibility = catchAsync(async (req, res, next) => {
  const supabase = req.authClient;

  const { data: selectData, error: selectError } = await supabase
    .from("profiles")
    .select("eligibility");

  if (selectError) {
    return next(new AppError("Failure to select information", 500));
  }

  const currEligibility = selectData[0]["eligibility"];

  const newEligibility = req.body.eligibility;

  if (!newEligibility) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message: "Please input new eligibility data into req.body.eligibility",
    });
  }

  const finalEligibility = { ...currEligibility, ...newEligibility };

  const { data: patchData, error: patchError } = await supabase
    .from("profiles")
    .update({
      eligibility: finalEligibility,
    })
    .eq("id", req.jwt.sub)
    .select();

  if (patchError) {
    return next(new AppError(patchError.message), 500);
  }

  res.status(201).json({
    status: "success",
    data: {
      eligibility: patchData[0].eligibility,
    },
  });
});

exports.patchEligiblePrograms = catchAsync(async (req, res, next) => {
  const supabase = req.authClient;

  const { data: selectData, error: selectError } = await supabase
    .from("profiles")
    .select("eligible_programs");

  if (selectError) {
    return next(new AppError("Failure to select information", 500));
  }

  const currEligiblePrograms = selectData[0]["eligible_programs"];

  const newEligiblePrograms = req.body["eligiblePrograms"];

  if (!newEligiblePrograms) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please input new eligibile program data into req.body.eligiblePrograms",
    });
  }

  if (!Array.isArray(newEligiblePrograms)) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please format new eligible program data as a list of program IDs",
    });
  }

  for (let i = 0; i < newEligiblePrograms.length; i++) {
    newEligiblePrograms[i] = String(newEligiblePrograms[i]);
  }

  const finalEligiblePrograms = [
    ...new Set([...currEligiblePrograms, ...newEligiblePrograms]),
  ];

  const { data: patchData, error: patchError } = await supabase
    .from("profiles")
    .update({
      eligible_programs: finalEligiblePrograms,
    })
    .eq("id", req.jwt.sub)
    .select();

  if (patchError) {
    return next(new AppError(patchError.message), 500);
  }

  res.status(201).json({
    status: "success",
    data: {
      eligible_programs: patchData[0].eligible_programs,
    },
  });
});

exports.patchRegisteredPrograms = catchAsync(async (req, res, next) => {
  const supabase = req.authClient;

  const { data: selectData, error: selectError } = await supabase
    .from("profiles")
    .select("registered_programs");

  if (selectError) {
    return next(new AppError("Failure to select information", 500));
  }

  const currRegisteredPrograms = selectData[0]["registered_programs"];

  const newRegisteredPrograms = req.body["registeredPrograms"];

  if (!newRegisteredPrograms) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please input new registered program data into req.body.registeredPrograms",
    });
  }

  if (!Array.isArray(newRegisteredPrograms)) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please format new registered program data as a list of program IDs",
    });
  }

  for (let i = 0; i < newRegisteredPrograms.length; i++) {
    newRegisteredPrograms[i] = String(newRegisteredPrograms[i]);
  }

  const { data: programSelectData, error: programSelectError } = await supabase
    .from("programs")
    .select("*")
    .in("program_id", newRegisteredPrograms);

  if (programSelectError) {
    return next(new AppError("Failure to select information", 500));
  }

  programSelectData
    .filter((program) => {
      return currRegisteredPrograms.indexOf(program.program_id) != -1;
    })
    .forEach(async (program) => {
      const updatedNumSignedUp = program.num_signed_up + 1;

      const { data: updateData, error: updateError } = await supabase
        .from("programs")
        .update({ num_signed_up: updatedNumSignedUp })
        .eq("program_id", program.program_id)
        .select();

      if (updateError) {
        return next(new AppError(updateError.message), 500);
      }
    });

  const finalRegisteredPrograms = [
    ...new Set([...currRegisteredPrograms, ...newRegisteredPrograms]),
  ];

  const { data: patchData, error: patchError } = await supabase
    .from("profiles")
    .update({
      registered_programs: finalRegisteredPrograms,
    })
    .eq("id", req.jwt.sub)
    .select();

  if (patchError) {
    return next(new AppError(patchError.message), 500);
  }

  res.status(201).json({
    status: "success",
    data: {
      registered_programs: patchData[0].registered_programs,
    },
  });
});

exports.patchPendingPrograms = catchAsync(async (req, res, next) => {
  const supabase = req.authClient;

  const { data: selectData, error: selectError } = await supabase
    .from("profiles")
    .select("pending_programs");

  if (selectError) {
    return next(new AppError("Failure to select information", 500));
  }

  const currPendingPrograms = selectData[0]["pending_programs"];

  const newPendingPrograms = req.body["pendingPrograms"];

  if (!newPendingPrograms) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please input new pending program data into req.body.pendingPrograms",
    });
  }

  if (!Array.isArray(newPendingPrograms)) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please format new pending program data as a list of program IDs",
    });
  }

  for (let i = 0; i < newPendingPrograms.length; i++) {
    newPendingPrograms[i] = String(newPendingPrograms[i]);
  }

  const finalPendingPrograms = [
    ...new Set([...currPendingPrograms, ...newPendingPrograms]),
  ];

  const { data: patchData, error: patchError } = await supabase
    .from("profiles")
    .update({
      pending_programs: finalPendingPrograms,
    })
    .eq("id", req.jwt.sub)
    .select();

  if (patchError) {
    return next(new AppError(patchError.message), 500);
  }

  res.status(201).json({
    status: "success",
    data: {
      pending_programs: patchData[0].pending_programs,
    },
  });
});

exports.deleteEligibility = catchAsync(async (req, res, next) => {
  const supabase = req.authClient;

  const { data: selectData, error: selectError } = await supabase
    .from("profiles")
    .select("eligibility");

  if (selectError) {
    return next(new AppError("Failure to select information", 500));
  }

  const currEligibility = selectData[0]["eligibility"];

  const deletedEligibilityFieldNames = req.body.eligibility;

  if (!deletedEligibilityFieldNames) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please input deleted eligibility data into req.body.eligibility as a list of Field Names",
    });
  }

  if (!Array.isArray(deletedEligibilityFieldNames)) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please input deleted eligibility data as a list of Field Names to delete",
    });
  }

  const deletedEligibility = {};

  deletedEligibilityFieldNames.forEach((fieldName) => {
    deletedEligibility[fieldName] = null;
  });

  const finalEligibility = { ...currEligibility, ...deletedEligibility };

  const { data: patchData, error: patchError } = await supabase
    .from("profiles")
    .update({
      eligibility: finalEligibility,
    })
    .eq("id", req.jwt.sub)
    .select();

  if (patchError) {
    return next(new AppError(patchError.message), 500);
  }

  res.status(200).json({
    status: "success",
    data: {
      eligibility: patchData[0].eligibility,
    },
  });
});

exports.deleteEligiblePrograms = catchAsync(async (req, res, next) => {
  const supabase = req.authClient;

  const { data: selectData, error: selectError } = await supabase
    .from("profiles")
    .select("eligible_programs");

  if (selectError) {
    return next(new AppError("Failure to select information", 500));
  }

  const currEligiblePrograms = selectData[0]["eligible_programs"];

  const deletedEligiblePrograms = req.body["eligiblePrograms"];

  if (!deletedEligiblePrograms) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please input deleted eligibile program data into req.body.eligiblePrograms",
    });
  }

  if (!Array.isArray(deletedEligiblePrograms)) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please format deleted eligible program data as a list of program IDs",
    });
  }

  for (let i = 0; i < deletedEligiblePrograms.length; i++) {
    deletedEligiblePrograms[i] = String(deletedEligiblePrograms[i]);
  }

  const finalEligiblePrograms = currEligiblePrograms.filter((id) => {
    return !deletedEligiblePrograms.includes(id);
  });

  const { data: patchData, error: patchError } = await supabase
    .from("profiles")
    .update({
      eligible_programs: finalEligiblePrograms,
    })
    .eq("id", req.jwt.sub)
    .select();

  if (patchError) {
    return next(new AppError(patchError.message), 500);
  }

  res.status(200).json({
    status: "success",
    data: {
      eligible_programs: patchData[0].eligible_programs,
    },
  });
});

exports.deleteRegisteredPrograms = catchAsync(async (req, res, next) => {
  const supabase = req.authClient;

  const { data: selectData, error: selectError } = await supabase
    .from("profiles")
    .select("registered_programs");

  if (selectError) {
    return next(new AppError("Failure to select information", 500));
  }

  const currRegisteredPrograms = selectData[0]["registered_programs"];

  const deletedRegisteredPrograms = req.body["registeredPrograms"];

  if (!deletedRegisteredPrograms) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please input deleted registered program data into req.body.registeredPrograms",
    });
  }

  if (!Array.isArray(deletedRegisteredPrograms)) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please format deleted registered program data as a list of program IDs",
    });
  }

  for (let i = 0; i < deletedRegisteredPrograms.length; i++) {
    deletedRegisteredPrograms[i] = String(deletedRegisteredPrograms[i]);
  }

  const finalRegisteredPrograms = currRegisteredPrograms.filter((id) => {
    return !deletedRegisteredPrograms.includes(id);
  });

  const { data: programSelectData, error: programSelectError } = await supabase
    .from("programs")
    .select("*")
    .in("program_id", deletedRegisteredPrograms);

  if (programSelectError) {
    return next(new AppError("Failure to select information", 500));
  }

  programSelectData
    .filter((program) => {
      return currRegisteredPrograms.indexOf(program.program_id) == -1;
    })
    .forEach(async (program) => {
      const updatedNumSignedUp = program.num_signed_up - 1;

      const { data: updateData, error: updateError } = await supabase
        .from("programs")
        .update({ num_signed_up: updatedNumSignedUp })
        .eq("program_id", program.program_id)
        .select();

      if (updateError) {
        return next(new AppError(updateError.message), 500);
      }
    });

  const { data: patchData, error: patchError } = await supabase
    .from("profiles")
    .update({
      registered_programs: finalRegisteredPrograms,
    })
    .eq("id", req.jwt.sub)
    .select();

  if (patchError) {
    return next(new AppError(patchError.message), 500);
  }

  res.status(200).json({
    status: "success",
    data: {
      registered_programs: patchData[0].registered_programs,
    },
  });
});

exports.deletePendingPrograms = catchAsync(async (req, res, next) => {
  const supabase = req.authClient;

  const { data: selectData, error: selectError } = await supabase
    .from("profiles")
    .select("pending_programs");

  if (selectError) {
    return next(new AppError("Failure to select information", 500));
  }

  const currPendingPrograms = selectData[0]["pending_programs"];

  const deletedPendingPrograms = req.body["pendingPrograms"];

  if (!deletedPendingPrograms) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please input deleted eligibile program data into req.body.pendingPrograms",
    });
  }

  if (!Array.isArray(deletedPendingPrograms)) {
    return res.status(400).json({
      status: "fail",
      error: "invalidDataError",
      message:
        "Please format deleted pending program data as a list of program IDs",
    });
  }

  for (let i = 0; i < deletedPendingPrograms.length; i++) {
    deletedPendingPrograms[i] = String(deletedPendingPrograms[i]);
  }

  const finalPendingPrograms = currPendingPrograms.filter((id) => {
    return !deletedPendingPrograms.includes(id);
  });

  const { data: patchData, error: patchError } = await supabase
    .from("profiles")
    .update({
      pending_programs: finalPendingPrograms,
    })
    .eq("id", req.jwt.sub)
    .select();

  if (patchError) {
    return next(new AppError(patchError.message), 500);
  }

  res.status(200).json({
    status: "success",
    data: {
      pending_programs: patchData[0].pending_programs,
    },
  });
});

// POST login user
exports.login = catchAsync(async (req, res, next) => {
  // Get the info about the user who is trying to log in
  const userInfo = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: userInfo["email"],
    password: userInfo["password"],
  });

  if (error) {
    res.status(error["status"]).json({
      status: "fail",
      error,
    });
  } else {
    const jwtToken = data.session.access_token;

    res.set({
      "Set-Cookie": `jwt=${jwtToken}; HttpOnly; Secure; SameSite=None; Max-Age=7200000`,
    });

    const uid = data.user.id;

    const serviceRoleClient = createServiceRoleClient();
    const { data: userData, error: userError } = await serviceRoleClient
      .from("profiles")
      .select("*")
      .eq("id", uid);

    if (process.env.NODE_ENV == "development") {
      res.status(201).json({
        status: "success",
        jwt: jwtToken,
        ...userData[0],
      });
    } else {
      res.status(201).json({
        status: "success",
        ...userData[0],
      });
    }
  }
});

// DELETE user by ID
exports.deleteUser = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const decoded = jwt.decode(token);
  const userId = decoded.sub;

  const serviceRoleClient = createServiceRoleClient();

  const { data, error } = await serviceRoleClient.auth.admin.deleteUser(userId);

  if (error) {
    return next(new AppError(error.message, 500));
  }

  res.status(200).json({
    status: "success",
    message: "User successfully deleted",
  });
});

exports.isAdmin = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "User is admin",
    isAdmin: true,
  });
});

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const supabase = require("../utils/client");


const allUsers = async () => {
  // Utility function
  // RETURNS: List of all users in the database
  // Return type: User[]
  /* YOUR CODE HERE */
};

exports.verifyUser = (userInfo) => {
  // Utility function
  // Verifies the user is logged in
  // May need more params/to be adjusted, I didn't really think this one through
};

// GET user by ID or users by AdminID
exports.getUserById = catchAsync(async (req, res, next) => {
  // Verify the user is logged in, and get their user ID from JWT
  /* YOUR CODE HERE */

  // Check if they are an admin or not
  /* YOUR CODE HERE */
  const isAdmin = user.isAdmin;

  // If they are not an admin:
  if (!isAdmin) {
  //    Send back the information on the single user with success status code 200
  /*    YOUR CODE HERE */
    res.status(200).json({user})
  }
  // If they are an admin:
  else {
  //    Segment the data to get (total users / total admin users) users (we can figure this out later)
  /*    YOUR CODE HERE */

  //    Send back the information on the multiple users with success status code 200
  /*    YOUR CODE HERE */
    res.status(200).json({allUsers})
  }
});

// POST signup user
exports.signup = catchAsync(async (req, res, next) => {
  // Get the info about the user
  const newUserInfo = req.query;

  // Sign the user up
  // THIS IS BAD AND ONLY FOR TESTING DEAR GOD DONT KEEP THIS
  const { data, error } = await supabase.auth.signUp({
    email : newUserInfo['email'],
    password : newUserInfo['password']
  })

  console.log(data, error)

  if (error) {
    res.status(error["status"]).json({
      status: 'fail',
      error,
    })
  }
  else {
    res.status(201).json({
      status: 'success'
    })
  }
  
});

// POST login user
exports.login = catchAsync(async (req, res, next) => {
  // Get the info about the user who is trying to log in
  const userInfo = req.query;

  const { data, error } =await supabase.auth.signInWithPassword({
    email : userInfo['email'],
    password : userInfo['password']
  })
  
  console.log(data, error);

  if (error) {
    res.status(error["status"]).json({
      status: 'fail',
      error,
    })
  }
  else {
    res.status(201).json({
      status: 'success'
    })
  }
  
  // Validate that the user login info matches an instance in the database
  /* YOUR CODE HERE */

  // If the user has incorrect credentials, raise a 401 Unauthorized error
  /* YOUR CODE HERE */

  // If the user has the correct credentials, log them in (I'm thinking JWT)
  /* YOUR CODE HERE */
});

// DELETE user by ID
exports.deleteUser = catchAsync(async (req, res, next) => {
  // Verify the user is logged in, and get their user ID from JWT
  /* YOUR CODE HERE */

  //const decoded = jwt.verify(token, config.get('jwtPrivateKey'));  
  //var userId = decoded.id 
  //idk which one works

  const token = req.headers.authorization.split(' ')[1];
  const decoded = await verifyToken(token);
  const userId = decoded.id;

  try {
    const user = User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isAdmin || user._id.toString() === userId) {
      User.findByIdAndRemove(userId)
      return res.status(204).json(); 
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  // Delete the user from the database
  /* YOUR CODE HERE */
});

// PATCH user by ID - Edits user information
exports.patchUser = catchAsync(async (req, res, next) => {
  // Verify the user is logged in, and get their user ID from JWT
  /* YOUR CODE HERE */
  const token = req.headers.authorization.split(' ')[1];
  const decoded = await verifyToken(token);
  const userId = decoded.id;

  // Get the info the user wants to change
  const updatedInfo = req.query;

  // Change the info in the database
  /* YOUR CODE HERE */
  try {
    const user = User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user._id.toString() === userId) {
      Object.assign(user, updatedInfo);
      user.save();
      return res.status(200).json({ user });
    } else {
      return res.status(403).json({ message: 'Unauthorized to update this user' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

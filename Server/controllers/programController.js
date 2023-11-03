const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const determineEligibilityForAllPrograms = require("../utils/determineEligibilty");
const supabase = require("../utils/client");

const allPrograms = async () => {
  // Utility function
  // RETURNS: List of all the programs in the database
  // Return type: Program[]
  /* YOUR CODE HERE */

  /*DUMMY CODE*/

  console.log(process.env.SUPABASE_URL);

  let { data: programs, error } = await supabase.from("programs").select("*");

  return programs;

  /*END DUMMY CODE*/
};

// GET request for all programs, with an optional req.query
exports.getAllPrograms = catchAsync(async (req, res, next) => {
  // Get all the programs from the database
  const programs = await allPrograms();

  // Check if there is eligibility to filter by
  const eligibility = req.query;

  // Filter the programs by eligibility info
  /* YOUR CODE HERE */
  const filteredPrograms = determineEligibilityForAllPrograms(
    eligibility,
    programs
  );

  // Check that the programs were available. If no programs were recieved, raise a status code 503 Service Unavailable Error
  if (!filteredPrograms) {
    return next(
      new AppError("Sorry, no programs were found matching that information."),
      503
    );
  }

  // Send the programs with status code 200 Success
  res.status(200).json({
    status: "success",
    data: {
      filteredPrograms,
    },
  });
});

// GET request for one program by ID
exports.getProgramById = catchAsync(async (req, res, next) => {
  // Get the requested ID
  const id = req.params.id;
  const programs = await allPrograms();
  // Filter the programs to the existing ID
  /* YOUR CODE HERE */
  const program = programs.find(program => program.program_id == id);
  // Raise an error if that program doesn't exist
  /* YOUR CODE HERE */
  if (!program) {
    return next(new AppError('Program not found', 404));
  }

  // Send the program back
  /* YOUR CODE HERE */
  res.status(200).json({
    status: 'success',
    data: program,
  });
});

// POST request to register for a program
exports.registerForProgram = catchAsync(async (req, res, next) => {
  // Get the program ID and user eligibility info
  const id = req.params.id;
  const eligibility = req.query;

  // Raise a status code 400 Bad Request error if we don't have a handler function for that program
  /* YOUR CODE HERE */
  if (!program.handlerFunction) {
    return next(new AppError('No handler function for this program', 400));
  }
  // Pass in the necessary information to the program handler function and send a success response if successful
  /* YOUR CODE HERE */
});

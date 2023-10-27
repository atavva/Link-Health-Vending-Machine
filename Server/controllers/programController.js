const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const determineEligibilityForAllPrograms = require("../utils/determineEligibilty");

const { createClient } = require('@supabase/supabase-js');

// Initialize the Supabase client
const supabase = createClient(
  'https://juhxzbhlztuqtxwkpavi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1aHh6YmhsenR1cXR4d2twYXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MDk2NzYsImV4cCI6MjAxMjM4NTY3Nn0.MVDY_Ofxgtmt_CnsVD0Z_yb40oYk53Kdfh5kbH5QSk0'
);

const allPrograms = async () => {
  // Utility function
  // RETURNS: List of all the programs in the database
  // Return type: Program[]
  /* YOUR CODE HERE */

  /*DUMMY CODE*/
  let { data: programs, error } = await supabase
    .from('programs')
    .select('program_id')

  

  return programs;

  /*END DUMMY CODE*/
};

// GET request for all programs, with an optional req.query
exports.getAllPrograms = catchAsync(async (req, res, next) => {
  // Get all the programs from the database
  const programs = allPrograms();

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

  // Filter the programs to the existing ID
  /* YOUR CODE HERE */

  // Raise an error if that program doesn't exist
  /* YOUR CODE HERE */

  // Send the program back
  /* YOUR CODE HERE */
});

// POST request to register for a program
exports.registerForProgram = catchAsync(async (req, res, next) => {
  // Get the program ID and user eligibility info
  const id = req.params.id;
  const eligibility = req.query;

  // Raise a status code 400 Bad Request error if we don't have a handler function for that program
  /* YOUR CODE HERE */

  // Pass in the necessary information to the program handler function and send a success response if successful
  /* YOUR CODE HERE */
});

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const determineEligibilityForAllPrograms = require("../utils/determineEligibilty");

const allPrograms = () => {
  // Utility function
  // RETURNS: List of all the programs in the database
  // Return type: Program[]
  /* YOUR CODE HERE */

  /*DUMMY CODE*/
  const programs = [
    {
      id: "hdUe183nK38ddlaks849flhf",
      programName: "Aidan Gives Away Money",
      jurisdiction: "US",
      eligibility: [
        {
          condition: "OR",
          rules: [
            {
              fieldName: "agi",
              comparisonOperator: "<=",
              value: 13425,
            },
          ],
        },
      ],
      shortDesc: "Free money",
      longDesc:
        "Aidan is giving away free money to anyone with a max annual income of $13254",
      imagePath: null,
    },
    {
      id: "h3duwao8321idjDH7wgUwjK8",
      programName: "Medi-Cal",
      jurisdiction: "CA",
      eligibility: [
        {
          condition: "OR",
          rules: [
            {
              fieldName: "poverty_level",
              comparisonOperator: "<=",
              value: 1.38,
            },
          ],
        },
      ],
      shortDesc: "California public health care",
      longDesc:
        "Free health care for any in California below 138% of the poverty line",
      imagePath: null,
    },
    {
      id: "37dhhwjUgwtOaowao9hkdwauk",
      programName: "SNAP",
      jurisdiction: "US",
      eligibility: [
        {
          condition: "AND",
          rules: [
            {
              fieldName: "agi",
              comparisonOperator: "<=",
              value: 59293,
            },
            {
              fieldName: "dependencies",
              comparisonOperator: ">=",
              value: 2,
            },
          ],
        },
        {
            condition: "OR",
            rules: [
                {
                    fieldName: "agi",
                    comparisonOperator: "<=",
                    value: 20000,
                }
            ]
        }
      ],
      shortDesc: "Federal food security program",
      longDesc:
        "Federal program that provides credits to spend at the grocery store",
    },
  ];

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

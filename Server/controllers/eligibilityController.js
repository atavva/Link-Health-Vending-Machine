const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const determineEligibilityForAllPrograms = require("../utils/determineEligibility");
const supabase = require("../utils/client");
const determineBestNextQuestion = require("../utils/determineNextQuestion");
const { allPrograms } = require("./programController");

/**
 * Determines the best next question to ask a user to efficiently determine their eligibility
 */
exports.determineNextQuestion = catchAsync(async (req, res, next) => {
  const userInfo = req.body;

  /*
    req.body = {
        eligiblePrograms: string[] (list of ids)
        ineligiblePrograms: string[] (list of ids)
        eligibility: {
            ... userEligibility
        }
    }
    */

  // List of programs
  const unknownPrograms = await determineUnknownPrograms(
    userInfo.eligiblePrograms,
    userInfo.ineligiblePrograms
  );

  const bestNextEligibility = determineBestNextQuestion(
    unknownPrograms,
    userInfo.eligibility
  );

  const questionInfo = await getQuestionInfo(bestNextEligibility);

  if ("status" in questionInfo) {
    return next(
      new AppError(questionInfo.error.message, questionInfo.error.status)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      ...questionInfo,
    },
  });
});

const determineUnknownPrograms = async (
  eligiblePrograms,
  ineligiblePrograms
) => {
  // Get the programs
  const programs = await allPrograms();

  // combine the eligible and ineligiblePrograms
  const determinedPrograms = eligiblePrograms.concat(ineligiblePrograms);

  const unknownPrograms = programs.filter((program) => {
    return !determinedPrograms.includes(program.program_id);
  });

  return unknownPrograms;
};

const getQuestionInfo = async (fieldName) => {
  const { data, error } = await supabase
  .from("eligibility")
  .select("*")
  .eq("Field Name", fieldName);

  if (error) {
    return {
      status: "error",
      error,
    };
  }

  return data;
};

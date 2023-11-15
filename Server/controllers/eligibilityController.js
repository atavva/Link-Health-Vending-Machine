const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const determineEligibilityForAllPrograms = require("../utils/determineEligibility");
const supabase = require("../utils/client");
const determineBestNextQuestion = require("../utils/determineNextQuestion");
const { findKeyWithHighestValue } = require("../utils/determineNextQuestion");
const { allPrograms } = require("./programController");

exports.getFieldNames = catchAsync(async (req, res, next) => {
  const { data, error } = await supabase
    .from("eligibility")
    .select('"field_name"');

  if (error) {
    return next(new AppError(error.message, 404));
  }

  const eligibility = {};
  data.forEach((el) => {
    eligibility[el["field_name"]] = null;
  });

  res.status(200).json({
    status: "success",
    data: { eligibility },
  });
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  const { data, error } = await supabase.from("eligibility").select("Question");

  if (error) {
    return next(new AppError(error.message, 404));
  }

  const questions = [];
  data.forEach((question) => {
    questions.push(question["Question"]);
  });

  res.status(200).json({
    status: "success",
    data: {
      questions,
    },
  });
});
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

  const bestNextEligibilityScores = determineBestNextQuestion(
    unknownPrograms,
    userInfo.eligibility
  );

  let questionInfo;

  while (Object.keys(bestNextEligibilityScores).length != 0) {
    let bestNextFieldName = findKeyWithHighestValue(bestNextEligibilityScores);
    questionInfo = await getQuestionInfo(bestNextFieldName);

    if (Object.keys(questionInfo).length != 0) {
      break;
    }

    delete bestNextEligibilityScores[bestNextFieldName];
  }

  if ("status" in questionInfo) {
    return next(
      new AppError(questionInfo.error.message, questionInfo.error.status)
    );
  }

  const { data: totalCountData, error: totalCountError } = await supabase
    .from("eligibility")
    .select("count");

  const totalQuestions = totalCountData[0].count || NaN;

  const { data: remainingQuestionData, error: remainingQuestionError } =
    await supabase
      .from("eligibility")
      .select("count")
      .in("field_name", Object.keys(bestNextEligibilityScores));

  const maxRemainingQuestions = remainingQuestionData[0].count || NaN;

  const percentageCompleted =
    (totalQuestions - maxRemainingQuestions) / totalQuestions;

  res.status(200).json({
    status: "success",
    data: {
      questionInfo: { ...questionInfo[0] },
      maxRemainingQuestions,
      percentageCompleted,
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
    .eq("field_name", fieldName);

  if (error) {
    return {
      status: "error",
      error,
    };
  }

  return data;
};

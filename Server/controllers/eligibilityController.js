const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const determineEligibilityForAllPrograms = require("../utils/determineEligibilty");
const supabase = require("../utils/client");

/**
 * Determines the best next question to ask a user to efficiently determine their eligibility
 */
exports.determineNextQuestion = catchAsync(async (req, res, next) => {

    const userInfo = req.params;

    /*
    req.params = {
        eligiblePrograms: string[] (list of ids)
        ineligiblePrograms: string[] (list of ids)
        eligibility: {
            ... userEligibility
        }
    }
    */

});

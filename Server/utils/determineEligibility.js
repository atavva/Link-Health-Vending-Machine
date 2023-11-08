/**
 * Determines what programs a user is eligible for
 * @param {*} eligibility the user eligibility
 * @param {Program[]} programs the list of all programs
 * @returns {Program[]} the programs the user is eligible for based on their eligibility
 */
module.exports = (eligibility, programs) => {
  if (Object.keys(eligibility).length === 0) {
    return programs;
  }

  // Run a filter using determineEligibility for each program
  const eligiblePrograms = programs.filter((program) =>
    determineEligibility(eligibility, program.eligibility)
  );

  // Return filtered programs
  return eligiblePrograms;
};

/**
 * Helper function to filter programs in module.exports
 * @param {*} eligibility
 * @param {EligbilityRequirement[]} requirements eligibility requirements for a single program
 * @returns {boolean} whether the user is eligible for that program
 */
const determineEligibility = (eligibility, requirements) => {
  // All eligibility requirements in the initial list are "or", so we check if any of them are passed and short circuit if so
  for (let i = 0; i < requirements.length; i++) {
    if (evaluateEligibilityRequirement(eligibility, requirements[i])) {
      return true;
    }
  }

  // If none of the eligibility requirements were passed, return false
  return false;
};

/**
 * Determines if a user's eligibility satisfies this rule
 * @param {*} eligibility
 * @param {Rule} rule
 * @returns {boolean} whether the user's eligibility meets this rule
 */
const evaluateRule = (eligibility, rule) => {
  // First, check if the eligibility object has the rule's fieldName
  if (!(rule.fieldName in eligibility)) {
    return false;
  }

  // Check if the user's eligibility fieldName info satisfies this rule
  const userVal = eligibility[rule.fieldName];

  // Check eligibility by case
  switch (rule.comparisonOperator) {
    case "=":
      return userVal == String(rule.value);
    case "<=":
      return userVal <= rule.value;
    case ">=":
      return userVal >= rule.value;
    case "<":
      return userVal < rule.value;
    case ">":
      return userVal > rule.value;
    default:
      return false;
  }
};

/**
 *
 * @param {*} eligibility
 * @param {EligbilityRequirement} eligibilityRequirement
 * @returns {boolean} whether the user's eligibility meets this eligibility requirement
 */
const evaluateEligibilityRequirement = (
  eligibility,
  eligibilityRequirement
) => {
  // Check if the condition is 'AND' or 'OR'-- use any or all appropriately
  const returnOnVal = eligibilityRequirement.condition === "OR";

  for (let i = 0; i < eligibilityRequirement.rules.length; i++) {
    const currCondition = eligibilityRequirement.rules[i];
    if (isRule(currCondition)) {
      if (evaluateRule(eligibility, currCondition) == returnOnVal) {
        return returnOnVal;
      }
    } else {
      if (
        evaluateEligibilityRequirement(eligibility, currCondition) ==
        returnOnVal
      ) {
        return returnOnVal;
      }
    }
  }

  return !returnOnVal;
};

/**
 * Checks if the object is a Rule object (as defined in programTypes.ts)
 * @param {Object} obj
 * @returns {boolean} if the object is a Rule object
 */
const isRule = (obj) => {
  return (
    obj.hasOwnProperty("fieldName") &&
    obj.hasOwnProperty("comparisonOperator") &&
    obj.hasOwnProperty("value")
  );
};

module.exports.isRule = isRule;
module.exports.evaluateRule = evaluateRule;

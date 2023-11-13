const { isRule, evaluateRule } = require("./determineEligibility");

module.exports = (unknownPrograms, eligibility) => {
  
  //Eliminate Null values from eligibility
  Object.keys(eligibility).forEach((key) => {
    if (eligibility[key] == null) {
      delete eligibility[key];
    }
  });

  //Clean the programs
  const cleanedPrograms = simplifyPrograms(unknownPrograms, eligibility);

  const finalPrograms = [];
  cleanedPrograms.forEach((program) => {
    if (Object.keys(program.eligibility[0]).length != 0) {
      if (isRule(program.eligibility[0])) {
        finalPrograms.push({
          ...program,
          eligibility: [{
            condition: "OR",
            rules: [
              {
                ...program.eligibility[0],
              },
            ],
          }],
        });
      } else {
        finalPrograms.push(program);
      }
    }
  });

  //Determine the best next eligibility to ask
  return evaluateBestQuestion(finalPrograms);
};

/**
 *
 * @param {Programs[]} cleanedPrograms a list of programs that have been cleaned by fixProgramNesting
 * @returns {string} the name of the most valued eligibility to know given the heuristic in the function
 */
const evaluateBestQuestion = (cleanedPrograms) => {
  let currScores = {};
  for (let i = 0; i < cleanedPrograms.length; i++) {
    const eligibilityReqs = cleanedPrograms[i].eligibility;
    eligibilityReqs.forEach((el) => {
      const newScores = evaluateBestQuestionPerProgram(el);
      addScores(currScores, newScores);
    });
  }

  return currScores;
};

const findKeyWithHighestValue = (obj) => {
  let maxKey = null;
  let maxValue = -Infinity;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] > maxValue) {
        maxKey = key;
        maxValue = obj[key];
      }
    }
  }

  return maxKey;
};

module.exports.findKeyWithHighestValue = findKeyWithHighestValue;

/**
 * Determines the value of each eligibility info in an eligibility requirement
 * @param {EligbilityRequirement|Rule} eligibility
 * @returns {{[key: string]: number}} such that all keys in Object.keys is in supabase.public.eligibility["Field Name"]
 */
const evaluateBestQuestionPerProgram = (eligibility) => {
  let elig = {};
  eligibility.rules.forEach((el) => {
    results = bestQuestionHelper(el, 1);
    addScores(elig, results);
  });

  return elig;
};

const bestQuestionHelper = (eligibility, maxValue) => {
  let elig = {};
  //Base case
  if (isRule(eligibility)) {
    elig[eligibility.fieldName] = maxValue;
    return elig;
  }

  const divisor = eligibility.rules.length;

  eligibility.rules.forEach((el) => {
    const results = bestQuestionHelper(el, maxValue / divisor);
    addScores(elig, results);
  });

  return elig;
};

const addScores = (currScores, newScores) => {
  Object.keys(newScores).forEach((key) => {
    if (key in currScores) {
      currScores[key] += newScores[key];
    } else {
      currScores[key] = newScores[key];
    }
  });
};

/**
 *
 * @param {Program[]} unsimplifiedPrograms
 * @param {*} eligibility user Eligibility
 */
const simplifyPrograms = (unsimplifiedPrograms, eligibility) => {
  if (Object.keys(eligibility).length == 0) {
    return unsimplifiedPrograms;
  }

  const simplifiedPrograms = [];

  unsimplifiedPrograms.forEach((program) => {
    simplifiedPrograms.push(simplifyProgram(program, eligibility));
  });

  return simplifiedPrograms;
};

const simplifyProgram = (unsimplifiedProgram, eligibility) => {
  const newEligibility = [];
  unsimplifiedProgram.eligibility.forEach((programEligibility) => {
    const simplifiedEligibility = simplifyEligibility(
      programEligibility,
      eligibility
    );
    newEligibility.push({
      ...simplifiedEligibility,
    });
  });

  const simplifiedProgram = {
    ...unsimplifiedProgram,
    eligibility: newEligibility,
  };

  return simplifiedProgram;
};
/**
 *
 * @param {*} programEligibility
 * @param {*} eligibility
 */
const simplifyEligibility = (programEligibility, eligibility) => {
  // We have a few conditions:
  /**
   * Loop through and call 'simplifyEligibility' on each item
   * Loop through and remove empty objects
   * It is an AND and has 2+ items
   Loop through the rules in it and assume any non-rules are fully simplified
   If a rule is FALSE, then return an empty object
   If a rule is TRUE, then remove it from the list of conditions
   If an item is a
   * It is an OR and has 2+ items
   * We also need to perform a BFS on it so it simplifies already simplified objects
   */

  if (isRule(programEligibility)) {
    return programEligibility;
  }

  const newRules = [];

  programEligibility.rules.forEach((el) => {
    const newEl = simplifyEligibility(el, eligibility);
    if (Object.keys(newEl).length !== 0) {
      newRules.push(newEl);
    }
  });

  const condition = programEligibility.condition;

  const returnBoolean = condition === "OR";

  const finalRules = [];

  let returnABoolean = false;

  newRules.forEach((el) => {
    if (typeof el == "boolean") {
      if (el === returnBoolean) {
        returnABoolean = true;
      }
    } else if (isRule(el)) {
      if (eligibility.hasOwnProperty(el.fieldName)) {
        const ruleIsTrue = evaluateRule(eligibility, el);
        if (ruleIsTrue === returnBoolean) {
          returnABoolean = true;
        }
      } else {
        finalRules.push(el);
      }
    } else {
      if (el.condition == condition) {
        el.rules.forEach((nestedRule) => {
          finalRules.push(nestedRule);
        });
      } else {
        finalRules.push(el);
      }
    }
  });

  if (returnABoolean) {
    return returnBoolean;
  }

  if (finalRules.length == 1) {
    return finalRules[0];
  }

  return { ...programEligibility, rules: finalRules };
};

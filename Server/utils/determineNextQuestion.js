const { isRule } = require("./determineEligibility");

module.exports = (unknownPrograms, eligibility) => {
  
    //clean the programs
    // const cleanedPrograms = cleanPrograms(unknownPrograms, eligibility);
    const cleanedPrograms = unknownPrograms;

    //Determine the best next eligibility to ask
    return evaluateBestQuestion(cleanedPrograms)

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

  return findKeyWithHighestValue(currScores);
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
}

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

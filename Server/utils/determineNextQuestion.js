module.exports = (unknownPrograms, eligibility) => {
  /*
    eligibility = {
        "agi": 3000,
        "dependencies": 5
    }
    */
  // Returns the best thing to ask (an example is it could return "agi")
};

/**
 *
 * @param {Programs[]} cleanedPrograms a list of programs that have been cleaned by fixProgramNesting
 * @returns {string} the name of the most valued eligibility to know given the heuristic in the function
 */
const evaluateBestQuestion = (cleanedPrograms) => {
    let elig = {};
    for (let i = 0; i < cleanedPrograms.length; i++) {
        
    }
};

/**
 * Determines the value of each eligibility info in an eligibility requirement
 * @param {EligbilityRequirement} eligibility 
 * @returns {{[key: string]: number}} such that all keys in Object.keys is in supabase.public.eligibility["Field Name"] 
 */
const evaluateBestQuestionPerProgram = (eligibility) => {
    let elig = {};
};





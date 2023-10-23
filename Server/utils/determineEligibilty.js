module.exports = (eligibility, programs) => {
  console.log(programs);
  const eligiblePrograms = programs.filter((program) =>
    determineEligibility(eligibility, program)
  );
  return eligiblePrograms;
};

const determineEligibility = (eligibility, program) => {
  return true;
};

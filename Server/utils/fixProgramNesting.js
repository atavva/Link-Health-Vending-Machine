/**
 * Fixes nesting on unknownPrograms by iterating through and removing redundacies
 * @param {Program[]} unknownPrograms
 * @param {*} eligibility
 * @returns {Program[]} programs with fixes 'rules' lists
 */
const fixProgramNesting = (unknownPrograms, eligibility) => {
  // If eligibility is an empty object, return unknownPrograms
  // If an eligibility in userEligibility appears in a "rule" object for unknownPrograms, eliminate it
};

/*

examples:

unknownPrograms = [{
    id: "21jUwuOkwePe8HaywbakehUuGe7336BegabetH",
    program_name: "Test Program",
    jurisdiction: "MA",
    eligibility: [{
        condition: "OR",
        rules: [
            {
                fieldName: "agi",
                comparisonOperator: "<=",
                value: 30000,
            },
            {
                fieldName: "snap",
                comparisonOperator: "=",
                value: true,
            },
            {
                fieldName: "dependencies",
                comparisonOperator: "<",
                value: 6
            },
            {
                condition: "AND",
                rules: [
                    {
                        fieldName: "agi",
                        comparisonOperator: "<=",
                        value: 40000,
                    },
                    {
                        condition: "OR",
                        rules: [
                            {
                                fieldName: "veteran",
                                comparisonOperator: "=",
                                value: true,
                            },
                            {
                                fieldName: "active_duty",
                                comparisonOperator: "=",
                                value: true,
                            },
                            {
                                condition: "AND",
                                rules: [
                                    {
                                        fieldName: "age",
                                        comparisonOperator: ">=",
                                        value: 60,
                                    },
                                    {
                                        fieldName: "disability",
                                        comparisonOperator: "=",
                                        value: true,
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }],
    short_desc: "A program to test",
    long_desc: "A program with a super long eligibiltiy for testing purposes",
    image_path: "fake_image.png"
}]

const eligibility = {
    agi: 35000,
    active_duty: false,
}

console.log(fixProgramNesting(unknownPrograms, eligibility))

expected output:

[
    {
        id: "21jUwuOkwePe8HaywbakehUuGe7336BegabetH",
        program_name: "Test Program",
        jurisdiction: "MA",
        eligibility: [{
            condition: "OR",
            rules: [
                {
                    fieldName: "agi",
                    comparisonOperator: "<=",
                    value: 30000,
                },
                {
                    fieldName: "snap",
                    comparisonOperator: "=",
                    value: true,
                },
                {
                    fieldName: "dependencies",
                    comparisonOperator: "<",
                    value: 6
                },
                {
                    fieldName: "veteran",
                    comparisonOperator: "=",
                    value: true
                },
                {
                    condition: "AND"
                    rules: [
                        {
                            fieldName: "age",
                            comparisonOperator: ">=",
                            value: 60,
                        },
                        {
                            fieldName: "disability",
                            comparisonOperator: "=",
                            value: true,
                        }
                    ]
                },
            ]
        }],
        short_desc: "A program to test",
        long_desc: "A program with a super long eligibiltiy for testing purposes",
        image_path: "fake_image.png"
    }
]


    The function eliminates "agi" from the initial OR as the individual doesn't qualify. It also moves "veteran" up
    as it knows the agi is indeed less than 40000. The "AND" between "age" and "disability" is also moved up for the same reason.
    Additionally, it eliminated "active_duty" as it figured out it wasn't eligible

*/

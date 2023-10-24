interface EligbilityRequirement {
    condition: "AND"|"OR",
    rules: (Rule|EligbilityRequirement)[],
}

interface Rule {
    fieldName: string,
    comparisonOperator: "="
    value: boolean|number|string,
}

interface Program {
    id: string,
    programName: string,
    jursdition: string,
    eligibility: EligbilityRequirement[],
    shortDesc: string,
    longDesc: string,
    imagePath: string,
}
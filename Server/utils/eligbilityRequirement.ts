interface EligbilityRequirement {
    condition: "AND"|"OR",
    rules: Rule[],
}

interface Rule {
    fieldName: string,
    comparisonOperator: "="
    value: boolean|number|Rule,
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
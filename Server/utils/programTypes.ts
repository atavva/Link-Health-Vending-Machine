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
    program_name: string,
    jursdition: string,
    eligibility: EligbilityRequirement[],
    short_desc: string,
    long_desc: string,
    image_path: string,
}
export type MonthlySalary = {
    id: string,
    school_id: string,
    year: number,
    month: number,
    gross_salary: number,
    tax_amount: number,
    trans_fee: number,
}

export type AnnualSalary = {
    id: string,
    school_id: string,
    year: number,
    gross_salary: number,
    tax_amount: number,
    trans_fee: number,
}
"use client"
import { useTeacherList } from "@/app/myfunctions";
import { AnnualSalary, MonthlySalary } from "@/app/types/salary";
import { Teacher } from "@/app/types/teacher";
import { useUser } from "@/providers/UserContext";

export const AnnualSalaryTable = ({
    monthlySalaryList,
    teacherList,
    year,
}: {
    monthlySalaryList: MonthlySalary[],
    teacherList: Teacher[],
    year: number,
}) => {
    const idToTeacher = new Map<string, Teacher>()
    const annualSalaryList: AnnualSalary[] = []
    for (const teacher of teacherList) {
        idToTeacher.set(teacher.id, teacher)
        const teacherMonthlySalaryList = monthlySalaryList.filter(monthly_salary => monthly_salary.id == teacher.id)
        
        annualSalaryList.push({
            id: teacher.id,
            school_id: teacher.school_id,
            year: year,
            gross_salary: teacherMonthlySalaryList.reduce((sum, monthly_salary) => sum + monthly_salary.gross_salary, 0),
            tax_amount: teacherMonthlySalaryList.reduce((sum, monthly_salary) => sum + monthly_salary.tax_amount, 0),
            trans_fee: teacherMonthlySalaryList.reduce((sum, monthly_salary) => sum + monthly_salary.trans_fee, 0)
        })
    }
    const gross_salary_sum = annualSalaryList.reduce((sum, monthly_salary) => sum + monthly_salary.gross_salary, 0)
    const tax_amount_sum = annualSalaryList.reduce((sum, monthly_salary) => sum + monthly_salary.tax_amount, 0)
    const trans_fee_sum = annualSalaryList.reduce((sum, monthly_salary) => sum + monthly_salary.trans_fee, 0)
    const net_salary_sum = gross_salary_sum - tax_amount_sum + trans_fee_sum

    
    const AnnualSalaryTableRow = ({annual_salary}: {annual_salary: AnnualSalary}) => {
        return (
            <tr className="text-right" key={annual_salary.id}>
                <td>{idToTeacher.get(annual_salary.id)?.display_name}</td>
                <td>{annual_salary.gross_salary}</td>
                <td>{annual_salary.tax_amount}</td>
                <td>{annual_salary.trans_fee}</td>
                <td>{annual_salary.gross_salary - annual_salary.tax_amount + annual_salary.trans_fee}</td>
            </tr>
        )
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr className="text-center" key="header">
                        <th>講師名</th>
                        <th>総額</th>
                        <th>源泉</th>
                        <th>交通費</th>
                        <th>入金額</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-right" key="sum">
                        <th>合計</th>
                        <th>{gross_salary_sum}</th>
                        <th>{tax_amount_sum}</th>
                        <th>{trans_fee_sum}</th>
                        <th>{net_salary_sum}</th>
                    </tr>
                    {annualSalaryList.map(annual_salary => <AnnualSalaryTableRow key={annual_salary.id} annual_salary={annual_salary}/>)}
                </tbody>                
            </table>
        </div>
    )
}

export const MonthlySalaryTable = ({
    monthlySalaryList,
    teacherList,
}: {
    monthlySalaryList: MonthlySalary[],
    teacherList: Teacher[],
}) => {
    const idToTeacher = new Map<string, Teacher>()
    for (const teacher of teacherList) {
        idToTeacher.set(teacher.id, teacher)
    }
    const gross_salary_sum = monthlySalaryList.reduce((sum, monthly_salary) => sum + monthly_salary.gross_salary, 0)
    const tax_amount_sum = monthlySalaryList.reduce((sum, monthly_salary) => sum + monthly_salary.tax_amount, 0)
    const trans_fee_sum = monthlySalaryList.reduce((sum, monthly_salary) => sum + monthly_salary.trans_fee, 0)
    const net_salary_sum = gross_salary_sum - tax_amount_sum + trans_fee_sum

    const MonthlySalaryTableRow = ({monthly_salary}: {monthly_salary: MonthlySalary}) => {
        return (
            <tr className="text-right" key={monthly_salary.id}>
                <td>{idToTeacher.get(monthly_salary.id)?.display_name}</td>
                <td>{monthly_salary.gross_salary}</td>
                <td>{monthly_salary.tax_amount}</td>
                <td>{monthly_salary.trans_fee}</td>
                <td>{monthly_salary.gross_salary - monthly_salary.tax_amount + monthly_salary.trans_fee}</td>
            </tr>
        )
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr className="text-center" key="header">
                        <th>講師名</th>
                        <th>総額</th>
                        <th>源泉</th>
                        <th>交通費</th>
                        <th>入金額</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-right" key="sum">
                        <th>合計</th>
                        <th>{gross_salary_sum}</th>
                        <th>{tax_amount_sum}</th>
                        <th>{trans_fee_sum}</th>
                        <th>{net_salary_sum}</th>
                    </tr>
                    {monthlySalaryList.map(monthly_salary => <MonthlySalaryTableRow key={monthly_salary.id} monthly_salary={monthly_salary}/>)}
                </tbody>                
            </table>
        </div>
    )
}
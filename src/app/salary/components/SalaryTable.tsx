"use client"
import { useTeacherList } from "@/app/myfunctions";
import { Teacher } from "@/app/interfaces/teacher";
import { BaseAttendance, MonthlyAttendance } from "@/app/interfaces/timeslot";
import { LoadingIcon } from "@/components/LoadingIcon";
import { useUser } from "@/providers/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import internal from "stream";
import { start } from "repl";
import { useState } from "react";
import { PayslipTitle } from "./PayslipTitle";


const SalaryTable = ({
    attendanceList,
    year,
    month,
}: {
    attendanceList: BaseAttendance[],
    year?: string,
    month?: string,
}) => {
    const router = useRouter()
    const gross_salary_sum = attendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_gross_salary, 0)
    const extra_payment_sum = attendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.extra_payment, 0)
    const total_payment_sum = gross_salary_sum + extra_payment_sum
    const tax_amount_sum = attendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_tax_amount, 0)
    const net_salary_sum = gross_salary_sum - tax_amount_sum + extra_payment_sum
    const trans_fee_sum = attendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_trans_fee, 0)

    const SalaryTableRow = ({ attendance }: { attendance: BaseAttendance }) => {
        const query = new URLSearchParams({ year: year!, month: month! })
        const url = `/salary/view-payslip/monthly/${attendance.teacher.id}/?${query}`
        const onClick = () => {
            router.push(url)
        }
        const total_payment = attendance.monthly_gross_salary + attendance.extra_payment
        const net_salary = attendance.monthly_gross_salary + attendance.extra_payment - attendance.monthly_tax_amount
        return (
            <tr className="text-right" key={attendance.teacher.id}>
                <td className="text-center">{attendance.teacher.display_name}</td>
                <td>{attendance.monthly_gross_salary}</td>
                <td>{attendance.extra_payment}</td>
                <td>{total_payment}</td>
                <td>{attendance.monthly_tax_amount}</td>
                <td>{net_salary}</td>
                <td>{attendance.monthly_trans_fee}</td>
                {
                    year && month
                    &&
                    <td className="text-center"><button onClick={onClick} className="btn btn-sm btn-outline print:hidden">詳細</button></td>
                }
            </tr>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr className="text-center" key="header">
                        <th>講師名</th>
                        <th>給与</th>
                        <th>追加</th>
                        <th>総額</th>
                        <th>源泉</th>
                        <th>入金額</th>
                        <th>交通費</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-right" key="sum">
                        <th className="text-center">合計</th>
                        <th>{gross_salary_sum}</th>
                        <th>{extra_payment_sum}</th>
                        <th>{total_payment_sum}</th>
                        <th>{tax_amount_sum}</th>
                        <th>{net_salary_sum}</th>
                        <th>{trans_fee_sum}</th>
                    </tr>
                    {attendanceList.map(
                        attendance =>
                            <SalaryTableRow
                                key={attendance.teacher.id}
                                attendance={attendance}
                            />)}
                </tbody>
            </table>
        </div>
    )
}

export const MonthlySalaryTable = ({
    monthlyAttendanceList,
    year,
    month,
}: {
    monthlyAttendanceList: MonthlyAttendance[],
    year: string,
    month: string,
}) => {
    return (
        <div>
            <div className="space-y-2">
                <PayslipTitle>
                    {year}年{month}月 給与明細表
                </PayslipTitle>
                <SalaryTable attendanceList={monthlyAttendanceList} year={year} month={month} />
            </div>
        </div>
    )
}

export const YearlySalaryTable = ({
    attendanceList,
    start_year,
    start_month,
    end_year,
    end_month,
}: {
    attendanceList: BaseAttendance[],
    start_year: string,
    start_month: string,
    end_year: string,
    end_month: string,
}) => {
    return (
        <div className="space-y-2">
            <PayslipTitle>
                {start_year}年{start_month}月-{end_year}年{end_month}月 給与明細表
            </PayslipTitle>
            <SalaryTable attendanceList={attendanceList} />
        </div>
    )
}
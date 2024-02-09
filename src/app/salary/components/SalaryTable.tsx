"use client"
import { useTeacherList } from "@/app/myfunctions";
import { Teacher } from "@/app/types/teacher";
import { MonthlyAttendance } from "@/app/types/timeslot";
import { LoadingIcon } from "@/components/LoadingIcon";
import { useUser } from "@/providers/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const MonthlySalaryTable = ({
    monthlyAttendanceList,
    year,
    month,
}: {
    monthlyAttendanceList: MonthlyAttendance[],
    year: string,
    month: string,
}) => {
    const router = useRouter()
    const gross_salary_sum = monthlyAttendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_gross_salary, 0)
    const extra_payment_sum = monthlyAttendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.extra_payment, 0)
    const total_payment_sum = gross_salary_sum + extra_payment_sum
    const tax_amount_sum = monthlyAttendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_tax_amount, 0)
    const net_salary_sum = gross_salary_sum - tax_amount_sum + extra_payment_sum
    const trans_fee_sum = monthlyAttendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_trans_fee, 0)
    monthlyAttendanceList = monthlyAttendanceList.sort((a, b) => a.teacher.display_name.localeCompare(b.teacher.display_name))

    const MonthlySalaryTableRow = ({ monthly_attendance }: { monthly_attendance: MonthlyAttendance }) => {
        const query = new URLSearchParams({ year: year.toString(), month: month.toString() })
        const url = `/salary/view-payslip/${monthly_attendance.teacher.id}/?${query}`
        const onClick = () => {
            router.push(url)
        }
        const total_payment = monthly_attendance.monthly_gross_salary + monthly_attendance.extra_payment
        const net_salary = monthly_attendance.monthly_gross_salary + monthly_attendance.extra_payment - monthly_attendance.monthly_tax_amount
        return (
            <tr className="text-right" key={monthly_attendance.teacher.id}>
                <td className="text-center">{monthly_attendance.teacher.display_name}</td>
                <td>{monthly_attendance.monthly_gross_salary}</td>
                <td>{monthly_attendance.extra_payment}</td>
                <td>{total_payment}</td>
                <td>{monthly_attendance.monthly_tax_amount}</td>                
                <td>{net_salary}</td>
                <td>{monthly_attendance.monthly_trans_fee}</td>
                <td className="text-center"><button onClick={onClick} className="btn btn-sm btn-outline print:hidden">詳細</button></td>
            </tr>
        )
    }

    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <h2>{year}年{month}月 給与明細表</h2>
                </div>
            </div>
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
                        {monthlyAttendanceList.map(
                            monthly_attendance =>
                                <MonthlySalaryTableRow
                                    key={monthly_attendance.teacher.id}
                                    monthly_attendance={monthly_attendance}
                                />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const YearlySalaryTable = ({
    monthlyAttendanceList,
    year,
}: {
    monthlyAttendanceList: MonthlyAttendance[],
    year: string,    
}) => {
    const user = useUser()
    const { data: teacherList, error, isLoading}: {data: Teacher[], error: any, isLoading: any} = useTeacherList(user?.school_id)
    if (error) return <div>{error}</div>
    if (isLoading) return <LoadingIcon/>

    const gross_salary_yearly = monthlyAttendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_gross_salary, 0)
    const extra_payment_yearly = monthlyAttendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.extra_payment, 0)
    const total_payment_yearly = gross_salary_yearly + extra_payment_yearly
    const tax_amount_yealy = monthlyAttendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_tax_amount, 0)
    const net_salary_yearly = gross_salary_yearly - tax_amount_yealy + extra_payment_yearly
    const trans_fee_yearly = monthlyAttendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_trans_fee, 0)

    const teacher2attendance = new Map<Teacher, MonthlyAttendance[]>()
    for (const teacher of teacherList) {
        teacher2attendance.set(
            teacher,
            monthlyAttendanceList.filter((monthly_attendance) => (monthly_attendance.teacher.id == teacher.id))
        )
    }

    const YearlySalaryTableRow = ({ teacher, monthly_attendance_list }: { teacher: Teacher, monthly_attendance_list: MonthlyAttendance[] }) => {
        const gross_salary_sum = monthly_attendance_list.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_gross_salary, 0)
        const extra_payment_sum = monthly_attendance_list.reduce((sum, monthly_attendance) => sum + monthly_attendance.extra_payment, 0)
        const total_payment_sum = gross_salary_sum + extra_payment_sum
        const tax_amount_sum = monthly_attendance_list.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_tax_amount, 0)
        const net_salary_sum = gross_salary_sum - tax_amount_sum + extra_payment_sum
        const trans_fee_sum = monthly_attendance_list.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_trans_fee, 0)
        
        

        return (
            <tr className="text-right" key={teacher.id}>
                <td className="text-center">{teacher.display_name}</td>
                <td>{gross_salary_sum}</td>                                
                <td>{extra_payment_sum}</td>
                <td>{total_payment_sum}</td>
                <td>{tax_amount_sum}</td>                
                <td>{net_salary_sum}</td>
                <td>{trans_fee_sum}</td>
            </tr>
        )
    }

    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <h2>{year}年 給与計算管理表</h2>
                </div>
            </div>
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
                            <th>{gross_salary_yearly}</th>
                            <th>{extra_payment_yearly}</th>
                            <th>{total_payment_yearly}</th>
                            <th>{tax_amount_yealy}</th>                                                        
                            <th>{net_salary_yearly}</th>
                            <th>{trans_fee_yearly}</th>
                        </tr>
                        {teacherList.map(
                            (teacher) =>
                                <YearlySalaryTableRow
                                    key={teacher.id}
                                    teacher={teacher}
                                    monthly_attendance_list={teacher2attendance.get(teacher)!}
                                />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
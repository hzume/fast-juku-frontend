"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { useApiPath } from "@/providers/ApiPathContext";
import { useUser } from "@/providers/UserContext";
import { YearlySalaryTable, MonthlySalaryTable } from "../../components/SalaryTable";
import { BaseAttendance, MonthlyAttendance } from "@/app/interfaces/timeslot";
import { showDeleteModal } from "../../components/DeleteModal";
import useSWR from "swr";
import ReactToPrint from "react-to-print";
import { LoadingIcon } from "@/components/LoadingIcon";
import { useMonthlyAttendanceList, useYearlyAttendanceList } from "@/app/myfunctions";
import { start } from "repl";
import { Teacher } from "@/app/interfaces/teacher";

interface YearMonth {
    year: number,
    month: number
}

const getBetweenAttendance = (monthlyAttendanceList: MonthlyAttendance[], startYear: string, startMonth: string, endYear: string, endMonth: string) => {
    if (!monthlyAttendanceList || !startYear || !startMonth || !endYear || !endMonth) {
        return {
            attendanceList: [],
            notExistYearMonthList: []
        }
    }
    const number_of_months = (Number(endYear) - Number(startYear)) * 12 + (Number(endMonth) - Number(startMonth)) + 1
    const tobeYearMonthSet = new Set<YearMonth>()
    for (let i = 0; i < number_of_months; i++) {
        const year = Number(startYear) + Math.floor((Number(startMonth) + i - 1) / 12)
        const month = (Number(startMonth) + i - 1) % 12 + 1
        tobeYearMonthSet.add({year: year, month: month})
    }

    const teacherSet = new Set<Teacher>()
    const existYearMonthSet = new Set<YearMonth>()
    for (const monthlyAttendance of monthlyAttendanceList) {
        teacherSet.add(monthlyAttendance.teacher)
        existYearMonthSet.add({year: monthlyAttendance.year, month:monthlyAttendance.month})
    }
    console.log(existYearMonthSet)
    const teacherList = Array.from(teacherSet)
    const notExistYearMonthList: YearMonth[] = []
    const tobeYearMonthList = Array.from(tobeYearMonthSet)
    for (const yearMonth of tobeYearMonthList) {
        if (!existYearMonthSet.has(yearMonth)) {
            notExistYearMonthList.push(yearMonth)
        }
    }

    const attendanceList: BaseAttendance[] = []
    for (const teacher of teacherList) {
        const teacherAttendanceList = monthlyAttendanceList.filter(attendance => attendance.teacher.id === teacher.id)
        if (teacherAttendanceList.length === 0) continue
        const yearly_gross_salary = teacherAttendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_gross_salary, 0)
        const yearly_extra_payment = teacherAttendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.extra_payment, 0)
        const yearly_tax_amount = teacherAttendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_tax_amount, 0)
        const yearly_trans_fee = teacherAttendanceList.reduce((sum, monthly_attendance) => sum + monthly_attendance.monthly_trans_fee, 0)
        const attendance: BaseAttendance = {
            teacher: teacher,
            monthly_gross_salary: yearly_gross_salary,
            monthly_tax_amount: yearly_tax_amount,
            extra_payment: yearly_extra_payment,
            monthly_trans_fee: yearly_trans_fee
        }
        attendanceList.push(attendance)
    }
    return {
        attendanceList: attendanceList,
        notExistYearMonthList: notExistYearMonthList
    }
}


export default function Page() {
    const user = useUser();
    const router = useRouter()
    const componentRef = useRef(null)

    const searchParams = useSearchParams()
    const year_init = searchParams.get('start_year')
    const month_init = searchParams.get('start_month')
    const [startYear, setStartYear] = useState<string | null>(year_init)
    const [startMonth, setStartMonth] = useState<string | null>(month_init)
    let endYear: string | null
    let endMonth: string | null
    if (startYear && startMonth) {
        endMonth = ((Number(startMonth) + 10) % 12 + 1).toString()
        endYear = (Number(startYear) + Math.ceil((Number(startMonth) - 1) / 12)).toString()
    }
    else {
        endMonth = null
        endYear = null
    }

    const { data: monthlyAttendanceList, error, isLoading } = useYearlyAttendanceList(user?.school_id!, startYear, startMonth, endYear, endMonth)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const start_year = form.start_year.value
        const start_month = form.start_month.value
        if ((start_year === '') || (start_month === '')) return
        setStartYear(start_year)
        setStartMonth(start_month)
        const query = new URLSearchParams({ start_year: start_year, start_month: start_month })
        router.push(`/salary/view-payslip/yearly/?${query}`)
    }

    if (error) return <div>{error}</div>;
    if (!user) return <LoadingIcon />

    const { attendanceList, notExistYearMonthList } = getBetweenAttendance(monthlyAttendanceList, startYear!, startMonth!, endYear!, endMonth!)

    return (
        <div className="space-y-8">
            <div className="flex justify-between">
                <form className="form-control w-2/3 max-w-full" onSubmit={onSubmit}>
                    <div>
                        <div className="md:flex gap-2">
                            <div className='w-1/3'>
                                <input
                                    type="number"
                                    defaultValue={startYear!}
                                    placeholder="type year"
                                    min={0} max={3000}
                                    name='start_year'
                                    className="input w-full input-bordered" />
                            </div>
                            <div className="label">
                                <div className="label-text text-xl">年</div>
                            </div>
                            <div className='w-1/5'>
                                <input
                                    type="number"
                                    defaultValue={startMonth!}
                                    placeholder="type month"
                                    min={1} max={12}
                                    name='start_month'
                                    className="input w-full input-bordered" />
                            </div>
                            <div className="label">
                                <div className="label-text text-xl">月</div>
                            </div>
                            <div className="label w-1/2">
                                <div className="label-text text-xl">から1年間分を表示</div>
                            </div>
                            <button type='submit' className='btn btn-primary'>送信</button>
                        </div>
                    </div>
                </form>
            </div>
            {
                startMonth && startYear && endYear && endMonth
                &&
                monthlyAttendanceList
                &&
                <div>
                    <div className="flex mb-4 gap-4">
                        <ReactToPrint
                            trigger={() => <button className="btn">印刷</button>}
                            pageStyle="@page { size: A4 ; margin: 0; }"
                            content={() => componentRef.current}
                            documentTitle={startYear + "年" + startMonth + "月給与明細表"}
                        />
                        {
                            notExistYearMonthList.length > 0
                            &&
                            <div role="alert" className="alert alert-warning">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <div className="font-bold">
                                    警告：{notExistYearMonthList.map(({year, month}) => year + "年" + month + "月").join(", ")}の時間割が未登録です
                                </div>
                            </div>
                        }
                    </div>
                    <div ref={componentRef} className="print:w-a4 print:p-8">
                        <YearlySalaryTable
                            attendanceList={attendanceList}
                            start_year={startYear}
                            start_month={startMonth}
                            end_year={endYear}
                            end_month={endMonth}
                        />
                    </div>
                </div>
            }
            {
                isLoading
                &&
                <LoadingIcon />
            }
        </div>
    )
}
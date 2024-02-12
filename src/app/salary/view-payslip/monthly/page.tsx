"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { useApiPath } from "@/providers/ApiPathContext";
import { useUser } from "@/providers/UserContext";
import { YearlySalaryTable, MonthlySalaryTable } from "../../components/SalaryTable";
import { getPreviousYearMonth, useMonthlyAttendanceList } from "@/app/myfunctions";
import { MonthlyAttendance } from "@/app/interfaces/timeslot";
import { showDeleteModal } from "../../components/DeleteModal";
import useSWR from "swr";
import ReactToPrint from "react-to-print";
import { LoadingIcon } from "@/components/LoadingIcon";


export default function Page() {
    const user = useUser();
    const router = useRouter()
    const componentRef = useRef(null)

    const searchParams = useSearchParams()
    const year_init = searchParams.get('year')
    const month_init = searchParams.get('month')
    const [year, setYear] = useState<string | null>(year_init)
    const [month, setMonth] = useState<string | null>(month_init)

    const { data: monthlyAttendanceList, error, isLoading } = useMonthlyAttendanceList(user?.school_id!, year, month)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if ((form.year.value === '') || (form.month.value === '')) return
        setYear(form.year.value)
        setMonth(form.month.value)
        const query = new URLSearchParams({ year: form.year.value, month: form.month.value })
        router.push(`/salary/view-payslip/monthly/?${query}`)
    }

    if (error) return <div>{error}</div>;
    if (!user) return <LoadingIcon />

    return (
        <div className="space-y-8">
            <div className="flex justify-between">
                <form className="form-control w-1/2 max-w-full" onSubmit={onSubmit}>
                    <div className="md:flex gap-2">
                        <div className='w-11/12'>
                            <input
                                type="number"
                                defaultValue={year!}
                                placeholder="type year"
                                min={0} max={3000}
                                name='year'
                                className="input w-full input-bordered" />
                        </div>
                        <div className="label">
                            <div className="label-text text-xl">年</div>
                        </div>
                        <div className='w-11/12'>
                            <input
                                type="number"
                                defaultValue={month!}
                                placeholder="type month"
                                min={1} max={12}
                                name='month'
                                className="input w-full input-bordered" />
                        </div>
                        <div className="label">
                            <div className="label-text text-xl">月</div>
                        </div>
                        <button type='submit' className='btn btn-primary'>送信</button>
                    </div>
                </form>
                {
                    month && year
                    &&
                    !isLoading
                    &&
                    <button className="btn btn-outline btn-sm btn-error" onClick={() => showDeleteModal(year, month)}>{month}月データ削除</button>
                }
            </div>
            {
                month && year
                &&
                !isLoading
                &&
                <div>
                    <div className="mb-4 flex gap-4">
                        <ReactToPrint
                            trigger={() => <button className="btn mb-4">印刷</button>}
                            pageStyle="@page { size: A4 ; margin: 0; }"
                            content={() => componentRef.current}
                            documentTitle={year + "年" + month + "月給与明細表"}
                        />
                        {
                            monthlyAttendanceList.length === 0
                            &&
                            <div role="alert" className="alert alert-warning">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <div className="font-bold">
                                    警告：{year}年{month}月の時間割は未登録です
                                </div>
                            </div>
                        }
                    </div>
                    <div ref={componentRef} className="print:w-a4 print:p-8">
                        <MonthlySalaryTable monthlyAttendanceList={monthlyAttendanceList} year={year} month={month} />
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
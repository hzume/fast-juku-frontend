"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { use, useRef, useState } from "react";
import { useApiPath } from "@/providers/ApiPathContext";
import { useUser } from "@/providers/UserContext";
import { YearlySalaryTable, MonthlySalaryTable } from "../components/SalaryTable";
import { getPreviousYearMonth, useTeacherList } from "@/app/myfunctions";
import { MonthlyAttendance } from "@/app/types/timeslot";
import { showDeleteModal } from "../components/DeleteModal";
import useSWR, { mutate } from "swr";
import ReactToPrint from "react-to-print";
import { LoadingIcon } from "@/components/LoadingIcon";


export default function Page() {
    const user = useUser();
    const API_PATH = useApiPath();
    const router = useRouter()
    const componentRef = useRef(null)

    const searchParams = useSearchParams()
    const year_init = searchParams.get('year')
    const month_init = searchParams.get('month')
    if (!year_init) {
        const { year, month } = getPreviousYearMonth()
        const query = new URLSearchParams({ year: year.toString(), month: month.toString() })
        router.push(`/salary/view-payslip/?${query}`)
    }
    const [year, setYear] = useState<string>(year_init!)
    const [month, setMonth] = useState<string>(month_init!)

    const fetcher = async (url: string) => {
        const res = await fetch(url)
        return await res.json()
    }
    const option = { revalidateOnFocus: false }
    const query = new URLSearchParams({ year: year, month: month })
    const api_url = new URL(`salary/bulk/${user?.school_id}/?${query}`, API_PATH)
    const { data: monthlyAttendanceList, error, isLoading }: 
        {data: MonthlyAttendance[], error:any, isLoading: boolean} = useSWR(api_url.href, fetcher, option)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if ((form.year.value === '') || (form.month.value === '')) return
        setYear(form.year.value)
        setMonth(form.month.value)
        const query = new URLSearchParams({ year: year, month: month! })
        router.push(`/salary/view-payslip/?${query}`)
    }

    if (error) return <div>{error}</div>;
    if (!user) return <LoadingIcon/>
    if (isLoading) return <LoadingIcon/>

    return (
        <div className="space-y-8">
            <div className="flex justify-between">
                <form className="form-control w-1/2 max-w-full" onSubmit={onSubmit}>
                    <div className="md:flex gap-2">
                        <div className='w-11/12'>
                            <input type="number" defaultValue={year!} min={0} max={3000} name='year' placeholder="type year" className="input w-full input-bordered" />
                        </div>
                        <div className="label">
                            <div className="label-text text-xl">年</div>
                        </div>
                        <div className='w-11/12'>
                            <input type="number" defaultValue={month!} min={1} max={12} name='month' placeholder="type month" className="input w-full input-bordered" />
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
                    monthlyAttendanceList.length > 0
                    &&                    
                    <button className="btn btn-outline btn-sm btn-error" onClick={() => showDeleteModal(year, month)}>{month}月データ削除</button>
                }
            </div>
            {
                month && year
                &&
                monthlyAttendanceList.length > 0
                &&
                <div>
                    <ReactToPrint
                        trigger={() => <button className="btn mb-4">印刷</button>}
                        pageStyle="@page { size: A4 ; margin: 0; }"
                        content={() => componentRef.current}
                        documentTitle={year + "年" + month + "月給与明細表"}
                    />
                    <div ref={componentRef} className="print:w-a4 print:p-8">
                        <MonthlySalaryTable monthlyAttendanceList={monthlyAttendanceList} year={year} month={month} />
                    </div>
                </div>

            }
            {
                isLoading
                &&
                <LoadingIcon/>
            }
        </div>
    )
}
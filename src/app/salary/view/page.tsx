"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { use, useState } from "react";
import { useApiPath } from "@/providers/ApiPathContext";
import { useUser } from "@/providers/UserContext";
import { YearlySalaryTable, MonthlySalaryTable } from "../components/SalaryTable";
import { getPreviousYearMonth, useTeacherList } from "@/app/myfunctions";
import { MonthlyAttendance } from "@/app/types/timeslot";
import { showDeleteModal } from "../components/DeleteModal";
import useSWR, { mutate } from "swr";


export default function Page() {
    const [monthlyAttendanceList, setMonthlyAttendanceList] = useState<MonthlyAttendance[]>([])
    const user = useUser();
    const API_PATH = useApiPath();
    const router = useRouter()

    const searchParams = useSearchParams()
    const year_init = searchParams.get('year')
    const month_init = searchParams.get('month')
    if (!year_init) {
        const { year, month } = getPreviousYearMonth() 
        const query = new URLSearchParams({ year: year.toString(), month: month.toString() })
        router.push(`/salary/view/?${query}`)
    }
    const [year, setYear] = useState<string>(year_init!)
    const [month, setMonth] = useState<string | null>(month_init)

    const fetcher = async (url: string) => {
        const res = await fetch(url)
        const monthly_attendance_list = await res.json()
        setMonthlyAttendanceList(monthly_attendance_list)
    }

    let query: URLSearchParams
    if (month) {
        query = new URLSearchParams({ year: year!, month: month })
    }
    else {
        query = new URLSearchParams({ year: year! })
    }
    const api_url = new URL(`salary/bulk/${user?.school_id}/?${query}`, API_PATH)
    const option = {
        revalidateOnFocus: false,
    }
    const { data, error, isLoading: isLoading } = useSWR(api_url.href, fetcher, option)


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        setYear(form.year.value)
        setMonth(form.month.value)
        let query: URLSearchParams
        if (form.month.value=="") {
            query = new URLSearchParams({ year: year })
        }
        else {
            query = new URLSearchParams({ year: year, month: month! })
        }        
        router.push(`/salary/view/?${query}`)
    }

    if (error) return <div>{error}</div>;
    if (!user) return <span className="loading loading-lg"></span>
    if (isLoading) return <span className="loading loading-lg"></span>

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
                            {
                                month
                                &&
                                <input type="number" defaultValue={month} min={1} max={12} name='month' placeholder="type month" className="input w-full input-bordered" />
                            }
                            {
                                !month
                                &&
                                <input type="number" min={1} max={12} name='month' placeholder="type month" className="input w-full input-bordered" />
                            }                            
                        </div>
                        <div className="label">
                            <div className="label-text text-xl">月</div>
                        </div>
                        <button type='submit' className='btn btn-primary'>送信</button>
                    </div>
                </form>
                {
                    monthlyAttendanceList.length > 0
                    &&
                    month
                    &&
                    <button className="btn btn-outline btn-sm btn-error" onClick={() => showDeleteModal(year!, month)}>{month}月データ削除</button>
                }
            </div>
            {
                monthlyAttendanceList.length > 0
                &&
                month 
                &&
                <MonthlySalaryTable monthlyAttendanceList={monthlyAttendanceList} year={year!} month={month} />
            }
            {
                monthlyAttendanceList.length > 0
                &&
                !month 
                &&
                <YearlySalaryTable monthlyAttendanceList={monthlyAttendanceList} year={year!}/>
            }
            {
                isLoading
                &&
                <span className="loading loading-lg"></span>
            }
        </div>
    )
}
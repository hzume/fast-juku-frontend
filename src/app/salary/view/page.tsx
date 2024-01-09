"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MonthlySalary } from "@/app/types/salary";
import { useApiPath } from "@/providers/ApiPathContext";
import { useUser } from "@/providers/UserContext";
import { AnnualSalaryTable, MonthlySalaryTable } from "../components/SalaryTable";
import { useTeacherList } from "@/app/myfunctions";

export default function Page() {
    const [monthlySalaryList, setMonthlySalaryList] = useState<MonthlySalary[]>([])
    const [month, setMonth] = useState<number>(0)
    const [year, setYear] = useState<number>(0)
    const [isAnnual, setIsAnnual] = useState<boolean>(true)
    const user = useUser();
    const { data: teacherList } = useTeacherList(user?.school_id)
    const API_PATH = useApiPath();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const year = form.year.value;
        setYear(year)
        const query = new URLSearchParams({ year: year })
        const api_url = new URL(`salary/bulk/${user?.school_id}/?${query}`, API_PATH)
        const res = await fetch(api_url.href)
        const monthly_salary_list: MonthlySalary[] = await res.json()
        setMonthlySalaryList(monthly_salary_list)
    }
    if (monthlySalaryList.length != 0) {
        if (isAnnual) {
            return (
                <div>
                <div className="space-y-2">
                    <div className="flex gap-4">
                        <h2>{year}年 年間給与計算管理表</h2>
                        <button onClick={() => setIsAnnual(false)}>(月間で見る)</button>
                    </div>
                    <AnnualSalaryTable monthlySalaryList={monthlySalaryList} teacherList={teacherList} year={year}/>
                </div>
                </div>
            )
        }
        else {
            return (
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <div className="flex gap-4">
                        <h2>{year}年{month}月 給与計算管理表</h2>
                        <button onClick={() => setIsAnnual(true)}>(年間で見る)</button>                        
                        </div>
                        <div className="join grid grid-cols-2">
                        <button className="join-item" onClick={() => { setMonth(month - 1) }}>{"<前月|"}</button>
                            <button className="join-item" onClick={() => { setMonth(month + 1) }}>{"次月>"}</button>
                        </div>
                    </div>
                    <MonthlySalaryTable monthlySalaryList={monthlySalaryList.filter(
                        monthly_salary => monthly_salary.month == month
                    )} teacherList={teacherList}/>
                </div>
            )
        } 
    }

    return (
        <div>
            <form className="form-control w-1/2 max-w-full space-y-4" onSubmit={onSubmit}>
                <div className='w-11/12'>
                    <div className="label">
                        <div className="label-text">年</div>
                    </div>
                    <input type="number" min={0} max={3000} name='year' placeholder="type year" className="input w-full input-bordered" />
                </div>
                <button type='submit' className='btn btn-primary'>送信</button>
            </form>
        </div>
    )
}
"use client"
import { MonthlyAttendance, Timeslot } from "@/app/types/timeslot"
import { useApiPath } from "@/providers/ApiPathContext"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { DetailSalaryTable } from "../../components/DetailSalaryTable"
import { Teacher } from "@/app/types/teacher"

export default function Page({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams()
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const API_PATH = useApiPath()
    const [updateValues, setUpdateValues] = useState<
        { timeslot_list: Timeslot[], teacher: Teacher, extra_payment: number }>({
            timeslot_list: [],
            teacher: {
                id: "", school_id: "", display_name: "", family_name: "", given_name: "",
                lecture_hourly_pay: 0, office_hourly_pay: 0, trans_fee: 0, teacher_type: ""
            },
            extra_payment: 0
        })

    const fetcher = async (url: string) => {
        const res = await fetch(url)
        return await res.json()
    }
    const api_url = new URL(`salary/${params.id}/?year=${year}&month=${month}`, API_PATH)
    const { data: ma, error, isLoading, mutate }:
        { data: MonthlyAttendance, error: any, isLoading: any, mutate:any } = useSWR(api_url.href, fetcher)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const data = Object.fromEntries(new FormData(form))
        if (data.lecture_hourly_pay.toString() === "") return
        const extra_payment = Number(data.lecture_hourly_pay)
        try {
            const res = await fetch(api_url.href, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ timeslot_list: ma.timeslot_list, teacher: ma.teacher, extra_payment: extra_payment })            
            })
            mutate()
        }
        catch (err) {
            console.log(err)
        }
    }

    if (error) return <div>{error}</div>
    if (isLoading) return <span className="loading loading-lg"></span>
    return (
        <div className="space-y-4">
            <form onSubmit={onSubmit}>
                <div className="flex gap-2">
                    <input name="lecture_hourly_pay" type="number" min={0} placeholder="追加給与を設定" className="input input-bordered w-1/5" />
                    <div className="mt-4 text-xl">円</div>
                    <button type="submit" className="btn btn-primary">送信</button>
                </div>
            </form>
            <DetailSalaryTable ma={ma} year={year!} month={month!} />
        </div>
    )
}
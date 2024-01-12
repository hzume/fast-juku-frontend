"use client"
import { MonthlyAttendance } from "@/app/types/timeslot"
import { useApiPath } from "@/providers/ApiPathContext"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import useSWR from "swr"

export default function Page({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams()
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const API_PATH = useApiPath()

    const fetcher = async (url: string) => {
        const res = await fetch(url)
        return await res.json()
    }
    
    const api_url = new URL(`salary/${params.id}/?year=${year}&month=${month}`, API_PATH)
    const { data: ma, error, isLoading }:
        { data: MonthlyAttendance, error: any, isLoading: any } = useSWR(api_url.href, fetcher)

    const DetailRow = ({ ma, i }: { ma: MonthlyAttendance, i: number }) => {
        const timeslot_len = 5
        const isAttendInit: boolean[] = new Array(timeslot_len).fill(false)
        for (let timeslot of ma.timeslot_list) {
            if (timeslot.day != i + 1) continue
            if (timeslot.timeslot_number == 0) continue
            isAttendInit[timeslot.timeslot_number - 1] = true
        }
        const [isAttendList, setIsAttendList] = useState<boolean[]>(isAttendInit)

        const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setIsAttendList((prev) => {
                const j = Number(event.target.name)
                const new_isAttend = [...prev]
                new_isAttend[j] = event.target.checked
                return new_isAttend
            })
        }
        return (
            <tr>
                <td key="day" className="text-right">{i + 1}</td>
                {isAttendList.map((isAttend, j) => {
                    return <td key={j.toString()} className="text-center"><input name={j.toString()} onChange={onChange} type="checkbox" checked={isAttend} className="checkbox" /></td>
                })}
                <td key="lec">{ma.daily_lecture_amount[i]}</td>
                <td key="off">{ma.daily_officework_amount[i]}</td>
                <td key="late">{ma.daily_latenight_amount[i]}</td>
                <td key="eight">{ma.daily_over_eight_hour_amount[i]}</td>
                <td><input type="checkbox" checked={ma.daily_attendance[i]} className="checkbox" disabled /></td>
            </tr>
        )
    }

    if (error) return <div>{error}</div>
    if (isLoading) return <span className="loading loading-lg"></span>
    const name = ma.teacher.family_name + " " + ma.teacher.given_name


    return (
        <div className="space-y-4">
            <div className="flex gap-8 text-xl">
                <h1>{year}年{month}月 給与計算管理表</h1>
                <h1>{name} 殿</h1>
            </div>
            <div className="flex gap-4">
                <table className="table text-xl">
                    <thead className="text-right">
                        <tr>
                            <th>合計額</th>
                            <th>源泉</th>
                            <th>交通費</th>
                            <th>追加</th>
                            <th>支給額</th>
                        </tr>
                    </thead>
                    <tbody className="text-right">
                        <tr>
                            <td>{ma.monthly_gross_salary}円</td>
                            <td>{ma.monthly_tax_amount}円</td>
                            <td>{ma.monthly_trans_fee}円</td>
                            <td>{ma.extra_payment}円</td>
                            <td>{ma.monthly_gross_salary - ma.monthly_tax_amount + ma.monthly_trans_fee}円</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th>日付</th>
                            <th>2:00-3:20</th>
                            <th>3:30-4:50</th>
                            <th>5:00-6:20</th>
                            <th>6:30-7:50</th>
                            <th>8:00-9:20</th>
                            <th>合計[分]</th>
                            <th>事務[分]</th>
                            <th>深夜勤務手当[分]</th>
                            <th>8時間超過勤務手当[分]</th>
                            <th>交通費</th>
                        </tr>
                    </thead>
                    <tbody className="text-right">
                        {Array.from(Array(31).keys()).map((i) => <DetailRow ma={ma} i={i} key={i} />)}
                        <tr>
                            <td>合計</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{ma.daily_lecture_amount.reduce((sum, e) => { return sum + e }, 0)}</td>
                            <td>{ma.daily_officework_amount.reduce((sum, e) => { return sum + e }, 0)}</td>
                            <td>{ma.daily_latenight_amount.reduce((sum, e) => { return sum + e }, 0)}</td>
                            <td>{ma.daily_over_eight_hour_amount.reduce((sum, e) => { return sum + e }, 0)}</td>
                            <td>{ma.daily_attendance.reduce((sum, e) => { return sum + Number(e) }, 0)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
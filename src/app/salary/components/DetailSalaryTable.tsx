import { C, timeslot_number2time, timeslot_number_length } from "@/app/const"
import { MonthlyAttendance, UpdateAttendanceReq } from "@/app/interfaces/timeslot"
import { Dispatch, SetStateAction, useState } from "react"


export const DetailSalaryTable = (
    {
        ma,
        year,
        month,
        updateAttendanceValues,
        setUpdateAttendanceValues,
    }: {
        ma: MonthlyAttendance,
        year: string,
        month: string,
        updateAttendanceValues: UpdateAttendanceReq,
        setUpdateAttendanceValues: Dispatch<SetStateAction<UpdateAttendanceReq>>,
    }) => {
    const DetailSalaryRow = ({ i }: { i: number }) => {
        const isAttendInit: boolean[] = new Array(timeslot_number_length).fill(false)
        for (let timeslot of updateAttendanceValues.timeslot_list) {
            if (timeslot.day != i + 1) continue
            if (timeslot.timeslot_number == 0) continue
            isAttendInit[timeslot.timeslot_number - 1] = true
        }
        const [isAttendList, setIsAttendList] = useState<boolean[]>(isAttendInit)

        const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const j = Number(event.target.name)            
            setIsAttendList((prev) => {                
                const new_isAttend = [...prev]
                new_isAttend[j] = event.target.checked            
                return new_isAttend
            })            

            setUpdateAttendanceValues((prev) => {
                const new_timeslot_list = [...updateAttendanceValues.timeslot_list]
                const start_time_hour = timeslot_number2time.get(j + 1)!.split('-')[0].split(':')[0]
                const start_time_minute = timeslot_number2time.get(j + 1)!.split('-')[0].split(':')[1]
                const end_time_hour = timeslot_number2time.get(j + 1)!.split('-')[1].split(':')[0]
                const end_time_minute = timeslot_number2time.get(j + 1)!.split('-')[1].split(':')[1]
                const start_time = new Date(Number(year), Number(month) - 1, i + 1, Number(start_time_hour), Number(start_time_minute))
                const end_time = new Date(Number(year), Number(month) - 1, i + 1, Number(end_time_hour), Number(end_time_minute))
                if (event.target.checked) {
                    new_timeslot_list.push({
                        day: i + 1,
                        start_time: start_time,
                        end_time: end_time,
                        timeslot_number: j + 1,
                        timeslot_type: "lecture",
                    })
                }
                else {
                    const index = new_timeslot_list.findIndex((timeslot) => {
                        return timeslot.day == i + 1 && timeslot.timeslot_number == j + 1
                    })
                    new_timeslot_list.splice(index, 1)
                }
                return { ...prev, timeslot_list: new_timeslot_list }
            })
        }
        return (
            <tr>
                <td key="day" className="text-right">{i + 1}</td>
                {isAttendList.map((isAttend, j) => {
                    return <td key={j.toString()} className="text-center"><input name={j.toString()} onChange={onChange} type="checkbox" checked={isAttend} /></td>
                })}
                <td key="lec">{ma.daily_lecture_amount[i]}</td>
                <td key="off">{ma.daily_officework_amount[i]}</td>
                <td key="late">{ma.daily_latenight_amount[i]}</td>
                <td key="eight">{ma.daily_over_eight_hour_amount[i]}</td>
                <td><input type="checkbox" checked={ma.daily_attendance[i]} disabled /></td>
            </tr>
        )
    }


    const name = ma.teacher.family_name + " " + ma.teacher.given_name
    const total_payment = ma.monthly_gross_salary + ma.extra_payment
    const net_salary = ma.monthly_gross_salary + ma.extra_payment - ma.monthly_tax_amount

    return (
        <div className="print:p-8">
            <div className="space-y-4">
                <div className="flex gap-8 text-xl">
                    <h1>{year}年{month}月 給与計算管理表</h1>
                    <h1>{name} 殿</h1>
                </div>
                <div className="flex gap-4">
                    <table className="table text-xl">
                        <thead className="text-right">
                            <tr>
                                <th>給与</th>
                                <th>追加</th>
                                <th>総額</th>
                                <th>源泉</th>
                                <th>支給額</th>
                                <th>交通費</th>
                            </tr>
                        </thead>
                        <tbody className="text-right">
                            <tr>
                                <td>{ma.monthly_gross_salary}円</td>
                                <td>{ma.extra_payment}円</td>
                                <td>{total_payment}円</td>
                                <td>{ma.monthly_tax_amount}円</td>
                                <td>{net_salary}円</td>
                                <td>{ma.monthly_trans_fee}円</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="">
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>日付</th>
                                {Array.from(Array(timeslot_number_length).keys()).map((i) => {
                                    return <th key={i}>{timeslot_number2time.get(i + 1)}</th>
                                })}
                                <th>合計[分]</th>
                                <th>事務[分]</th>
                                <th>深夜勤務<br/>手当[分]</th>
                                <th>8時間<br/>超過勤務<br/>手当[分]</th>
                                <th>交通費</th>
                            </tr>
                        </thead>
                        <tbody className="text-right">
                            {Array.from(Array(31).keys()).map((i) => <DetailSalaryRow i={i} key={i} />)}
                            <tr>
                                <td>合計</td>
                                {Array.from(Array(timeslot_number_length).keys()).map((i) => <td key={i}></td>)}
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
            <div className="text-xl ml-5 pt-4 w-full">
                備考
            </div>
            <div className="flex gap-2 border rounded-md ml-2 p-4">
                <span className="text-lg">{ma.remark}</span>
            </div>
        </div>
    )
}
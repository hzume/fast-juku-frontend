"use client"
import { MonthlyAttendance, TimeslotJS, UpdateAttendanceReq } from "@/app/interfaces/timeslot"
import { useApiPath } from "@/providers/ApiPathContext"
import { useSearchParams } from "next/navigation"
import { useRef, useState } from "react"
import useSWR from "swr"
import { DetailSalaryTable } from "../../../components/DetailSalaryTable"
import { LoadingIcon } from "@/components/LoadingIcon"
import ReactToPrint from "react-to-print"


export default function Page({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams()
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const API_PATH = useApiPath()
    const api_url = new URL(`salary/${params.id}/?year=${year}&month=${month}`, API_PATH)
    const [updateAttendanceValues, setUpdateAttendanceValues] = useState<UpdateAttendanceReq>(undefined!)
    const fetcher = async (url: string) => {
        const res = await fetch(url)
        const data: MonthlyAttendance = await res.json()
        const timeslot_js_list: TimeslotJS[] = []
        for (let timeslot of data.timeslot_list) {
            const timeslot_js: TimeslotJS = {
                year: Number(year),
                month: Number(month),
                day: timeslot.day,
                timeslot_number: timeslot.timeslot_number,
                timeslot_type: timeslot.timeslot_type
            }
            timeslot_js_list.push(timeslot_js)
        }
        setUpdateAttendanceValues({
            timeslot_js_list: timeslot_js_list,
            teacher: data.teacher,
            extra_payment: data.extra_payment,
            remark: data.remark,
        })
        return data
    }
    const option = {revalidateOnFocus: false}
    const { data: ma, error, isLoading, mutate } = useSWR(api_url.href, fetcher, option)
    const componentRef = useRef(null)

    const onChangeExtraPayment = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        if (value != "") {
            setUpdateAttendanceValues({ ...updateAttendanceValues, [name]: Number(value) })
        }
    }

    const onChangeRemark = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setUpdateAttendanceValues({ ...updateAttendanceValues, [name]: value })
    }

    const onClickUpdateButton = async () => {
        try {
            const res = await fetch(api_url.href, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateAttendanceValues)
            })
            mutate()
            alert('変更が完了しました')
            console.log(updateAttendanceValues)
        }
        catch (err) {
            console.log(err)            
        }
    }

    if (error) return <div>{error}</div>
    if (isLoading) return <LoadingIcon />

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
            <div className="flex gap-2">
                <div className="w-1/3">
                    <label>追加給与</label>
                    <div className="flex gap-2">
                        <input name="extra_payment" onChange={onChangeExtraPayment} type="number" min={0} defaultValue={ma!.extra_payment.toString()} className="input input-bordered w-full" />
                        <div className="mt-4 text-xl">円</div>
                    </div>
                </div>
                <div className="w-1/3">
                    <label>備考</label>
                    <div>
                        <textarea name="remark" onChange={onChangeRemark} defaultValue={ma!.remark} className="textarea textarea-bordered leading-none w-full" />
                    </div>
                </div>
                <div>
                    <label className="opacity-0 disable">透明なテキスト</label>
                    <div>
                        <button type="submit" className="btn btn-primary" onClick={onClickUpdateButton}>変更を確定</button>
                    </div>
                </div>
            </div>
            <ReactToPrint
                trigger={() => <button className="btn hidden">印刷</button>}
                pageStyle="@page { size: A4 ; margin: 0; }"
                content={() => componentRef.current}
            />
            </div>
            {
                updateAttendanceValues
                &&
                <div ref={componentRef} className="print:w-a4">
                    <DetailSalaryTable ma={ma!} year={year!} month={month!} updateAttendanceValues={updateAttendanceValues} setUpdateAttendanceValues={setUpdateAttendanceValues} />
                </div>
            }
            {
                !updateAttendanceValues
                &&
                <LoadingIcon />
            }

        </div>
    )
}
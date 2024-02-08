"use client"
import { MonthlyAttendance, Timeslot, UpdateAttendanceReq } from "@/app/types/timeslot"
import { useApiPath } from "@/providers/ApiPathContext"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import useSWR from "swr"
import { DetailSalaryTable } from "../../components/DetailSalaryTable"
import { LoadingIcon } from "@/components/LoadingIcon"
import { useAttendance, useAttendanceUrl } from "@/app/myfunctions"

export default function Page({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams()
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const api_url = useAttendanceUrl(params.id, Number(year), Number(month))
    
    const { data: ma, error, isLoading, mutate } = useAttendance(params.id, Number(year), Number(month))

    const [updateAttendanceValues, setUpdateAttendanceValues] = useState<UpdateAttendanceReq>(undefined!)

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
    
    let isLoadingUpdate = false
    const onClickUpdateButton = async () => {
        isLoadingUpdate = true
        try {
            const res = await fetch(api_url.href, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateAttendanceValues)
            })
            mutate()
            isLoadingUpdate = false
            console.log(await res.json())
        }
        catch (err) {
            console.log(err)
        }
    }
    
    if (error) return <div>{error}</div>
    if (isLoading || isLoadingUpdate) return <LoadingIcon />
    if (!isLoading && (updateAttendanceValues == undefined)) {
        setUpdateAttendanceValues({
            timeslot_list: ma.timeslot_list,
            teacher: ma.teacher,
            extra_payment: ma.extra_payment,
            remark: ma.remark,
        })
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <div className="w-1/5">
                    <label>追加給与</label>
                    <div className="flex gap-2">
                        <input name="extra_payment" onChange={onChangeExtraPayment} type="number" min={0} defaultValue={ma.extra_payment.toString()} className="input input-bordered w-full" />
                        <div className="mt-4 text-xl">円</div>
                    </div>
                </div>
                <div className="w-1/3">
                    <label>備考</label>
                    <div>
                        <textarea name="remark" onChange={onChangeRemark} defaultValue={ma.remark} className="textarea textarea-bordered leading-none w-full" />
                    </div>
                </div>
                <div>
                    <label className="opacity-0 disable">透明なテキスト</label>
                    <div>
                    <button type="submit" className="btn btn-primary" onClick={onClickUpdateButton}>変更を確定</button>
                    </div>                
                </div>
            </div>
            {
                updateAttendanceValues
                &&
                <DetailSalaryTable ma={ma} year={year!} month={month!} updateAttendanceValues={updateAttendanceValues} setUpdateAttendanceValues={setUpdateAttendanceValues}/>
            }
            {
                !updateAttendanceValues
                &&
                <LoadingIcon />
            }
            
        </div>
    )
}
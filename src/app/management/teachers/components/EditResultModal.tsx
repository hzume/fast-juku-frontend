"use client"

import { useTeacherListUrl } from "@/app/myfunctions"
import { Teacher } from "@/app/interfaces/teacher"
import { closeModal } from "@/components/Modal"
import { useUser } from "@/providers/UserContext"
import { useSWRConfig } from "swr"


export const EditResultModalContent = ({ teacher }: { teacher: Teacher }) => {
    const user = useUser()
    const api_url = useTeacherListUrl(user?.school_id)
    const { mutate } = useSWRConfig() 
    const onClick = () => {
        mutate(api_url.href)
        closeModal()
    }

    return (
        <div className="form-control w-full">
            <div className="overflow-x-auto space-y-4">
                <table className="table table-fixed">
                    <thead>
                        <tr key="header">
                            <th></th>
                            <th>表示名</th>
                            <th>苗字</th>
                            <th>名前</th>
                            <th>授業時給</th>
                            <th>事務時給</th>
                            <th>交通費</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key="after">
                            <th className="bg-base-200">変更後</th>
                            <th>{teacher?.display_name}</th>
                            <th>{teacher?.family_name}</th>
                            <th>{teacher?.given_name}</th>
                            <th>{teacher?.lecture_hourly_pay}</th>
                            <th>{teacher?.office_hourly_pay}</th>
                            <th>{teacher?.trans_fee}</th>
                        </tr>
                    </tbody>
                </table>

            </div>
            <button className="btn btn-primary" onClick={onClick}>閉じる</button>
        </div>
    )
}
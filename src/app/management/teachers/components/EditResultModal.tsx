"use client"
import { C } from "@/app/const"
import { Teacher, TeacherBase } from "@/app/types/teacher"
import { closeModal, showModal } from "@/components/Modal"
import { useUser } from "@/providers/UserContext"
import { useSWRConfig } from "swr"


export const showEditResultModal = (
    teacher: Teacher,
) => {
    showModal({
        title: '編集が完了しました',
        children: <EditResultModalContent teacher={teacher} />,
        canClose: false,
    });
}

const EditResultModalContent = ({ teacher }: { teacher: Teacher }) => {
    const { mutate } = useSWRConfig()
    const user = useUser()
    if (!user) return <span className="loading loading-spinner loading-lg"></span>

    const query = new URLSearchParams({ school_id: user.school_id });
    const api_url = new URL(`teachers/?${query}`, C.API_PATH)

    const onClick = () => {
        closeModal()
        mutate(api_url.href)
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
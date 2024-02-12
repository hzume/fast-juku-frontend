"use client"
import { C } from "@/app/const"
import { Teacher } from "@/app/interfaces/teacher"
import { useMonthlyAttendanceListUrl } from "@/app/myfunctions"
import { closeModal, showModal } from "@/components/Modal"
import { useApiPath } from "@/providers/ApiPathContext"
import { useUser } from "@/providers/UserContext"
import { mutate, useSWRConfig } from "swr"


export const showDeleteResultModal = (
    year: string,
    month: string,
) => {
    showModal({
        title: `${year}年${month}月の給与情報を削除しました。`,
        children: <DeleteResultModalContent year={year} month={month}/>,
        canClose: false,
    });
}

const DeleteResultModalContent = ({year, month}: {year: string, month:string}) => {
    const user = useUser()
    const api_url = useMonthlyAttendanceListUrl(user?.school_id!, year, month)
    const { mutate } = useSWRConfig()
    const onClick = () => {
        closeModal()
        mutate(api_url.href)
    }
    return (
        <div className="space-y-4">
            <button className="btn btn-primary btn-block" onClick={onClick}>閉じる</button>
        </div>
    )
}
"use client"
import { C } from "@/app/const"
import { Teacher } from "@/app/types/teacher"
import { closeModal, showModal } from "@/components/Modal"
import { useApiPath } from "@/providers/ApiPathContext"
import { useUser } from "@/providers/UserContext"
import { useSWRConfig } from "swr"


export const showDeleteResultModal = (
    year: string,
    month: string,
) => {
    showModal({
        title: `${year}年${month}月の給与情報を削除しました。`,
        children: <DeleteResultModalContent />,
        canClose: false,
    });
}

const DeleteResultModalContent = () => {
    const onClick = () => {
        closeModal()
    }
    return (
        <div className="space-y-4">
            <button className="btn btn-primary btn-block" onClick={onClick}>閉じる</button>
        </div>
    )
}
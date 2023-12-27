"use client"
import { C } from "@/app/const"
import { Teacher } from "@/app/types/teacher"
import { closeModal, showModal } from "@/components/Modal"
import { useUser } from "@/providers/UserContext"
import { useSWRConfig } from "swr"


export const showDeleteResultModal = (
    teacher: Teacher,
) => {
    showModal({
        title: '次の講師の削除が完了しました',
        children: <DeleteResultModalContent teacher={teacher}/>,
        canClose: false,
    });
}

const DeleteResultModalContent = ({teacher}:{teacher: Teacher}) => {
    const { mutate } = useSWRConfig()
    const user = useUser()
    if (!user) return <span className="loading loading-spinner loading-lg"></span>

    const query = new URLSearchParams({ school_id: user.school_id });
    const api_url = new URL(`teachers/?${query}`, C.API_PATH)

    const onClick = () => {
        closeModal()
        mutate(api_url.href)
    }
    const name = `${teacher.family_name} ${teacher.given_name}`;
    return (
        <div className="space-y-4">
            <div>{name}</div>
            <button className="btn btn-primary btn-block" onClick={onClick}>閉じる</button>
        </div>
    )
}
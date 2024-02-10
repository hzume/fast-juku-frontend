"use client"
import { useTeacherListUrl } from "@/app/myfunctions"
import { Teacher } from "@/app/interfaces/teacher"
import { closeModal } from "@/components/Modal"
import { useUser } from "@/providers/UserContext"
import { useSWRConfig } from "swr"


export const DeleteResultModalContent = ({teacher}:{teacher: Teacher}) => {
    const user = useUser()
    const { mutate } = useSWRConfig()
    const api_url = useTeacherListUrl(user?.school_id)
    const onClick = () => {
        mutate(api_url.href)
        closeModal()
    }
    const name = `${teacher.family_name} ${teacher.given_name}`;
    return (
        <div className="space-y-4">
            <div>{name}</div>
            <button className="btn btn-primary btn-block" onClick={onClick}>閉じる</button>
        </div>
    )
}
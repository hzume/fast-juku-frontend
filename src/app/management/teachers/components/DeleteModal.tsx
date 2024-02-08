"use client"
import { Teacher } from "@/app/types/teacher"
import showLoadingModal from "@/components/LoadingModal";
import { closeModal, showModal } from "@/components/Modal";
import { DeleteResultModalContent } from "./DeleteResultModal";
import { useApiPath } from "@/providers/ApiPathContext";
import { useUser } from "@/providers/UserContext";


export const ShowDeleteModalButton = ({ teacher }: { teacher: Teacher }) => {
    return (
        <button type="button" className="btn btn-outline btn-sm btn-error"
            onClick={() => showModal({
                title: '削除の確認',
                children: <DeleteModalContent teacher={teacher} />
            })
            }>
            削除
        </button>
    )
}

const DeleteModalContent = ({ teacher }: { teacher: Teacher }) => {
    const user = useUser();
    const API_PATH = useApiPath();
    const name = `${teacher.family_name} ${teacher.given_name}`;
    const deleteTeacher = () => {
        const api_url = new URL(`/teachers/${teacher.id}`, API_PATH);
        showLoadingModal()
        fetch(api_url.href, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => showModal({
                title: '次の講師の削除が完了しました',
                children: <DeleteResultModalContent teacher={teacher}/>,
                canClose: false,
            }))
    }

    return (
        <div className="w-full space-y-4 pt-4">
            <div>
                本当に「{name}」の登録情報を削除しますか？
            </div>
            <div className="flex justify-around">
                <button onClick={deleteTeacher} className="btn btn-error btn-active w-2/5">
                    削除
                </button>
                <button onClick={closeModal} className="btn w-2/5">
                    キャンセル
                </button>
            </div>
        </div>
    )
}
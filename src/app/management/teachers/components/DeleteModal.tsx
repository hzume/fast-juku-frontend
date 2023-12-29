"use client"
import { C } from "@/app/const";
import { Teacher } from "@/app/types/teacher"
import showLoadingModal from "@/components/LoadingModal";
import { closeModal, showModal } from "@/components/Modal";
import { showDeleteResultModal } from "./DeleteResultModal";
import { useApiPath } from "@/providers/ApiPathContext";


export const showDeleteModal = (teacher: Teacher) => {
    showModal({
        title: '削除の確認',
        children: <DeleteModalContent teacher={teacher} />
    });
};

const DeleteModalContent = ({ teacher }: { teacher: Teacher }) => {
    const API_PATH = useApiPath();
    const name = `${teacher.family_name} ${teacher.given_name}`;
    const deleteTeacher = () => {
        const api_url = new URL(`/teachers/${teacher.id}`, API_PATH);
        showLoadingModal()
        fetch(api_url.href, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                closeModal()
                showDeleteResultModal(teacher)
            })
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
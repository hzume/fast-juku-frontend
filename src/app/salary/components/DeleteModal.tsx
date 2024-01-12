"use client"
import { C } from "@/app/const";
import { Teacher } from "@/app/types/teacher"
import showLoadingModal from "@/components/LoadingModal";
import { closeModal, showModal } from "@/components/Modal";
import { showDeleteResultModal } from "./DeleteResultModal";
import { useApiPath } from "@/providers/ApiPathContext";
import { useUser } from "@/providers/UserContext";


export const showDeleteModal = (year: string, month: string) => {
    showModal({
        title: '削除の確認',
        children: <DeleteModalContent year={year} month={month} />
    });
};

const DeleteModalContent = ({ year, month }: { year: string, month: string }) => {
    const API_PATH = useApiPath();
    const user = useUser()
    const query = new URLSearchParams({ year: year, month: month })
    const deleteAttendance = () => {
        const api_url = new URL(`/salary/bulk/${user?.school_id}/?${query}`, API_PATH);
        showLoadingModal()
        fetch(api_url.href, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                closeModal()
                showDeleteResultModal(year, month)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="w-full space-y-4 pt-4">
            <div>
                本当に「{year}年{month}月」の登録情報を削除しますか？<br />
                元のデータは復元できません。
            </div>
            <div className="flex justify-around">
                <button onClick={deleteAttendance} className="btn btn-error btn-active w-2/5">
                    削除
                </button>
                <button onClick={closeModal} className="btn w-2/5">
                    キャンセル
                </button>
            </div>
        </div>
    )
}
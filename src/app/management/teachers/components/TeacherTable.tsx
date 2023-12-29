"use client"

import { showDeleteModal } from "./DeleteModal";
import { Teacher } from "@/app/types/teacher";
import { usePathname } from "next/navigation";
import { showEditModal } from "./EditModal";


const ShowEditModalButton = ({ teacher }: { teacher: Teacher }) => {
    return (
        <button onClick={() => showEditModal(teacher)} className="btn btn-outline btn-sm">
            編集
        </button>
    )
}

const ShowDeleteModalButton = ({ teacher }: { teacher: Teacher }) => {
    return (
        <button type="button" className="btn btn-outline btn-sm btn-error" onClick={() => showDeleteModal(teacher)}>
            削除
        </button>
    )
}

export const TeacherTable = ({ teacherList, isLoading }: { teacherList: Teacher[], isLoading: boolean }) => {
    const TeacherRow = ({ teacher }: { teacher: Teacher }) => {
        const name = `${teacher.family_name} ${teacher.given_name}`;
        return (
            <tr className="hover">
                <td>{name}</td>
                <td>{teacher.lecture_hourly_pay}</td>
                <td>{teacher.office_hourly_pay}</td>
                <td>{teacher.trans_fee}</td>
                <td><ShowEditModalButton teacher={teacher} /></td>
                <td><ShowDeleteModalButton teacher={teacher} /></td>
            </tr>
        )
    }
    if (isLoading) return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr key="header">
                            <th>名前</th>
                            <th>授業時給</th>
                            <th>事務時給</th>
                            <th>交通費</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="flex place-content-center mt-20">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        </div>
    )


    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr key="header">
                        <th>名前</th>
                        <th>授業時給</th>
                        <th>事務時給</th>
                        <th>交通費</th>
                    </tr>
                </thead>
                <tbody>
                    {teacherList.map(
                        teacher => <TeacherRow teacher={teacher} key={teacher.id} />
                    )}
                </tbody>
            </table>
        </div>
    )
}
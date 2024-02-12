"use client"
import { C } from "@/app/const"
import { Teacher, TeacherBase } from "@/app/interfaces/teacher"
import showLoadingModal from "@/components/LoadingModal";
import { closeModal, showModal } from "@/components/Modal"
import { EditResultModalContent } from "./EditResultModal";
import { useApiPath } from "@/providers/ApiPathContext";


export const EditConfirmModalContent = (
    { teacher, editedTeacher }
        : { teacher: Teacher, editedTeacher: Teacher }
) => {
    const API_PATH = useApiPath()

    const isDifferent = {
        display_name: editedTeacher?.display_name !== teacher?.display_name,
        family_name: editedTeacher?.family_name !== teacher?.family_name,
        given_name: editedTeacher?.given_name !== teacher?.given_name,
        lecture_hourly_pay: editedTeacher?.lecture_hourly_pay !== teacher?.lecture_hourly_pay,
        office_hourly_pay: editedTeacher?.office_hourly_pay !== teacher?.office_hourly_pay,
        trans_fee: editedTeacher?.trans_fee !== teacher?.trans_fee,
        fixed_salary: editedTeacher?.fixed_salary !== teacher?.fixed_salary,
    }

    const isRed = (is_different: boolean) => {
        if (is_different) {
            return "bg-red-200"
        } else {
            return ""
        }
    }

    const updateTeacher = async () => {
        if (!editedTeacher) return
        const api_url = new URL(`teachers/${teacher.id}`, API_PATH)
        const newTeacherBase: TeacherBase = {
            school_id: editedTeacher.school_id,
            display_name: editedTeacher.display_name,
            given_name: editedTeacher.given_name,
            family_name: editedTeacher.family_name,
            lecture_hourly_pay: editedTeacher.lecture_hourly_pay,
            office_hourly_pay: editedTeacher.office_hourly_pay,
            trans_fee: editedTeacher.trans_fee,
            fixed_salary: editedTeacher.fixed_salary,
            teacher_type: editedTeacher.teacher_type,
            sub: editedTeacher.sub,
        }
        showLoadingModal()
        fetch(api_url.href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTeacherBase)
        })
            .then(res => res.json())
            .then(data => {
                const newTeacher: Teacher = {
                    ...data
                }
                showModal({
                    title: '編集が完了しました',
                    children: <EditResultModalContent teacher={teacher} />,
                    canClose: false,
                });
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className="space-y-4">
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
                            <th>固定給</th>
                            <th>交通費</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key="after">
                            <th className="bg-base-200">変更後</th>
                            <th className={isRed(isDifferent.display_name)}>{editedTeacher?.display_name}</th>
                            <th className={isRed(isDifferent.family_name)}>{editedTeacher?.family_name}</th>
                            <th className={isRed(isDifferent.given_name)}>{editedTeacher?.given_name}</th>
                            <th className={isRed(isDifferent.lecture_hourly_pay)}>{editedTeacher?.lecture_hourly_pay}</th>
                            <th className={isRed(isDifferent.office_hourly_pay)}>{editedTeacher?.office_hourly_pay}</th>
                            <th className={isRed(isDifferent.fixed_salary)}>{editedTeacher?.fixed_salary}</th>
                            <th className={isRed(isDifferent.trans_fee)}>{editedTeacher?.trans_fee}</th>
                        </tr>
                    </tbody>
                </table>

                <table className="table table-fixed">
                    <tbody>
                        <tr key="before">
                            <th className="bg-base-200">変更前</th>
                            <th>{teacher?.display_name}</th>
                            <th>{teacher?.family_name}</th>
                            <th>{teacher?.given_name}</th>
                            <th>{teacher?.lecture_hourly_pay}</th>
                            <th>{teacher?.office_hourly_pay}</th>
                            <th>{teacher?.fixed_salary}</th>
                            <th>{teacher?.trans_fee}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-around">
                <div className="w-2/5">
                    <button onClick={updateTeacher} className="btn btn-primary btn-block">
                        確定
                    </button>
                </div>
                <div className="w-2/5">
                    <button onClick={closeModal} className="btn btn-block">
                        キャンセル
                    </button>
                </div>
            </div>
        </div>
    )
}
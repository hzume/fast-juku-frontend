"use client"
import { Teacher, TeacherBase } from "@/app/interfaces/teacher"
import { closeModal, showModal } from "@/components/Modal";
import { useUser } from "@/providers/UserContext";
import { useState } from "react";
import showLoadingModal from "@/components/LoadingModal";
import { useApiPath } from "@/providers/ApiPathContext";
import { useSWRConfig } from "swr";
import { useTeacherListUrl } from "@/app/myfunctions";

export const ShowCreateModalButton = () => {
    return (
        <button className="btn btn-primary btn-outline"
            onClick={
                () => showModal({
                    title: '講師情報を登録',
                    children: <CreateModalContent />
                })
            }>
            新規講師登録
        </button>
    )
}

const CreateModalContent = () => {
    const user = useUser();
    const API_PATH = useApiPath();
    const [formValues, setFormValues] = useState({
        display_name: "",
        family_name: "",
        given_name: "",
        lecture_hourly_pay: "",
        office_hourly_pay: "",
        trans_fee: "",
        fixed_salary: "",
    })
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        showLoadingModal()
        e.preventDefault();
        const teacher_base: TeacherBase = {
            school_id: user?.school_id!,
            display_name: formValues.display_name,
            family_name: formValues.family_name,
            given_name: formValues.given_name,
            lecture_hourly_pay: Number(formValues.lecture_hourly_pay),
            office_hourly_pay: Number(formValues.office_hourly_pay),
            trans_fee: Number(formValues.trans_fee),
            fixed_salary: Number(formValues.fixed_salary),
            teacher_type: "teacher",
        }
        const api_url = new URL(`/teachers`, API_PATH);
        try {
            const res = await fetch(api_url.href, {
                method: 'POST',
                body: JSON.stringify(teacher_base),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const teacher: Teacher = await res.json()
            showModal({
                title: '講師情報を登録',
                children: <CreateResultModalContent teacher={teacher} />
            });
        }
        catch (err) {
            console.log(err)
        }
    }

    const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const isFilled = (formValues.display_name != "") && (formValues.family_name != "") && (formValues.given_name != "")
        && (formValues.lecture_hourly_pay != "") && (formValues.office_hourly_pay != "") && (formValues.trans_fee != "")

    return (
        <form onSubmit={onSubmit} className="form-control w-full max-w-sm space-y-4">
            <div>
                <div className="label">
                    <div className="label-text flex gap-2">
                        <div>表示名</div>
                        <div className="tooltip text-rose-400" fd-tip="時間割で講師を表す名前です。   同名の講師は登録できません。">
                            (?)
                        </div>
                    </div>
                </div>
                <input onChange={onChangeText} name="display_name" type="text" className="input input-bordered w-full" />
            </div>
            <div className="md:flex gap-8">
                <div>
                    <div className="label">
                        <div className="label-text">苗字</div>
                    </div>
                    <input onChange={onChangeText} name="family_name" type="text" className="input input-bordered w-full" />
                </div>

                <div>
                    <div className="label">
                        <div className="label-text">名前</div>
                    </div>
                    <input onChange={onChangeText} name="given_name" type="text" className="input input-bordered w-full" />
                </div>
            </div>

            <div className="md:flex gap-8">
                <div>
                    <div className="label">
                        <div className="label-text">授業時給</div>
                    </div>
                    <input onChange={onChangeText} name="lecture_hourly_pay" type="number" min={0} className="input input-bordered w-full" />
                </div>

                <div>
                    <div className="label">
                        <div className="label-text">事務時給</div>
                    </div>
                    <input onChange={onChangeText} name="office_hourly_pay" type="number" min={0} className="input input-bordered w-full" />
                </div>
            </div>
            <div className="md:flex gap-8">
                <div>
                    <div className="label">
                        <div className="label-text">固定給</div>
                    </div>
                    <input onChange={onChangeText} name="fixed_salary" type="number" min={0} className="input input-bordered w-full" />
                </div>
                <div>
                    <div className="label">
                        <div className="label-text">交通費</div>
                    </div>
                    <input onChange={onChangeText} name="trans_fee" type="number" min={0} className="input input-bordered w-full" />
                </div>
            </div>
            <button type="submit" disabled={!isFilled} className="btn btn-primary">更新</button>
        </form>
    )
}

const CreateResultModalContent = ({ teacher }: { teacher: Teacher }) => {
    const user = useUser()
    const {mutate} = useSWRConfig()
    const api_url = useTeacherListUrl(user?.school_id)

    const onClick = () => {
        mutate(api_url.href)
        closeModal()
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
                            <th>固定給</th>
                            <th>交通費</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key="after">
                            <th className="bg-base-200">変更後</th>
                            <th>{teacher.display_name}</th>
                            <th>{teacher.family_name}</th>
                            <th>{teacher.given_name}</th>
                            <th>{teacher.lecture_hourly_pay}</th>
                            <th>{teacher.office_hourly_pay}</th>
                            <th>{teacher.fixed_salary}</th>
                            <th>{teacher.trans_fee}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button className="btn btn-primary" onClick={onClick}>閉じる</button>
        </div>
    )
}
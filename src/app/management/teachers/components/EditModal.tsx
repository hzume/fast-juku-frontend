import { Teacher } from "@/app/types/teacher"
import { showModal } from "@/components/Modal";
import { showEditConfirmModal } from "./EditConfirmModal";


export const showEditModal = (teacher: Teacher) => {
    showModal({
        title: '講師情報を編集',
        children: <EditModalContent teacher={teacher} />
    });
};

const EditModalContent = ({ teacher }: { teacher: Teacher }) => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form));
        const editedTeacher: Teacher = {
            id: teacher.id,
            display_name: data.display_name.toString() === "" ? teacher.display_name : data.display_name.toString(),
            family_name: data.family_name.toString() === "" ? teacher.family_name : data.family_name.toString(),
            given_name: data.given_name.toString() === "" ? teacher.given_name : data.given_name.toString(),
            lecture_hourly_pay: data.lecture_hourly_pay.toString() === "" ? teacher.lecture_hourly_pay : Number(data.lecture_hourly_pay),
            office_hourly_pay: data.office_hourly_pay.toString() === "" ? teacher.office_hourly_pay : Number(data.office_hourly_pay),
            trans_fee: data.trans_fee.toString() === "" ? teacher.trans_fee : Number(data.trans_fee),
            teacher_type: teacher.teacher_type,
            sub: teacher.sub,
            school_id: teacher.school_id,
        }
        showEditConfirmModal(teacher, editedTeacher);
    }

    return (
        <form onSubmit={onSubmit} className="form-control w-full max-w-sm space-y-4">
            <div>
                <div className="label">
                    <div className="label-text flex gap-2">
                        <div>表示名</div>
                        <div className="tooltip text-rose-400" data-tip="時間割で講師を表す名前です。   同名の講師は登録できません。">
                            (?)
                        </div>
                    </div>
                </div>
                <input name="display_name" type="text" placeholder={teacher?.display_name} className="input input-bordered w-full" />
            </div>
            <div className="md:flex gap-8">
                <div>
                    <div className="label">
                        <div className="label-text">苗字</div>
                    </div>
                    <input name="family_name" type="text" placeholder={teacher?.family_name} className="input input-bordered w-full" />
                </div>

                <div>
                    <div className="label">
                        <div className="label-text">名前</div>
                    </div>
                    <input name="given_name" type="text" placeholder={teacher?.given_name} className="input input-bordered w-full" />
                </div>
            </div>

            <div className="md:flex gap-8">
                <div>
                    <div className="label">
                        <div className="label-text">授業時給</div>
                    </div>
                    <input name="lecture_hourly_pay" type="number" min={0} placeholder={teacher?.lecture_hourly_pay.toString()} className="input input-bordered w-full" />
                </div>

                <div>
                    <div className="label">
                        <div className="label-text">事務時給</div>
                    </div>
                    <input name="office_hourly_pay" type="number" min={0} placeholder={teacher?.office_hourly_pay.toString()} className="input input-bordered w-full" />
                </div>

                <div>
                    <div className="label">
                        <div className="label-text">交通費</div>
                    </div>
                    <input name="trans_fee" type="number" min={0} placeholder={teacher?.trans_fee.toString()} className="input input-bordered w-full" />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">更新</button>
        </form>
    )
}
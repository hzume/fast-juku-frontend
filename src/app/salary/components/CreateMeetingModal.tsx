import { Meeting } from "@/app/interfaces/timeslot";
import { Teacher } from "@/app/interfaces/teacher";
import { closeModal, showModal } from "@/components/Modal"
import { useUser } from "@/providers/UserContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const showCreateMeetingModal = (
    setMeetings: Dispatch<SetStateAction<Meeting[]>>,
    formValues: { year: string, month: string, file: File | null },
    teacherList: Teacher[],
) => {
    showModal({
        title: 'ミーティング情報を追加',
        children: (
            <CreateMeetingModal setMeetings={setMeetings} formValues={formValues} teacherList={teacherList} />
        ),
    })
}

const CreateMeetingModal = ({
    setMeetings,
    formValues,
    teacherList,
}: {
    setMeetings: Dispatch<SetStateAction<Meeting[]>>,
    formValues: { year: string, month: string, file: File | null },
    teacherList: Teacher[],
}) => {
    const user = useUser();
    const teacherMap = new Map<string, Teacher>()
    teacherList.forEach((teacher) => {
        teacherMap.set(teacher.id, teacher)
    })

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = Object.fromEntries(new FormData(form));
        const attendTeacherList: Teacher[] = []
        for (const [key, value] of Object.entries(data)) {
            if (value === "on") {
                attendTeacherList.push(teacherMap.get(key)!)
            }
        }
        const meeting: Meeting = {
            school_id: user?.school_id!,
            year: Number(formValues.year),
            month: Number(formValues.month),
            day: Number(data.day),
            //@ts-ignore
            start_time: data.start_time, 
            //@ts-ignore
            end_time: data.end_time, 
            timeslot_type: "office_work",
            timeslot_number: 0,
            teachers: attendTeacherList,
        }
        setMeetings((prev) => [...prev, meeting])
        closeModal()
    }

    const TeacherCheckbox = ({ teacher, toggled }: { teacher: Teacher, toggled: boolean }) => {
        const [checked, setChecked] = useState(toggled)
        const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setChecked(event.target.checked)
        }
        useEffect(() => {
            setChecked(toggled)
        }, [toggled])
        return (
            <li>
                <label className="cursor-pointer label">
                    <input name={teacher.id} type="checkbox" className="checkbox" onChange={onChange} checked={checked} />
                    <span className="label-text">{teacher.display_name}</span>
                </label>
            </li>
        )
    }

    const TeacherCheckboxList = ({ teacherList }: { teacherList: Teacher[] }) => {
        const [toggled, setToggled] = useState(false)
        const onChange = () => {
            setToggled(!toggled)
        }

        return (
            <div className="dropdown dropdown-left dropdown-end flex gap-8">
                <div className="w-1/2">
                    <div className="label">
                        <label className="label-text">参加講師</label>
                    </div>
                    <div tabIndex={0} role="button" className="btn btn-block m-1">選択</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-base-200 rounded-box w-72 h-96 overflow-auto">
                        {teacherList.map((teacher) => {
                            return (
                                <TeacherCheckbox teacher={teacher} toggled={toggled} key={teacher.id} />
                            )
                        })}
                    </ul>
                </div>
                <div className="w-1/2">
                    <div className="label">
                        <label className="label-text">全解除/全選択</label>
                    </div>
                    <input type="checkbox" className="toggle toggle-lg m-3" checked={toggled} onChange={onChange} />
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={onSubmit} className="form-control max-w-xs w-full space-y-4">
            <div>
                <div className="label">
                    <label className="label-text">日</label>
                </div>
                <input name="day" type="number" min={1} max={31} placeholder="type day" className="input input-bordered w-full" />
            </div>
            <div className="flex gap-8">
                <div>
                    <div className="label">
                        <label className="label-text">開始時間</label>
                    </div>
                    <input name="start_time" type="time" min="06:00" max="24:00" defaultValue="12:00" className="input input-bordered w-full" />
                </div>
                <div>
                    <div className="label">
                        <label className="label-text">終了時間</label>
                    </div>
                    <input name="end_time" type="time" min="06:00" max="24:00" defaultValue="12:00" className="input input-bordered w-full" />
                </div>
            </div>
            <TeacherCheckboxList teacherList={teacherList} />
            <button className="btn btn-primary">
                送信
            </button>
        </form>
    )
}
"use client"
import { Meeting } from "@/app/types/timeslot";
import { Dispatch, SetStateAction, useState } from "react";
import { showCreateMeetingModal } from "./CreateMeetingModal";
import { useUser } from "@/providers/UserContext";
import { useTeacherList, processXLSX } from "@/app/myfunctions";
import { C } from "@/app/const";
import { Teacher } from "@/app/types/teacher";
import { TimeTableData } from "@/app/types/timetable";
import { useSession } from "next-auth/react";
import { time } from "console";
import { useApiPath } from "@/providers/ApiPathContext";
import { read } from "xlsx";
import officeCrypto from "officecrypto-tool";
import { useRouter } from "next/navigation";

function toArrayBuffer(buffer: Buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

export const Form = ({
    teacherList,
    meetings,
    setMeetings,
}: {
    teacherList: Teacher[],
    meetings: Meeting[],
    setMeetings: Dispatch<SetStateAction<Meeting[]>>,
}
) => {
    const [formValues, setFormValues] = useState<{ year: string, month: string, file: File | null , password:string}>({ year: '', month: '', file: null , password:'0'});
    const user = useUser();
    const API_PATH = useApiPath();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    if (!user) return <span className="loading loading-lg"></span>

    const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        setFormValues({ ...formValues, [name]: files![0] });
    }

    const isFilled = (formValues.file !== null) && (formValues.year !== '')
    const canCreateMeeting = (formValues.year !== '') && (formValues.month !== '')

    const onClick = () => {
        showCreateMeetingModal(setMeetings, formValues, teacherList);
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const file = await formValues.file!.arrayBuffer()
        const fileBuffer = Buffer.from(file)
        const decryptedFile = await officeCrypto.decrypt(fileBuffer, {password:formValues.password})
        const workbook = read(decryptedFile)
        const processed_data = processXLSX(workbook, Number(formValues.year), Number(formValues.month));
        const query = new URLSearchParams({ year: formValues.year, month: formValues.month })
        const api_url = new URL(`salary/bulk/${user.school_id}/?${query}`, API_PATH)
        const timeTableData: TimeTableData = {
            content: processed_data,
            meetings: meetings,
        }
        try {
            setIsLoading(true)
            const res = await fetch(api_url.href, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(timeTableData),
            });
            router.push(`/salary/view/?${query}`)
            alert('送信に成功しました')
        } catch (error) {
            console.error(error);
            console.log(processed_data)
        }
    };

    if (isLoading) return <span className="loading loading-lg"></span>

    return (
        <form className="form-control w-1/2 max-w-full space-y-4" onSubmit={onSubmit}>
            <div className='md:flex gap-4'>
                <div className='w-11/12'>
                    <div className="label">
                        <div className="label-text">年</div>
                    </div>
                    <input type="number" min={0} max={3000} name='year' onChange={onChangeText} placeholder="type year" className="input w-full input-bordered" />
                </div>
                <div className='w-11/12'>
                    <div className="label">
                        <div className="label-text">月</div>
                    </div>
                    <input type="number" min={1} max={12} name='month' onChange={onChangeText} placeholder="type month" className="input w-full input-bordered " />
                </div>
            </div>
            <button type='button' disabled={!canCreateMeeting} className='btn btn-outline' onClick={onClick}>
                ミーティング情報を追加
            </button>
            <div>
                <div className="label">
                    <div className="label-text">時間割表</div>
                </div>
                <input type="file" name='file' onChange={onChangeFile} className="file-input file-input-bordered w-full" />
            </div>
            <div>
                <div className="label">
                    <div className="label-text">パスワード</div>
                </div>
                <input type="password" name='password' onChange={onChangeText} className="file-input file-input-bordered w-full" />
            </div>
            <button type="submit" disabled={!isFilled} className="btn btn-primary">送信</button>
        </form>
    )
}
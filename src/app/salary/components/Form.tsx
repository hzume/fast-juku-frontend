"use client"
import { Meeting } from "@/app/types/meeting";
import { Dispatch, SetStateAction, useState } from "react";
import { showCreateMeetingModal } from "./CreateMeetingModal";
import { useUser } from "@/providers/UserContext";
import { read } from "xlsx";
import { useTeacherList, processXLSX } from "@/app/myfunctions";
import { C } from "@/app/const";

export const Form = ({
    meetings,
    setMeetings,
}: {
    meetings: Meeting[],
    setMeetings: Dispatch<SetStateAction<Meeting[]>>,
}
) => {
    const [formValues, setFormValues] = useState<{ year: string, month: string, file: File | null }>({ year: '', month: '', file: null });
    const user = useUser();
    if (!user) return <span className="loading loading-lg"></span>

    const { data: teacherList, error, isLoading } = useTeacherList(user.school_id)
    if (error) return <div>{error}</div>;
    if (isLoading) return <span className="loading loading-lg"></span>

    
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

		const fd = new FormData();
		const query = new URLSearchParams({
			school_id: user.school_id,
			year: formValues.year,
			month: formValues.month,
		});
		const file = await formValues.file!.arrayBuffer()
		const workbook = read(file)
		const processed_data = processXLSX(workbook, Number(formValues.year), Number(formValues.month));
		const api_url = new URL(`timeslots/?${query}`, C.API_PATH)
		try {
			const res = await fetch(api_url.href, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ content: processed_data }),
			});
			const json = await res.json();
			console.log(json);
		} catch (error) {
			console.error(error);
			console.log(processed_data)
		}
	};
    

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
            <button type="submit" disabled={!isFilled} className="btn btn-primary">送信</button>
        </form>
    )
}
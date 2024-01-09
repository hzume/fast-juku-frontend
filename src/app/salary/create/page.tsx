"use client"

import React, { useState } from 'react';
import { read } from "xlsx";
import { processXLSX, useTeacherList } from '@/app/myfunctions';
import { C } from '@/app/const';
import { useUser } from '@/providers/UserContext';
import { Meeting } from '@/app/types/meeting';
import { Form } from '../components/Form';
import { MeetingList } from '../components/MeetingList';

export default function Page() {
	const [meetings, setMeetings] = useState<Meeting[]>([])
	const user = useUser();
    const { data: teacherList, error, isLoading } = useTeacherList(user?.school_id)
	
	if (!user) return <span className="loading loading-lg"></span>
    if (error) return <div>{error}</div>;
    if (isLoading) return <span className="loading loading-lg"></span>

	return (
		<div className='md:flex gap-4'>
			<Form meetings={meetings} setMeetings={setMeetings} teacherList={teacherList}/>
			<MeetingList meetings={meetings} setMeetings={setMeetings}/>
		</div>
	);
}
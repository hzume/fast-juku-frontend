"use client"

import React, { useState } from 'react';
import { useTeacherList } from '@/app/myfunctions';
import { useUser } from '@/providers/UserContext';
import { Meeting } from '@/app/interfaces/timeslot';
import { Form } from '../components/Form';
import { MeetingList } from '../components/MeetingList';
import { LoadingIcon } from '@/components/LoadingIcon';

export default function Page() {
	const [meetings, setMeetings] = useState<Meeting[]>([])
	const user = useUser();
    const { data: teacherList, error, isLoading } = useTeacherList(user?.school_id)
	
	if (!user) return <LoadingIcon/>
    if (error) return <div>{error}</div>;
    if (isLoading) return <LoadingIcon/>

	return (
		<div className='md:flex gap-4'>
			<Form meetings={meetings} setMeetings={setMeetings} teacherList={teacherList}/>
			<MeetingList meetings={meetings} setMeetings={setMeetings}/>
		</div>
	);
}
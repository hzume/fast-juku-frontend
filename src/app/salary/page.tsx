"use client"

import React, { useState } from 'react';
import { read } from "xlsx";
import { processXLSX } from '@/app/myfunctions';
import { C } from '@/app/const';
import { useUser } from '@/providers/UserContext';
import { Meeting } from '@/app/types/meeting';
import { Form } from './components/Form';
import { MeetingList } from './components/MeetingList';

export default function Page() {
	const [meetings, setMeetings] = useState<Meeting[]>([])

	return (
		<div className='md:flex gap-4'>
			<Form meetings={meetings} setMeetings={setMeetings} />
			<MeetingList meetings={meetings} setMeetings={setMeetings}/>
		</div>
	);
}

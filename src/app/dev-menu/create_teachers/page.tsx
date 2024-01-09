"use client"

import React, { use, useState } from 'react';
import { C } from '@/app/const';
import csv  from 'csvtojson';
import { Readable } from 'stream';
import { useApiPath } from '@/providers/ApiPathContext';

export default function Page() {
    const [formValues, setFormValues] = useState<{school_id: string, file: File | null}>({ school_id: '', file: null});
    const API_PATH = useApiPath();

    const onChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        setFormValues({ ...formValues, [name]: files![0] });
    }

    const isFilled = (formValues.school_id !== '') && (formValues.file !== null);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('file', formValues.file!);
        
        const query = new URLSearchParams({
            school_id: formValues.school_id,
        });
        const api_url = new URL(`teachers/bulk/${formValues.school_id}`, API_PATH)
        try {
            const res = await fetch(api_url.href, {
                    method: 'POST',
                    body: fd,
                });
            const json = await res.json();
            console.log(json);
            if (res.ok) {
                alert('success');
            }
        } catch (error) {
            console.error(error);
            console.log(formValues)
        }
    }

    return ( 
        <div className='w-full max-w-full'>
            <form className="form-control" onSubmit={onSubmit}>
                <input type="file" name='file' onChange={onChangeFile} className="file-input file-input-bordered w-1/2 max-w-full" />
                <input type="text" name='school_id' onChange={onChangeId} placeholder="type school_id" className="input w-full max-w-xs"/>
                <button type="submit" disabled={!isFilled} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
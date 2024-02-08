"use client";
import { C } from "@/app/const";
import { useApiPath } from "@/providers/ApiPathContext";
import React, { use } from 'react';

export default function Page() {
    const API_PATH = useApiPath();
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data_form = Object.fromEntries(new FormData(form));
        const api_url = new URL(`metas`, API_PATH)
        try {
            const res = await fetch(api_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data_form),
                });
            const json = await res.json();
            console.log(json);
            if (res.ok) {
                alert(json.school_id);
            }
        } catch (error) {
            console.error(error);
            console.log(data_form)
        }
    }
    return (
        <form className="form-control" onSubmit={onSubmit}>
            <input type="text" name='school_name' placeholder="type school_name" className="input w-full max-w-xs" />  
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
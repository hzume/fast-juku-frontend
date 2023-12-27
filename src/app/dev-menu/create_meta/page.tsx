"use client";
import React from "react";

export default function Page() {
    const [formValues, setFormValues] = React.useState<{school_name: string}>({ school_name: ""});

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('school_name', formValues.school_name);
        try {
            const res = await fetch(`http://localhost:3000/metas`, {
                    method: 'POST',
                    body: fd,
                });
            const json = await res.json();
            console.log(json);
        } catch (error) {
            console.error(error);
            console.log(formValues)
        }
    }
    return (
        <form className="form-control" onSubmit={onSubmit}>
            <input type="text" name='school_name' onChange={onChangeName} placeholder="type school_name" className="input w-full max-w-xs"/>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
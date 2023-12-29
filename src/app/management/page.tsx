"use client"
import { use, useEffect, useState } from "react"
import { useTeacherList } from "../myfunctions"
import { useUser } from "@/providers/UserContext";
import { Teacher } from "../types/teacher";
import { C } from "../const";
import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
import { useApiPath } from "@/providers/ApiPathContext";

export default function Page() {
    const user = useUser();
    const [teacherList, setTeacherList] = useState<Teacher[]>([])
    const API_PATH = useApiPath();

    const onClick = (() => {
        const query = new URLSearchParams({ school_id: user?.school_id ?? '' });
        const api_url = new URL(`teachers/bulk/${user?.school_id}`, API_PATH)
        fetch(api_url.href, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                setTeacherList(data)
                console.log(data)
            })
    })
    return (
        <div>
            <button className="btn" onClick={onClick}>click</button>
        </div>
    )
}

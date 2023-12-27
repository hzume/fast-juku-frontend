"use client"
import { C } from "@/app/const";
import { Teacher } from "@/app/types/teacher";
import { useUser } from "@/providers/UserContext";
import { useEffect, useState } from "react";
import { TeacherTable } from "./components/TeacherTable";
import useSWR from "swr";
import { getTeacherList } from "@/app/myfunctions";

export default function Page() {
    // const [teacherList, setTeacherList] = useState<Teacher[]>([]);
    const user = useUser();
    if (!user) return <span className="loading loading-lg"></span>
    
    const { data: teacherList, error, isLoading } = getTeacherList(user.school_id)

    if (error) return <div>{error}</div>;
    
    return (
        <div>
            <TeacherTable teacherList={teacherList} isLoading={isLoading} />
        </div>
    )
}

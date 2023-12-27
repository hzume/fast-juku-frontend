"use client"
import { C } from "@/app/const";
import { Teacher } from "@/app/types/teacher";
import { useUser } from "@/providers/UserContext";
import { useEffect, useState } from "react";
import { TeacherTable } from "./components/TeacherTable";
import useSWR from "swr";
import { useTeacherList } from "@/app/myfunctions";

export default function Page() {
    const user = useUser();
    const { data: teacherList, error, isLoading } = useTeacherList(user?.school_id)

    if (!user) return <span className="loading loading-lg"></span>
    if (isLoading) return <span className="loading loading-lg"></span>
    if (error) return <div>{error}</div>;
    
    return (
        <div>
            <TeacherTable teacherList={teacherList} isLoading={isLoading} />
        </div>
    )
}

"use client"
import { Teacher } from "@/app/types/teacher";
import { useUser } from "@/providers/UserContext";
import { useTeacherList } from "@/app/myfunctions";
import { ShowCreateModalButton } from "./components/CreateModal";
import { ShowDeleteModalButton } from "./components/DeleteModal";
import { ShowEditModalButton } from "./components/EditModal";
import { LoadingIcon } from "@/components/LoadingIcon";


const TeacherRow = ({ teacher }: { teacher: Teacher }) => {
    const name = `${teacher.family_name} ${teacher.given_name}`;
    return (
        <tr className="hover">
            <td>{name}</td>
            <td>{teacher.lecture_hourly_pay}</td>
            <td>{teacher.office_hourly_pay}</td>
            <td>{teacher.trans_fee}</td>
            <td><ShowEditModalButton teacher={teacher} /></td>
            <td><ShowDeleteModalButton teacher={teacher} /></td>
        </tr>
    )
}

export default function Page() {
    const user = useUser();
    const { data: teacherList, error, isLoading, mutate }:
        { data: Teacher[], error: any, isLoading: any, mutate: any } = useTeacherList(user?.school_id)

    if (!user) return <LoadingIcon/>
    if (isLoading) return <LoadingIcon/>
    if (error) return <div>{error}</div>;

    return (
        <div>
            <ShowCreateModalButton />
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr key="header">
                            <th>名前</th>
                            <th>授業時給</th>
                            <th>事務時給</th>
                            <th>交通費</th>
                        </tr>
                    </thead>
                    {!isLoading &&
                        <tbody>
                            {teacherList.map(
                                teacher => <TeacherRow teacher={teacher} key={teacher.id} />
                            )}
                        </tbody>
                    }
                </table>
            </div>
            {isLoading &&
                <div className="flex place-content-center mt-20">
                    <LoadingIcon />
                </div>
            }
        </div>
    )
}

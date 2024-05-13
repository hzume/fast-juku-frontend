"use client"
import { Meeting } from "@/app/interfaces/timeslot"
import { useTeacherList } from "@/app/myfunctions"
import { useUser } from "@/providers/UserContext"

export const MeetingList = ({
    meetings,
    setMeetings,
}: {
    meetings: Meeting[],
    setMeetings: React.Dispatch<React.SetStateAction<Meeting[]>>
}) => {
    const user = useUser()
    const { data: teacherList, error, isLoading } = useTeacherList(user?.school_id)
    const getDisplayName = (teacher_id: string) => {
        const teacher = teacherList.find((teacher) => teacher.id === teacher_id)
        return teacher?.display_name
    }
    const MeetingTable = ({ meeting }: { meeting: Meeting }) => {
        const onClick = () => {
            setMeetings((prev) => prev.filter((m) => m !== meeting))
        }
        const attendTeacherNames = meeting.teacher_ids.map((id) => (getDisplayName(id))).join(', ')
        return (
            <div className="rounded-lg border-black p-4 pt-0 bg-white shadow-xl">
                <div className="flex justify-between">
                    <div className="font-bold pt-4">
                        {meeting.year}年 {meeting.month}月 {meeting.day}日  {meeting.start_time}~{meeting.end_time}
                    </div>
                    <div className="pt-2">
                    <button onClick={onClick} className="btn btn-outline btn-error btn-sm">
                        削除
                    </button>
                    </div>                    
                </div>
                <div className="p-2 text-sm">
                    {attendTeacherNames}
                </div>
            </div>
        )
    }
    if (meetings.length === 0) return <div></div>

    return (
        <div className="w-1/2 space-y-4 m-4 p-4 h-full bg-slate-200 rounded-lg ">
            <div className="space-y-4">
                {meetings.map((meeting) => {
                    return (
                        <MeetingTable meeting={meeting} key={`${meeting.year}-${meeting.month}-${meeting.day}-${meeting.start_time}-${meeting.end_time}`} />
                    )
                })}
            </div>
        </div>
    )
}
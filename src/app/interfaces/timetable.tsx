import { Meeting } from "./timeslot";

export interface CreateAttendanceReq {
    content: unknown[],
    meetings: Meeting[],
}


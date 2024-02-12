import { Meeting } from "./timeslot";

export interface TimeTableData {
    content: unknown[],
    meetings: Meeting[],
}
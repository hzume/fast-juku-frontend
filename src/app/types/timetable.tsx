import { Meeting } from "./meeting";

export type TimeTableData = {
    content: unknown[],
    year: number,
    month?: number,
    meetings: Meeting[],
}
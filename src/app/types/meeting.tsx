import { Teacher } from "./teacher";

export type Meeting = {
    school_id: string,
    year: number,
    month: number,
    day: number,
    start_time: string,
    end_time: string,
    timeslot_type: string,
    timeslot_number: number,

    teachers: Teacher[],
}
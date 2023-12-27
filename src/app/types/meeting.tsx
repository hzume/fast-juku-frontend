import { Teacher } from "./teacher";

export type Meeting = {
    year: number,
    month: number,
    day: number,
    start_time: string,
    end_time: string,
    teachers: Teacher[],
}
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

export type Timeslot = {
    day: number,
    start_time: string,
    end_time: string,
    timeslot_type: string,
    timeslot_number: number,
}

export type MonthlyAttendance = {
    year: number,
    month: number,
    teacher: Teacher,

    daily_lecture_amount: number[],
    daily_officework_amount: number[],
    daily_latenight_amount: number[],
    daily_over_eight_hour_amount: number[],
    daily_attendance: boolean[],

    timeslot_list: Timeslot[],
    monthly_gross_salary: number,
    monthly_tax_amount: number,
    monthly_trans_fee: number,
    extra_payment: number,
}
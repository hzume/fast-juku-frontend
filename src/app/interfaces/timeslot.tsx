import { Teacher } from "./teacher";

export interface Meeting {
    year: number,
    month: number,
    day: number,
    start_time: string,
    end_time: string,
    teacher_ids: string[],
}

export interface Timeslot {
    day: number,
    start_time: Date,
    end_time: Date,
    timeslot_number: number,
    timeslot_type: string,
}

export interface BaseAttendance {
    teacher: Teacher,
    
    monthly_gross_salary: number,
    monthly_tax_amount: number,
    monthly_trans_fee: number,
    extra_payment: number,
}

export interface MonthlyAttendance extends BaseAttendance {
    year: number,
    month: number,

    daily_lecture_amount: number[],
    daily_officework_amount: number[],
    daily_latenight_amount: number[],
    daily_over_eight_hour_amount: number[],
    daily_attendance: boolean[],

    timeslot_list: Timeslot[],
    remark: string,
}

export interface TimeslotJS {
    year: number,
    month: number,
    day: number,
    timeslot_number: number,
    timeslot_type: string,
}

export interface UpdateAttendanceReq {
    timeslot_js_list: TimeslotJS[],
    extra_payment: number,
    remark: string,
    teacher: Teacher,
}
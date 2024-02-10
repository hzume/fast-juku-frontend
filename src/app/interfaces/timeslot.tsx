import { Teacher } from "./teacher";

export interface Meeting {
    school_id: string,
    year: number,
    month: number,
    day: number,
    start_time: Date,
    end_time: Date,
    timeslot_type: string,
    timeslot_number: number,

    teachers: Teacher[],
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

export interface UpdateAttendanceReq {
    timeslot_list: Timeslot[],
    extra_payment: number,
    remark: string,
    teacher: Teacher,
}
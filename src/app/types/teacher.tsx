export type Teacher = {
    id: string,
    school_id: string,
    display_name: string,
    given_name: string,
    family_name: string,
    lecture_hourly_pay: number,
    office_hourly_pay: number,
    trans_fee: number,
    teacher_type: string,

    year?: number,
    month?: number,
    sub?: string,
}

export type TeacherBase = {
    school_id: string,
    display_name: string,
    given_name: string,
    family_name: string,
    lecture_hourly_pay: number,
    office_hourly_pay: number,
    trans_fee: number,
    teacher_type: string,
    
    sub?: string,
}

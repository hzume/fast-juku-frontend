export interface TeacherBase {
    school_id: string,
    display_name: string,
    given_name: string,
    family_name: string,
    lecture_hourly_pay: number,
    office_hourly_pay: number,
    trans_fee: number,
    fixed_salary: number,
    teacher_type: string,
    
    sub?: string,
}


export interface Teacher extends TeacherBase {
    id: string,
}


/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Teacher } from './Teacher';
import {
    TeacherFromJSON,
    TeacherFromJSONTyped,
    TeacherToJSON,
} from './Teacher';
import type { Timeslot } from './Timeslot';
import {
    TimeslotFromJSON,
    TimeslotFromJSONTyped,
    TimeslotToJSON,
} from './Timeslot';

/**
 * 
 * @export
 * @interface MonthlyAttendance
 */
export interface MonthlyAttendance {
    /**
     * 
     * @type {number}
     * @memberof MonthlyAttendance
     */
    year: number;
    /**
     * 
     * @type {number}
     * @memberof MonthlyAttendance
     */
    month: number;
    /**
     * 
     * @type {Teacher}
     * @memberof MonthlyAttendance
     */
    teacher: Teacher;
    /**
     * 
     * @type {Array<Timeslot>}
     * @memberof MonthlyAttendance
     */
    timeslotList: Array<Timeslot>;
    /**
     * 
     * @type {number}
     * @memberof MonthlyAttendance
     */
    extraPayment?: number;
    /**
     * 
     * @type {string}
     * @memberof MonthlyAttendance
     */
    remark?: string;
    /**
     * 
     * @type {Array<number>}
     * @memberof MonthlyAttendance
     */
    dailyLectureAmount?: Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof MonthlyAttendance
     */
    dailyOfficeworkAmount?: Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof MonthlyAttendance
     */
    dailyLatenightAmount?: Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof MonthlyAttendance
     */
    dailyOverEightHourAmount?: Array<number>;
    /**
     * 
     * @type {Array<boolean>}
     * @memberof MonthlyAttendance
     */
    dailyAttendance?: Array<boolean>;
    /**
     * 
     * @type {number}
     * @memberof MonthlyAttendance
     */
    monthlyGrossSalary?: number;
    /**
     * 
     * @type {number}
     * @memberof MonthlyAttendance
     */
    monthlyTaxAmount?: number;
    /**
     * 
     * @type {number}
     * @memberof MonthlyAttendance
     */
    monthlyTransFee?: number;
}

/**
 * Check if a given object implements the MonthlyAttendance interface.
 */
export function instanceOfMonthlyAttendance(value: object): boolean {
    if (!('year' in value)) return false;
    if (!('month' in value)) return false;
    if (!('teacher' in value)) return false;
    if (!('timeslotList' in value)) return false;
    return true;
}

export function MonthlyAttendanceFromJSON(json: any): MonthlyAttendance {
    return MonthlyAttendanceFromJSONTyped(json, false);
}

export function MonthlyAttendanceFromJSONTyped(json: any, ignoreDiscriminator: boolean): MonthlyAttendance {
    if (json == null) {
        return json;
    }
    return {
        
        'year': json['year'],
        'month': json['month'],
        'teacher': TeacherFromJSON(json['teacher']),
        'timeslotList': ((json['timeslot_list'] as Array<any>).map(TimeslotFromJSON)),
        'extraPayment': json['extra_payment'] == null ? undefined : json['extra_payment'],
        'remark': json['remark'] == null ? undefined : json['remark'],
        'dailyLectureAmount': json['daily_lecture_amount'] == null ? undefined : json['daily_lecture_amount'],
        'dailyOfficeworkAmount': json['daily_officework_amount'] == null ? undefined : json['daily_officework_amount'],
        'dailyLatenightAmount': json['daily_latenight_amount'] == null ? undefined : json['daily_latenight_amount'],
        'dailyOverEightHourAmount': json['daily_over_eight_hour_amount'] == null ? undefined : json['daily_over_eight_hour_amount'],
        'dailyAttendance': json['daily_attendance'] == null ? undefined : json['daily_attendance'],
        'monthlyGrossSalary': json['monthly_gross_salary'] == null ? undefined : json['monthly_gross_salary'],
        'monthlyTaxAmount': json['monthly_tax_amount'] == null ? undefined : json['monthly_tax_amount'],
        'monthlyTransFee': json['monthly_trans_fee'] == null ? undefined : json['monthly_trans_fee'],
    };
}

export function MonthlyAttendanceToJSON(value?: MonthlyAttendance | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'year': value['year'],
        'month': value['month'],
        'teacher': TeacherToJSON(value['teacher']),
        'timeslot_list': ((value['timeslotList'] as Array<any>).map(TimeslotToJSON)),
        'extra_payment': value['extraPayment'],
        'remark': value['remark'],
        'daily_lecture_amount': value['dailyLectureAmount'],
        'daily_officework_amount': value['dailyOfficeworkAmount'],
        'daily_latenight_amount': value['dailyLatenightAmount'],
        'daily_over_eight_hour_amount': value['dailyOverEightHourAmount'],
        'daily_attendance': value['dailyAttendance'],
        'monthly_gross_salary': value['monthlyGrossSalary'],
        'monthly_tax_amount': value['monthlyTaxAmount'],
        'monthly_trans_fee': value['monthlyTransFee'],
    };
}

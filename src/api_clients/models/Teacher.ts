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
/**
 * 
 * @export
 * @interface Teacher
 */
export interface Teacher {
    /**
     * 
     * @type {string}
     * @memberof Teacher
     */
    displayName: string;
    /**
     * 
     * @type {string}
     * @memberof Teacher
     */
    givenName: string;
    /**
     * 
     * @type {string}
     * @memberof Teacher
     */
    familyName: string;
    /**
     * 
     * @type {string}
     * @memberof Teacher
     */
    schoolId: string;
    /**
     * 
     * @type {number}
     * @memberof Teacher
     */
    lectureHourlyPay: number;
    /**
     * 
     * @type {number}
     * @memberof Teacher
     */
    officeHourlyPay: number;
    /**
     * 
     * @type {number}
     * @memberof Teacher
     */
    transFee?: number;
    /**
     * 
     * @type {number}
     * @memberof Teacher
     */
    fixedSalary?: number;
    /**
     * 
     * @type {string}
     * @memberof Teacher
     */
    teacherType: TeacherTeacherTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof Teacher
     */
    sub?: string;
    /**
     * 
     * @type {string}
     * @memberof Teacher
     */
    id: string;
}


/**
 * @export
 */
export const TeacherTeacherTypeEnum = {
    Teacher: 'teacher',
    Admin: 'admin'
} as const;
export type TeacherTeacherTypeEnum = typeof TeacherTeacherTypeEnum[keyof typeof TeacherTeacherTypeEnum];


/**
 * Check if a given object implements the Teacher interface.
 */
export function instanceOfTeacher(value: object): boolean {
    if (!('displayName' in value)) return false;
    if (!('givenName' in value)) return false;
    if (!('familyName' in value)) return false;
    if (!('schoolId' in value)) return false;
    if (!('lectureHourlyPay' in value)) return false;
    if (!('officeHourlyPay' in value)) return false;
    if (!('teacherType' in value)) return false;
    if (!('id' in value)) return false;
    return true;
}

export function TeacherFromJSON(json: any): Teacher {
    return TeacherFromJSONTyped(json, false);
}

export function TeacherFromJSONTyped(json: any, ignoreDiscriminator: boolean): Teacher {
    if (json == null) {
        return json;
    }
    return {
        
        'displayName': json['display_name'],
        'givenName': json['given_name'],
        'familyName': json['family_name'],
        'schoolId': json['school_id'],
        'lectureHourlyPay': json['lecture_hourly_pay'],
        'officeHourlyPay': json['office_hourly_pay'],
        'transFee': json['trans_fee'] == null ? undefined : json['trans_fee'],
        'fixedSalary': json['fixed_salary'] == null ? undefined : json['fixed_salary'],
        'teacherType': json['teacher_type'],
        'sub': json['sub'] == null ? undefined : json['sub'],
        'id': json['id'],
    };
}

export function TeacherToJSON(value?: Teacher | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'display_name': value['displayName'],
        'given_name': value['givenName'],
        'family_name': value['familyName'],
        'school_id': value['schoolId'],
        'lecture_hourly_pay': value['lectureHourlyPay'],
        'office_hourly_pay': value['officeHourlyPay'],
        'trans_fee': value['transFee'],
        'fixed_salary': value['fixedSalary'],
        'teacher_type': value['teacherType'],
        'sub': value['sub'],
        'id': value['id'],
    };
}


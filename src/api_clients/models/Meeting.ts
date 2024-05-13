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
 * @interface Meeting
 */
export interface Meeting {
    /**
     * 
     * @type {number}
     * @memberof Meeting
     */
    year: number;
    /**
     * 
     * @type {number}
     * @memberof Meeting
     */
    month: number;
    /**
     * 
     * @type {number}
     * @memberof Meeting
     */
    day: number;
    /**
     * 
     * @type {string}
     * @memberof Meeting
     */
    startTime: string;
    /**
     * 
     * @type {string}
     * @memberof Meeting
     */
    endTime: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Meeting
     */
    teacherIds: Array<string>;
}

/**
 * Check if a given object implements the Meeting interface.
 */
export function instanceOfMeeting(value: object): boolean {
    if (!('year' in value)) return false;
    if (!('month' in value)) return false;
    if (!('day' in value)) return false;
    if (!('startTime' in value)) return false;
    if (!('endTime' in value)) return false;
    if (!('teacherIds' in value)) return false;
    return true;
}

export function MeetingFromJSON(json: any): Meeting {
    return MeetingFromJSONTyped(json, false);
}

export function MeetingFromJSONTyped(json: any, ignoreDiscriminator: boolean): Meeting {
    if (json == null) {
        return json;
    }
    return {
        
        'year': json['year'],
        'month': json['month'],
        'day': json['day'],
        'startTime': json['start_time'],
        'endTime': json['end_time'],
        'teacherIds': json['teacher_ids'],
    };
}

export function MeetingToJSON(value?: Meeting | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'year': value['year'],
        'month': value['month'],
        'day': value['day'],
        'start_time': value['startTime'],
        'end_time': value['endTime'],
        'teacher_ids': value['teacherIds'],
    };
}


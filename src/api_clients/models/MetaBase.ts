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
 * @interface MetaBase
 */
export interface MetaBase {
    /**
     * 
     * @type {string}
     * @memberof MetaBase
     */
    schoolName: string;
}

/**
 * Check if a given object implements the MetaBase interface.
 */
export function instanceOfMetaBase(value: object): boolean {
    if (!('schoolName' in value)) return false;
    return true;
}

export function MetaBaseFromJSON(json: any): MetaBase {
    return MetaBaseFromJSONTyped(json, false);
}

export function MetaBaseFromJSONTyped(json: any, ignoreDiscriminator: boolean): MetaBase {
    if (json == null) {
        return json;
    }
    return {
        
        'schoolName': json['school_name'],
    };
}

export function MetaBaseToJSON(value?: MetaBase | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'school_name': value['schoolName'],
    };
}


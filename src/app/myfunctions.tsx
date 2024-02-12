import Xlsx from "xlsx"
import { utils } from "xlsx"
import { C } from "@/app/const"
import { User } from "@/app/interfaces/user"
import useSWR, { useSWRConfig } from "swr"
import { use } from "react"
import { useApiPath } from "@/providers/ApiPathContext"
import { Teacher } from "./interfaces/teacher"
import { MonthlyAttendance } from "./interfaces/timeslot"

export function processXLSX(wb: Xlsx.WorkBook, year: number, month: number) {
    const xlsx_data = []
    for (let sheet_name of wb.SheetNames) {
        if (sheet_name.includes(`${month}月`)) {
            const ws = wb.Sheets[sheet_name]
            const raw_data = utils.sheet_to_json(ws, { header: 1, defval: null })
            for (let i = 0; i < C.MAX_BLOCKS; i++) {
                const block_row = raw_data.slice(i * C.BLOCK_SIZE, (i + 1) * C.BLOCK_SIZE)
                if (block_row.length === C.BLOCK_SIZE) {
                    xlsx_data.push(block_row)
                }
            }
        }
    }
    return xlsx_data
}

export function getPreviousYearMonth(): { year: number, month: number } {
    const date = new Date()
    let year: number
	let month: number
	if (date.getDate()>15) {
		year = date.getFullYear()
		month = date.getMonth() + 1
	}
	else {
		if (date.getMonth()==0) {
			year = date.getFullYear() - 1
			month = 12
		}
		else {
			year = date.getFullYear()
			month = date.getMonth()		
		}
	}
    return { year, month }
}


export function useTeacherListUrl(school_id?: string): URL {
    const API_PATH = useApiPath()
    const api_url = new URL(`teachers/bulk/${school_id}`, API_PATH)
    return api_url
}
    

export function useTeacherList(school_id?: string) 
    : { data: Teacher[], error: any, isLoading: boolean, mutate: any } {
    const api_url = useTeacherListUrl(school_id)
    const fetcher = async (url: string) => {
        const res = await fetch(url)
        let data = await res.json()
        data = data.sort((a: Teacher, b: Teacher) => a.display_name.localeCompare(b.display_name))
        return data
    }
    
    const { data, error, isLoading, mutate }:
        { data: Teacher[], error: any, isLoading: boolean, mutate: any} = useSWR(api_url.href, fetcher)

    return { data, error, isLoading, mutate }
}


export function useMonthlyAttendanceListUrl(school_id: string, year: string | null, month: string | null) {
    const API_PATH = useApiPath()
    const query = new URLSearchParams({ year: year!, month: month! })
    const api_url = new URL(`salary/bulk/${school_id}/?${query}`, API_PATH)
    return api_url
}

export function useMonthlyAttendanceList(school_id: string, year: string | null, month: string | null) {
    const api_url = useMonthlyAttendanceListUrl(school_id, year, month)
    const fetcher = async (url: string) => {
        if (!year || !month) {
            return []
        }
        const res = await fetch(url)
        let data = await res.json()
        data = data.sort((a: MonthlyAttendance, b: MonthlyAttendance) => a.teacher.display_name.localeCompare(b.teacher.display_name))
        return data
    }
    const { data, error, isLoading, mutate }: 
        {data: MonthlyAttendance[], error:any, isLoading: boolean, mutate: any} = useSWR(api_url.href, fetcher)
    return { data, error, isLoading, mutate }
}
    
export function useYearlyAttendanceList(
    school_id: string, 
    start_year: string | null, 
    start_month: string | null,
    end_year: string | null,
    end_month: string | null,
    ) {
    const API_PATH = useApiPath()
    const fetcher = async (url: string) => {
        if (!start_year || !start_month || !end_year || !end_month) {
            return []
        }
        const res = await fetch(url)
        let data = await res.json()
        data = data.sort((a: MonthlyAttendance, b: MonthlyAttendance) => a.teacher.display_name.localeCompare(b.teacher.display_name))
        return data
    }
    const query = new URLSearchParams({ 
        start_year: start_year!, 
        start_month: start_month!,
        end_year: end_year!,
        end_month: end_month!,    
    })
    const api_url = new URL(`salary/bulk/${school_id}/between/?${query}`, API_PATH)
    const { data, error, isLoading, mutate }: 
        {data: MonthlyAttendance[], error:any, isLoading: boolean, mutate: any} = useSWR(api_url.href, fetcher)
    return { data, error, isLoading, mutate }
}
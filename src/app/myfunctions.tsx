import Xlsx from "xlsx"
import { utils } from "xlsx"
import { C } from "@/app/const"
import { User } from "@/app/types/user"
import useSWR from "swr"

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

export function useTeacherList(school_id?: string) {
    const query = new URLSearchParams({ school_id: school_id ?? '' });
    const api_url = new URL(`teachers/?${query}`, C.API_PATH)
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    try {
        const { data, error, isLoading } = useSWR(api_url.href, fetcher)
        return { data, error, isLoading }
    }  
    catch (error) {
        return { data: [], error: error, isLoading: true }
    }
}

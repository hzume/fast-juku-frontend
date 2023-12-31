import Xlsx from "xlsx"
import { utils } from "xlsx"
import { C } from "@/app/const"
import { User } from "@/app/types/user"
import useSWR from "swr"
import { use } from "react"
import { useApiPath } from "@/providers/ApiPathContext"

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
    const API_PATH = useApiPath()
    const api_url = new URL(`teachers/bulk/${school_id}`, API_PATH)
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, error, isLoading, mutate } = useSWR(api_url.href, fetcher)
    return { data, error, isLoading, mutate }
}

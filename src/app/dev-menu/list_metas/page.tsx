"use client"

import { Meta } from "@/app/interfaces/meta"
import { LoadingIcon } from "@/components/LoadingIcon"
import { useApiPath } from "@/providers/ApiPathContext"
import useSWR from "swr"
import { CreateMetaForm } from "../components/CreateMetaForm"

export default function Page() {
    const API_PATH = useApiPath()
    const fetcher = async (url: string) => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
    const api_url = new URL(`metas`, API_PATH)
    const { data: metas, error, isLoading, mutate }
    :{ data: Meta[], error: any, isLoading: boolean, mutate: any} = useSWR(api_url.href, fetcher)

    if (error) return <div>{error}</div>
    if (isLoading) return <LoadingIcon/>

    const MetaTableRow = (meta: Meta) => {
        return (
            <tr>
                <td>{meta.school_name}</td>
                <td>{meta.school_id}</td>
            </tr>
        )
    }
    return (
        <div className="space-y-4">
            <CreateMetaForm/>
            <table className="table">
                <tbody>
                    {metas.map(meta => <MetaTableRow key={meta.school_id} {...meta} />)}
                </tbody>
            </table>
        </div>
    )
}
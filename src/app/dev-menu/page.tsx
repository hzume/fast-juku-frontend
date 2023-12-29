"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

export default function Page() {
    const current_path = usePathname();
    const create_meta_path =  path.join(current_path, 'create_meta')
    const create_teachers_path =  path.join(current_path, 'create_teachers')
    return (
        <div className='m-8'>
        <ul className="menu p-4 w-80 min-h-full text-base-content space-y-3">
                <li><Link href={create_teachers_path}>CSVから講師を登録</Link></li>
                <li><Link href={create_meta_path}>学校情報を登録</Link></li>
        </ul>
        </div>
    )
}
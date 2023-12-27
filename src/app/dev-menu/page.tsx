import Link from "next/link";

export default function Page() {
    return (
        <div className='m-8'>
        <ul className="menu p-4 w-80 min-h-full text-base-content space-y-3">
                <li><Link href="/admin/create_teachers">CSVから講師を登録</Link></li>
                <li><Link href="/admin/create_meta">学校情報を登録</Link></li>
        </ul>
        </div>
    )
}
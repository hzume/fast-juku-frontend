import { usePathname } from "next/navigation"

export const Breadcrumbs = () => {
    const current_path = usePathname()
    const path_segments = current_path.split('/').filter(segment => segment.length > 0)
    const en2ja = {
        "management": "管理メニュー",
        "teachers": "講師リスト",
        "dev-menu": "開発メニュー",
        "timetable": "時間割作成",
        "salary": "給与計算",
        "shift-schedule": "シフト表",
    }
    //@ts-ignore
    const path_names = path_segments.map(segment => en2ja[segment] || segment)
    return (
        <div className="text-sm breadcrumbs px-8">
            <ul>
                <li key={-1}>
                    <a href="/">
                        ホーム
                    </a>                    
                </li>
                {path_names.map((path_name, i) => (
                    <li key={i}>
                        <a href={`/${path_segments.slice(0, i + 1).join('/')}`}>{path_name}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

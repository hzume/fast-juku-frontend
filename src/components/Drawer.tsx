import Link from "next/link"

export const Drawer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className=" menu p-4 w-80 max-w-screen min-h-full bg-base-200 text-base-content space-y-3">
                    {/* Sidebar content here */}
                    <li><Link href="/shift-schedule">シフト表</Link></li>
                    <li><Link href="/timetable">時間割作成</Link></li>
                    <li><Link href="/salary">給与計算</Link></li>
                    <li><Link href="/management/teachers">管理メニュー</Link></li>
                    <li><Link href="/dev-menu">開発メニュー</Link></li>
                </ul>
            </div>
        </div>
    )
}
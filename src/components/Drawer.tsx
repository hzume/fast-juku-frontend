"use client"
import { getPreviousYearMonth } from "@/app/myfunctions"
import { useUser } from "@/providers/UserContext"
import Link from "next/link"
import { LoadingIcon } from "./LoadingIcon"

export const Drawer = ({ children }: { children: React.ReactNode }) => {
    const user = useUser()
    const { year, month } = getPreviousYearMonth()
    const query = new URLSearchParams({ year: year.toString(), month: month.toString() })
    const view_payslip_monthly_url = `/salary/view-payslip/monthly/?${query}`
    if (!user) return <LoadingIcon />
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className=" menu p-4 w-60 max-w-screen min-h-full bg-base-200 text-base-content space-y-3">
                    {
                        user.id != "guest"
                        &&
                        <div>
                            <li className="hidden"><Link href="/shift-schedule">シフト表</Link></li>
                            <li className="hidden"><Link href="/timetable">時間割作成</Link></li>
                            <li><Link href="/salary">給与計算</Link></li>
                            <li>
                                <ul>
                                    <li><Link href="/salary/register-timetable">時間割登録</Link></li>
                                    <li><Link href={view_payslip_monthly_url}>月間 給与明細閲覧</Link></li>
                                    <li><Link href="/salary/view-payslip/yearly">年間 給与明細閲覧</Link></li>
                                </ul>
                            </li>
                            <li><Link href="/management/teachers">管理メニュー</Link></li>
                        </div>
                    }
                    {
                        user.teacher_type == "admin"
                        &&
                        <li><Link href="/dev-menu">開発メニュー</Link></li>
                    }
                </ul>
            </div>
        </div>
    )
}
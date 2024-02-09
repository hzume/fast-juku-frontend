"use client"

import Link from "next/link"
import { getPreviousYearMonth } from "../myfunctions"

export default function Page() {
	const { year, month } = getPreviousYearMonth()
	const query = new URLSearchParams({ year: year.toString(), month: month.toString() })
	const url = `/salary/view-payslip/?${query}`
	return (
		<div className="space-y-4">
			<div>
				<Link href="/salary/register-timetable">
					<button className="btn btn-outline btn-wide">
						時間割登録
					</button>
				</Link>
			</div>
			<div className="flex gap-2">
				<Link href={url}>
					<button className="btn btn-outline btn-wide">
						給与明細閲覧
					</button>
				</Link>
			</div>
		</div>
	)
}
"use client"

import Link from "next/link"
import { getPreviousYearMonth } from "../../myfunctions"

export default function Page() {
	const { year, month } = getPreviousYearMonth()
	const query = new URLSearchParams({ year: year.toString(), month: month.toString() })
	const url = `/salary/view-payslip/monthly/?${query}`
	return (
		<div className="space-y-4">
			<div className="flex gap-2">
				<Link href={url}>
					<button className="btn btn-outline btn-wide">
						月間 給与明細閲覧
					</button>
				</Link>
			</div>
			<div>
				<Link href="/salary/view-payslip/yearly">
					<button className="btn btn-outline btn-wide">
						年間 給与明細閲覧
					</button>
				</Link>
			</div>
		</div>
	)
}
"use client"

import Link from "next/link"
import { getPreviousYearMonth } from "../myfunctions"

export default function Page() {
	const date = new Date()
	const { year, month } = getPreviousYearMonth()
	const query = new URLSearchParams({ year: year.toString(), month: month.toString() })
	const url = `/salary/view/?${query}`
	return (
		<div className="space-y-4">
			<div>
				<Link href="/salary/create">
					<button className="btn btn-outline btn-wide">
						新規作成
					</button>
				</Link>
			</div>
			<div className="flex gap-2">
				<Link href={url}>
					<button className="btn btn-outline btn-wide">
						閲覧
					</button>
				</Link>
			</div>
		</div>
	)
}
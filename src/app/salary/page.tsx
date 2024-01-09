"use client"

import Link from "next/link"

export default function Page() {
	return (
		<div className="space-y-4">
			<div>
				<Link href="/salary/create">
					<button className="btn btn-outline btn-wide">
						新規作成
					</button>
				</Link>
			</div>
			<div>
				<Link href="/salary/view">
					<button className="btn btn-outline btn-wide">
						閲覧
					</button>
				</Link>
			</div>

		</div>
	)
}
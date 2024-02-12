"use client"
import { useUser } from "@/providers/UserContext";
import { useApiPath } from "@/providers/ApiPathContext";
import Link from "next/link";

export default function Page() {
    return (
        <div>
            <Link href="/management/teachers">
                <button className="btn btn-outline btn-wide">
                    時間割登録
                </button>
            </Link>
        </div>
    )
}

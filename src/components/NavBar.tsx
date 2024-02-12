"use client"
import Link from "next/link"
import { LoginButton, LogoutButton } from "./AuthenticateButton"
import { useUser } from "@/providers/UserContext"


export const NavBar = () => {
    const user = useUser()
    const full_name = user?.family_name + " " + user?.given_name
    return (
        <div className="navbar bg-base-100">
            <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
            <div className="w-full flex justify-between">
                <Link href="/"><button className="btn btn-ghost text-xl">
                    Fast塾
                </button></Link>
                <div className="flex gap-4">
                    <span className="mt-3">{full_name}</span>
                <div>
                    {
                        (user?.id == "guest")
                        &&
                        <LoginButton />
                    }
                    {
                        (user?.id != "guest")
                        &&
                        <LogoutButton />
                    }
                </div>
                </div>                
            </div>

        </div>
    )
}
import Link from "next/link"
import { LogoutButton } from "./AuthenticateButton"


export const NavBar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl" href="/">FastJuku</Link>
            </div>
            <div className="flex-none">
                <LogoutButton />
            </div>
        </div>
    )
}
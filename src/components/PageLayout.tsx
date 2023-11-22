"use client"

import { ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { LogoutButton } from './AuthenticateButton'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export const PageLayout = ({ children }: { children: ReactNode }) => {
    const { data: session, status } = useSession(
        { required: true,
          onUnauthenticated() {
            signIn()
          },
        })
    if (status === 'loading') {
        return <div>Loading...</div>
    }

    return (
        <>
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
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className='m-8'>
                {children}
                </div>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-3">
                {/* Sidebar content here */}
                <li><Link href="/shift-schedule">シフト表</Link></li>
                <li><Link href="/timetable">時間割作成</Link></li>
                <li><Link href="/salary">給与計算</Link></li>
                <li><Link href="/management">講師管理</Link></li>
                </ul>
            </div>
        </div>
        </>
    )
  }
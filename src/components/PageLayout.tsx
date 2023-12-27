"use client"

import { NavBar } from './NavBar'
import { Drawer } from './Drawer'
import { Breadcrumbs } from './Breadcrumbs'
import { ReactNode } from 'react'
import { useUser } from '@/providers/UserContext'


export const PageLayout = ({ children }: { children: ReactNode }) => {
    const user = useUser();
    if (!user) return <>Loading</>
    return (
        <>
            <NavBar />
            <Drawer>
                <Breadcrumbs />
                <div className='m-8 max-w-4xl h-full'>
                    {children}
                </div>
            </Drawer>
        </>
    )
}
"use client"

import { NavBar } from './NavBar'
import { Drawer } from './Drawer'
import { Breadcrumbs } from './Breadcrumbs'
import { ReactNode } from 'react'
import { useUser } from '@/providers/UserContext'
import { LoadingIcon } from './LoadingIcon'


export const PageLayout = ({ children }: { children: ReactNode }) => {
    const user = useUser();
    if (!user) return <LoadingIcon />
    return (
        <div>
            <NavBar />
            <Drawer>
                <div className='bg-white'>
                    <Breadcrumbs />
                    <div className='m-8 max-w-4xl h-full'>
                        {children}
                    </div>
                </div>
            </Drawer>
        </div>
    )
}
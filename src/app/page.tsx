"use client"

import { useUser } from '@/providers/UserContext';
import { useSession } from 'next-auth/react'

export default function Home() {
  const user = useUser();
  return (
    <main className='flex h-screen justify-center items-center'>
      <div className='text-center'>
      Welcome {user?.family_name}!
      </div>
    </main>
  )
}

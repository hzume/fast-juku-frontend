"use client"

import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { LoginButton, LogoutButton } from '@/components/AuthenticateButton'
import { stat } from 'fs'

export default function Home() {
  const { data: session, status } = useSession(
    { required: true,
      onUnauthenticated() {
        signIn()
      },
    }
  )

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <main className='flex h-screen justify-center items-center'>
      <div className='text-center'>
      Welcome!
      </div>
    </main>
  )
}

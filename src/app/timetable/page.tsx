"use client"

import React from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

export default function Page() {
    const { data: session, status } = useSession({ required: true, onUnauthenticated() {
            signIn();
        }, });
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    return (<main className='flex h-screen justify-center items-center'>
      <div className='text-center'></div>
    </main>);
}
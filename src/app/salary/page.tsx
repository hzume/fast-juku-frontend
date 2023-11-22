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
    return ( 
        <div className='w-full max-w-full'>
            <span>時間割表</span>
            <input type="file" className="file-input file-input-bordered w-1/2 max-w-full" />
            <span className="label-text">ミーティングを追加</span>
        </div>
    );
}
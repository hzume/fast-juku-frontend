"use client"

import { signIn } from "next-auth/react"
import { useEffect } from "react";

export const SignIn = () => {
    useEffect(() => {
        if (typeof window !== 'undefined')
            signIn();
    })
    
    return <></>
}
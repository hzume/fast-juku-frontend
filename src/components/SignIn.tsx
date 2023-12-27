"use client"

import { signIn } from "next-auth/react"

export const SignIn = () => {
    signIn();
    return <></>
}
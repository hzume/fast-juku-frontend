"use client";
import {signIn, signOut} from "next-auth/react"
import React from "react"

// ログインボタン
export const LoginButton = () => {
    return (
        <button className="btn" onClick={() => signIn()}>
        サインイン
        </button>
    )
}

// ログアウトボタン
export const LogoutButton = () => {
    return (
        <button className="btn" onClick={() => signOut()}>
            ログアウト
        </button>
    )
}
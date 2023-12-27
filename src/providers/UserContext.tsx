"use client"

import { User } from "@/app/types/user";
import { useContext } from "react";
import { createContext } from "react";

const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children, user }: { children: React.ReactNode, user: User }) => {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const user = useContext(UserContext);
    return user;
}

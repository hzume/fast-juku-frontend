"use client"

import { User } from "@/app/types/user";
import { useContext } from "react";
import { createContext } from "react";

const ApiPathContext = createContext<string | undefined>(undefined);

export const ApiPathProvider = ({ children, API_PATH }: { children: React.ReactNode, API_PATH: string | undefined}) => {
    return (
        <ApiPathContext.Provider value={API_PATH}>
            {children}
        </ApiPathContext.Provider>
    )
}

export const useApiPath = () => {
    const API_PATH = useContext(ApiPathContext);
    return API_PATH;
}

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { C } from "@/app/const";
import { User } from "@/app/types/user";
import { SignIn } from "@/components/SignIn";
import { getServerSession } from "next-auth";
import { UserProvider } from "./UserContext";


export const DataFetch = async ({ children }: {children: React.ReactNode}) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <SignIn />
    }
    // @ts-ignore
    const sub = session.user?.id; 
    const api_url = new URL(`teachers/sub/${sub}`, C.API_PATH)
    const res = await fetch(api_url.href, {
        method: 'GET',
    });
    const data = await res.json();
    const user: User = {
        id: data.id,
        school_id: data.school_id,
        family_name: data.family_name,
        given_name: data.given_name,
    }

    return (
        <UserProvider user={user}>
            {children}
        </UserProvider>
    )
}

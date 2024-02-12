import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/interfaces/user";
import { SignIn } from "@/components/SignIn";
import { getServerSession } from "next-auth";
import { UserProvider } from "./UserContext";
import { ApiPathProvider } from "./ApiPathContext";


export const DataFetch = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions);
    let user: User
    const guest_user: User = {
        id: "guest",
        school_id: "guest",
        family_name: "ゲスト",
        given_name: "",
        teacher_type: "guest"
    }

    if (session) {
        //@ts-ignore 
        const sub = session.user?.id;
        const api_url = new URL(`teachers/sub/${sub}`, process.env.API_PATH)
        const res = await fetch(api_url.href, {
            method: "GET"
        });
        const data = await res.json();

        if (data.id) {
            user = {
                id: data.id,
                school_id: data.school_id,
                family_name: data.family_name,
                given_name: data.given_name,
                teacher_type: data.teacher_type,
            }
        }
        else {
            user = guest_user
        }
    }
    else {
        user = guest_user
    }

    return (
        <UserProvider user={user}>
            <ApiPathProvider API_PATH={process.env.API_PATH}>
                {children}
            </ApiPathProvider>
        </UserProvider>
    )
}

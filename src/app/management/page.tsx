"use client"
import { useUser } from "@/providers/UserContext";
import { useApiPath } from "@/providers/ApiPathContext";

export default function Page() {
    const user = useUser();
    const API_PATH = useApiPath();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const file = event.currentTarget['file'].files[0]
    }
    return (
        <div>
            <form className="form-control" onSubmit={onSubmit}>
                <input type="file" name="file" className="file-input"/>
                <button type="submit" className="btn">送信</button>
            </form>
        </div>
    )
}

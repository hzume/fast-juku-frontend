"use client"
import { useSession } from "next-auth/react";

export const AuthButton = () => {
  const { data: session, status } = useSession();
  const onClickAuth = async () => {
    const url = new URL("/protected", process.env.API_PATH);
    const res = await fetch(url.href, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session!.user?.id}`,
      },
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
  };

  return <button onClick={onClickAuth}>auth</button>;
};

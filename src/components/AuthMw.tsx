import { cookies } from "next/headers";
import AuthMwClient from "./AuthMwClient";

export default function AuthMw({ children }: {
    children: React.ReactNode
}){
    const cookie = cookies();
    return (
            <AuthMwClient>
                {children}
            </AuthMwClient>
    );
}
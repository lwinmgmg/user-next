import AuthMwClient from "./AuthMwClient";

export default function AuthMw({ children }: {
    children: React.ReactNode
}){
    return (
            <AuthMwClient>
                {children}
            </AuthMwClient>
    );
}

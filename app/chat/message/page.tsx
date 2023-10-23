import AuthMwClient from "@/src/components/AuthMwClient";
import ChatMesg from "@/src/components/ChatMessage/ChatMesg";

export default function ChatMesgPage(){
    return (
        <>
            <main className="h-full w-full bg-slate-800">
                <AuthMwClient>
                    <ChatMesg />
                </AuthMwClient>
            </main>
        </>
    );
}
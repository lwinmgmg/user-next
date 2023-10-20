import ChatMesg from "@/src/components/ChatMesg";

export default function ChatMesgPage({
    params: {
        convId
    }
}: {
    params:{
        convId: number
    }
}){
    return (
        <>
            <ChatMesg convId={convId} />
        </>
    );
}
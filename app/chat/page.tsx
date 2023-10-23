import ConvList from "@/src/components/ChatList/ConvList";

export default function ChatPage(){
    return (<>
        <main className="h-full flex flex-row bg-slate-400">
            <div className="flex-1 hidden sm:block">
            </div>
            <div className="space-y-3 shrink-0 p-2 flex flex-col max-w-lg w-full bg-slate-200 py-1 scroll-auto h-full m-auto">
                <ConvList />
            </div>
            <div className="flex-1 hidden sm:block"></div>
        </main>
    </>);
}
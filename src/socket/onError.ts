export default function onError(ws: WebSocket) {
    return (err: Event)=>{
        console.log('Socket encountered error: ', err, 'Closing socket');
        if (ws && (ws.readyState === ws.OPEN || ws.readyState === ws.CONNECTING)) {
            ws.close();
        };
    };
};

export default function onError(ws: WebSocket) {
    return (err: Event)=>{
        console.error('Socket encountered error: ', err, 'Closing socket');
        ws.close();
    };
};

import onError from "./onError";
import onMessage from "./onMessage";
import onOpen from "./onOpen";

function connect()
{
var ws = new WebSocket('ws://localhost:8080');
ws.onopen = onOpen(ws)

ws.onmessage = onMessage

ws.onclose = 

ws.onerror = onError(ws)
    return ws
}

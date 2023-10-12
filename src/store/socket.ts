import { createContext } from "react";

export const WsContext = createContext<WebSocket|undefined>(undefined)

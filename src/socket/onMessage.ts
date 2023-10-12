import { AppDispatch } from "../store/store";

export default function onMessage(mesg: MessageEvent){
    console.log(mesg.data);
}
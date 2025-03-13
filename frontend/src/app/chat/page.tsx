"use client"
import { CardsChat } from "@/components/chat"
import { useEffect } from "react";
import { useState } from "react";

export default function ChatPage() {
    // establish websocket connection
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000/api/chat");
        setSocket(ws);
        // wait for connection
        ws.onopen = () => {
            console.log("Connected to server");
            ws.send(JSON.stringify({
                type: "connect",
                conversation_id: "123"
            }));
        }
        ws.onmessage = (event) => {
            console.log(event.data);
        }
        
    }, []);


    return (
        <div>
            <CardsChat />
        </div>
    )
}
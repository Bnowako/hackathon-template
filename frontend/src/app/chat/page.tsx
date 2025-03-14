// todo refactor me
"use client"
import { CardsChat } from "@/components/chat"
import { BaseMessage } from "@/lib/apiTypes";
import { useEffect } from "react";
import { useState } from "react";

export default function ChatPage() {
    // establish websocket connection
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<Array<BaseMessage>>([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000/api/chat");
        setSocket(ws);
        // wait for connection
        ws.onopen = () => {
            console.log("Connected to server");
        }
        ws.onmessage = (event) => {
            const data: BaseMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data]);
        }
        
    }, []);

    const userSentMessage = (message: string) => {
        socket?.send(JSON.stringify({
            content: message,
        }));
    }


    return (
        <div>
            <CardsChat
                messages={messages}
                onSendMessage={(message: string) => {
                    userSentMessage(message);
                }}
            />
        </div>
    )
}
// todo refactor me
"use client"
import { CardsChat } from "@/components/chat"
import { useEffect } from "react";
import { useState } from "react";

export default function ChatPage() {
    // establish websocket connection
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<Array<{role: "user" | "agent", content: string}>>([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000/api/chat");
        setSocket(ws);
        // wait for connection
        ws.onopen = () => {
            console.log("Connected to server");
        }
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, {role: data.role, content: data.message}]);
        }
        
    }, []);

    const userSentMessage = (message: string) => {
        setMessages((prevMessages) => [...prevMessages, {role: "user", content: message}]);
        socket?.send(JSON.stringify({
            role: "user",
            conversation_id: "1",
            message: message
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
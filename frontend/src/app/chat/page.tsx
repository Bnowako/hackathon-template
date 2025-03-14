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
    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

    useEffect(() => {
        const connectWebSocket = () => {
            const ws = new WebSocket("ws://localhost:3000/api/chat");
            setSocket(ws);

            ws.onopen = () => {
                console.log("Connected to server");
                setConnectionStatus('connected');
            }

            ws.onmessage = (event) => {
                const data: BaseMessage = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, data]);
            }

            ws.onclose = () => {
                console.log("Disconnected from server");
                setConnectionStatus('disconnected');
                // Attempt to reconnect after 3 seconds
                setTimeout(connectWebSocket, 3000);
            }

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                ws.close();
            }
        };

        connectWebSocket();

        // Cleanup on component unmount
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    const userSentMessage = (message: string) => {
        socket?.send(JSON.stringify({
            content: message,
        }));
    }


    return (
        <div>
            <div className="p-2 text-sm">
                Status: {connectionStatus === 'connected' ? 
                    '🟢 Connected' : 
                    connectionStatus === 'connecting' ? 
                    '🟡 Connecting...' : 
                    '🔴 Disconnected (Reconnecting...)'}
            </div>
            <CardsChat
                messages={messages}
                onSendMessage={(message: string) => {
                    userSentMessage(message);
                }}
            />
        </div>
    )
}
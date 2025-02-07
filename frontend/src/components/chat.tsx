"use client"

import { Send } from "lucide-react"
import * as React from "react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BaseMessage } from "@/lib/apiTypes"
import { ChatMessage } from "@/components/ChatMessage"


interface CardsChatProps {
  messages: Array<BaseMessage>;
  onSendMessage: (message: string) => void;
}


export function CardsChat({ messages, onSendMessage }: CardsChatProps) {

  const [input, setInput] = React.useState("")
  const inputLength = input.trim().length

  

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>LLM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">My Agent</p>
              <p className="text-sm text-muted-foreground">Gregory</p>
            </div>
          </div>
        
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message: BaseMessage, index: number) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>
        </CardContent>
        <CardFooter>
        <form
            onSubmit={(event) => {
              event.preventDefault()
              if (inputLength === 0) return
              onSendMessage(input)
              setInput("") // Clear input after sending
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <Send />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  )
}
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
import { cn } from "@/lib/utils"
import { BaseMessage } from "@/lib/apiTypes"


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
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.type === "human"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
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
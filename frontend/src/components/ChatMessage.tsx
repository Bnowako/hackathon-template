import { cn } from "@/lib/utils"
import { BaseMessage } from "@/lib/apiTypes"

interface ChatMessageProps {
  message: BaseMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
        message.type === "human"
          ? "ml-auto bg-primary text-primary-foreground"
          : message.type === "tool" 
          ? "bg-yellow-100"
          : message.type === "ai" && message.tool_calls && message.tool_calls.length > 0
          ? "bg-blue-100" 
          : "bg-muted"
      )}
    >
      {message.content}
      
      {message.tool_calls && message.tool_calls.length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          {message.tool_calls.map((tool, i) => (
            <div key={i}>
              Tool: {tool.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 
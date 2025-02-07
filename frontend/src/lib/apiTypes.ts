import { components } from "./types";


export type ExampleResponse = components["schemas"]["ExampleResponse"]
export type PostExampleRequest = components["schemas"]["PostExampleRequest"]
export type PutExampleRequest = components["schemas"]["PutExampleRequest"]
export type BaseMessage = {
    type: "human" | "ai"  | "tool",
    content: string,
    conversation_id: string,
    tool_calls?: {
        name: string,
        args: Record<string, unknown>,
    }[],
}
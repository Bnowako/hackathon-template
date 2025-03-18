import logging

import time
from typing import Annotated, AsyncGenerator, TypedDict
from langchain_core.messages import BaseMessage, HumanMessage
from langchain_core.tools import tool # type: ignore
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from langgraph.graph.message import add_messages
from langgraph.graph import START, END
from langgraph.graph.state import CompiledStateGraph, StateGraph
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.checkpoint.memory import MemorySaver

load_dotenv()

logger = logging.Logger(__name__)


class State(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]


@tool
def what_day_and_time_is_it():
    """Tells the agent what day of the week and time is it"""
    return time.strftime("%A %H:%M:%S", time.localtime())


class LLMAgent():
    def __init__(
        self,
    ) -> None:
        logger.info("Initializing LLMAgent")
        in_memory_store = MemorySaver()
        llm = ChatOpenAI(model="gpt-4o-mini")
        llm_with_tools = llm.bind_tools([what_day_and_time_is_it]) # type: ignore
        tool_node = ToolNode(tools=[what_day_and_time_is_it])
        def chatbot(state: State) -> State:
            return {"messages": [llm_with_tools.invoke(state["messages"])]}
        
        graph_builder = StateGraph(State)
        graph_builder.add_node("chatbot", chatbot) # type: ignore
        graph_builder.add_node('tools', tool_node) # type: ignore

        graph_builder.add_conditional_edges(
            "chatbot",
            tools_condition,
        )
        graph_builder.add_edge(START, "chatbot")
        graph_builder.add_edge("tools", "chatbot")
        graph_builder.add_edge("chatbot", END)
        
        self.graph: CompiledStateGraph = graph_builder.compile(checkpointer=in_memory_store) # type: ignore


    async def astream(self, user_query: str, conversation_id: str) -> AsyncGenerator[BaseMessage, None]:
        async for event in self.graph.astream( # type: ignore
            input={"messages": [HumanMessage(content=user_query)]},
            config={"configurable": {"thread_id": conversation_id}},
            stream_mode="values",
        ):
            logger.info(f"Yielding Event: {event}")
            yield event['messages'][-1]

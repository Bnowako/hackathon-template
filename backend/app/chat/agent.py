"""
Langchain agent
"""
import logging

import time
from typing import Annotated, Any, AsyncGenerator, Callable, Generator, Protocol, TypedDict
from langchain.chat_models.base import BaseChatModel
from langchain_core.messages import BaseMessage, HumanMessage
from langchain_core.tools import tool # type: ignore
from langchain_openai import ChatOpenAI
from langgraph.store.memory import InMemoryStore
from langgraph.prebuilt import create_react_agent # type: ignore
from dotenv import load_dotenv
from langgraph.graph.message import add_messages
from langgraph.graph import START, END
from langgraph.graph.state import CompiledStateGraph, StateGraph

load_dotenv()

logger = logging.Logger(__name__)

llm = ChatOpenAI(model="gpt-4o-mini")

class State(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]


# This is a hack to make the react agent work with openai api.
# Agents are not working without tools, so we need to add a dummy tool
@tool
def what_day_and_time_is_it():
    """Tells the agent what day of the week and time is it"""
    return time.strftime("%A %H:%M:%S", time.localtime())

def chatbot(state: State) -> State:
    return {"messages": [llm.invoke(state["messages"])]}

class LLMAgent():
    def __init__(
        self,
    ) -> None:
        logger.info("Initializing LLMAgent")
        # in_memory_store = InMemoryStore()
        
        graph_builder = StateGraph(State)
        graph_builder.add_node("chatbot", chatbot) # type: ignore
        graph_builder.add_edge(START, "chatbot")
        graph_builder.add_edge("chatbot", END)
        self.graph: CompiledStateGraph = graph_builder.compile() # type: ignore


    async def astream(self, user_query: str, conversation_id: str) -> AsyncGenerator[BaseMessage, None]:
        # Generator[YieldType, SendType, ReturnType]
        # YieldType: The type of values that will be yielded (str in this case - the chat messages)
        # SendType: The type that can be sent to the generator via .send() (None since we don't use .send())
        # ReturnType: The type that is returned when generator is done (None since we don't return anything)
        async for event in self.graph.astream( # type: ignore
            input={"messages": [HumanMessage(content=user_query)]},
            config={"configurable": {"thread_id": conversation_id}},
            stream_mode="values",
        ):
            logger.info(f"Yielding Event: {event}")
            yield event['messages'][-1]
            


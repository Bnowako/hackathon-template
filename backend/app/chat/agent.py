"""
Langchain agent
"""
import asyncio
import logging

import time
from langchain.chat_models.base import BaseChatModel
from langchain_core.messages import HumanMessage
from langchain_core.tools import tool # type: ignore
from langchain_openai import ChatOpenAI
from langgraph.store.memory import InMemoryStore
from langgraph.prebuilt import create_react_agent # type: ignore
from dotenv import load_dotenv

load_dotenv()

logger = logging.Logger(__name__)
logger.setLevel(logging.INFO)

# This is a hack to make the react agent work with openai api.
# Agents are not working without tools, so we need to add a dummy tool
@tool
def what_day_and_time_is_it():
    """Tells the agent what day of the week and time is it"""
    return time.strftime("%A %H:%M:%S", time.localtime())

class LLMAgent():
    def __init__(
        self,
        llm: BaseChatModel,
    ) -> None:
        self.llm = llm
        logger.info("Initializing LLMAgent")
        in_memory_store = InMemoryStore()
        self.agent = create_react_agent(
            model=self.llm,
            store=in_memory_store,
            tools=[what_day_and_time_is_it],
        )

    async def ask(self, user_query: str, conversation_id: str) -> str:
        response = await self.agent.ainvoke(
            input={"messages": [HumanMessage(content=user_query)]},
            config={"configurable": {"thread_id": conversation_id}},

        )
        return response["messages"][-1].content

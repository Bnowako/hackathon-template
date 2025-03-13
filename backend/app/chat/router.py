

import json
from fastapi import APIRouter, WebSocket
import logging

from langchain_openai import ChatOpenAI
from .agent import LLMAgent
from .schemas import Message

router = APIRouter()

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# create web socket connection for chat 
@router.websocket("/chat")
async def chat(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection accepted")
    llm = ChatOpenAI(model="gpt-4o-mini")
    agent = LLMAgent(llm)
    logger.info("Agent initialized")
    while True:
        data = await websocket.receive_text()
        logger.info(f"Received message: {data}")
        message = Message(**json.loads(data))
        response = await agent.ask(message.message, message.conversation_id)
        await websocket.send_text(Message(role="assistant", message=response, conversation_id=message.conversation_id).model_dump_json())
        logger.info(f"Sent message: {response}")


import json
from fastapi import APIRouter, WebSocket
import logging
import uuid

from .agent import LLMAgent
from .schemas import PostUserMessage

router = APIRouter()

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# create web socket connection for chat 
@router.websocket("/chat")
async def chat(websocket: WebSocket):
    await websocket.accept()
    conversation_id = str(uuid.uuid4())
    logger.info("WebSocket connection accepted")
    
    agent = LLMAgent()
    logger.info("Agent initialized")
    while True:
        data = await websocket.receive_text()
        logger.info(f"Received message: {data}")
        
        message = PostUserMessage(**json.loads(data))
        
        async for response in agent.astream(message.content, conversation_id):
            logger.info(f"WS sent: {response.model_dump_json()}")
            await websocket.send_text(response.model_dump_json())


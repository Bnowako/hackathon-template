

from fastapi import APIRouter, WebSocket
import logging

router = APIRouter()

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# create web socket connection for chat 
@router.websocket("/chat")
async def chat(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        logger.info(f"Received message: {data}")


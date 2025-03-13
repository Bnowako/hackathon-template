from pydantic import BaseModel


class Message(BaseModel):
    role: str
    message: str
    conversation_id: str

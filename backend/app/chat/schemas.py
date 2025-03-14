from pydantic import BaseModel


class PostUserMessage(BaseModel):
    content: str

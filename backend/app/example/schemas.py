from pydantic import BaseModel

class ExampleResponse(BaseModel):
    id: str
    name: str

class PostExampleRequest(BaseModel):
    name: str

class PutExampleRequest(BaseModel):
    name: str
    
    
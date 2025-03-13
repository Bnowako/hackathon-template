from typing import List
from bson import ObjectId
from fastapi import APIRouter, HTTPException
from .models import ExampleDocument
from .schemas import ExampleResponse, PostExampleRequest, PutExampleRequest

router  = APIRouter(prefix="/examples", tags=["examples"])

@router.get("/")
async def get_examples() -> List[ExampleResponse]:
    examples = await ExampleDocument.find_all().to_list()
    return [ExampleResponse(id=str(example.id), name=example.name) for example in examples]

@router.get("/{example_id}")
async def get_example(example_id: str) -> ExampleResponse:
    example = await ExampleDocument.find_one(ExampleDocument.id == ObjectId(example_id))
    if example is None:
        raise HTTPException(status_code=404, detail="Example not found")
    
    return ExampleResponse(id=str(example.id), name=example.name)


@router.post("/")
async def create_example(example: PostExampleRequest) -> ExampleResponse:
    new_example = ExampleDocument(name=example.name)
    await new_example.save()
    
    return ExampleResponse(id=str(new_example.id), name=new_example.name)

@router.put("/{example_id}")
async def update_example(example_id: str, example: PutExampleRequest) -> ExampleResponse:
    existing_example = await ExampleDocument.find_one(ExampleDocument.id == ObjectId(example_id))
    if existing_example is None:
        raise HTTPException(status_code=404, detail="Example not found")
    
    existing_example.name = example.name
    await existing_example.save()
    return ExampleResponse(id=str(existing_example.id), name=existing_example.name)

@router.delete("/{example_id}")
async def delete_example(example_id: str):
    existing_example = await ExampleDocument.find_one(ExampleDocument.id == ObjectId(example_id))
    if existing_example is None:
        raise HTTPException(status_code=404, detail="Example not found")
    
    await existing_example.delete()




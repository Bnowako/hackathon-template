import os
from typing import Dict, Any
from beanie.odm.utils.init import init_beanie # type: ignore
from fastapi import FastAPI
import motor.motor_asyncio
from fastapi.middleware.cors import CORSMiddleware
import logging
from dotenv import load_dotenv

if not load_dotenv():
    raise Exception("Problem loading .env file")

class Config:
    MONGODB_URL = os.getenv("MONGODB_URL")
    MONGODB_DATABASE = os.getenv("MONGODB_DATABASE")


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MongoFastAPI(FastAPI):
    mongodb_client: motor.motor_asyncio.AsyncIOMotorClient[Dict[str, Any]]
    database: motor.motor_asyncio.AsyncIOMotorDatabase[Dict[str, Any]]

async def db_lifespan(app: MongoFastAPI):
    # Startup
    app.mongodb_client = motor.motor_asyncio.AsyncIOMotorClient(Config.MONGODB_URL)
    app.database = app.mongodb_client.get_database(Config.MONGODB_DATABASE)
    ping_response = await app.database.command("ping")
    
    if int(ping_response["ok"]) != 1:
        raise Exception("Problem connecting to database cluster.")
    else:
        logger.info("Connected to database cluster.")
    
    await init_beanie(database=app.database, document_models=[])
    
    yield
    app.mongodb_client.close()

def create_app() -> FastAPI:
    app = MongoFastAPI(lifespan=db_lifespan, openapi_prefix="/api")  # type: ignore
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    logger.info("Started application")
    return app 
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel

class DeskbookEntry(BaseModel):
    name: str
    message: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mongo_user = os.environ["MONGO_USER"]
mongo_pass = os.environ["MONGO_PASS"]
mongo_host = os.environ["MONGO_HOST"]
mongo_port = os.environ["MONGO_PORT"]

client = AsyncIOMotorClient(f"mongodb://{mongo_user}:{mongo_pass}@{mongo_host}:{mongo_port}")

db = client["deskbook"] # Simply hardcoded
collection = db["entries"]

@app.post("/deskbook", response_model=DeskbookEntry)
async def add_entry(entry: DeskbookEntry):
    data = entry.dict()
    result = await collection.insert_one(data)
    return entry

@app.get("/deskbook")
async def get_entries():
    entries = []
    async for entry in collection.find():
        entry["_id"] = str(entry["_id"])
        entries.append(entry)
    entries.reverse()
    return entries

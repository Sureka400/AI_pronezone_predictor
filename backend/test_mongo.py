import asyncio
import os
import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "pronezone_db")

async def test_connection():
    print(f"Connecting to {MONGODB_URL}...")
    client = AsyncIOMotorClient(
        MONGODB_URL,
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=5000,
        tlsCAFile=certifi.where()
    )
    try:
        await client.admin.command('ping')
        print("Ping successful!")
        db = client[DATABASE_NAME]
        print(f"Connected to database: {DATABASE_NAME}")
    except Exception as e:
        print(f"Connection failed: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(test_connection())

import asyncio
import os
import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from dotenv import load_dotenv

async def check_db():
    load_dotenv()
    url = os.getenv("MONGODB_URL")
    db_name = os.getenv("DATABASE_NAME", "pronezone_db")
    
    print(f"Connecting to: {url.split('@')[-1]}") # Hide credentials
    
    print("Testing with pymongo (blocking)...")
    try:
        sync_client = MongoClient(url, tlsCAFile=certifi.where(), serverSelectionTimeoutMS=5000)
        sync_client.admin.command('ping')
        print("Success: pymongo connected!")
        sync_client.close()
    except Exception as e:
        print(f"pymongo failed: {e}")

    print("\nTesting with motor (async)...")
    client = AsyncIOMotorClient(
        url, 
        serverSelectionTimeoutMS=5000, 
        tlsCAFile=certifi.where()
    )
    
    try:
        # Check connection
        await client.admin.command('ping')
        print("Success: Successfully connected to MongoDB Atlas!")
        
        # List databases
        dbs = await client.list_database_names()
        print(f"Existing databases: {dbs}")
        
        db = client[db_name]
        collections = await db.list_collection_names()
        print(f"Collections in '{db_name}': {collections}")
        
        if not collections:
            print(f"Warning: Database '{db_name}' exists but has no collections yet.")
        else:
            for coll in collections:
                count = await db[coll].count_documents({})
                print(f" - {coll}: {count} documents")
                
    except Exception as e:
        print(f"Error: Connection failed: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(check_db())

import asyncio
from app.db.init_db import init_db
from app.db.session import connect_to_mongo, close_mongo_connection

async def main():
    print("Starting database seeding...")
    await connect_to_mongo()
    await init_db()
    await close_mongo_connection()
    print("Seeding complete!")

if __name__ == "__main__":
    asyncio.run(main())

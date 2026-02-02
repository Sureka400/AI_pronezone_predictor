from app.db.session import db_client, connect_to_mongo
from app.models import RiskZone
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def init_db():
    try:
        # Ensure connection is established
        if db_client.db is None:
            await connect_to_mongo()
        
        db = db_client.db
        
        # Ping the database to check if it's alive
        await db.command("ping")
        
        # Create default user if not exists
        user_count = await db.users.count_documents({})
        if user_count == 0:
            admin_user = {
                "username": "admin",
                "email": "admin@pronezone.ai",
                "full_name": "System Administrator",
                "hashed_password": pwd_context.hash("admin123"),
                "disabled": False
            }
            await db.users.insert_one(admin_user)
        
        # Check if we already have risk zones
        count = await db.risk_zones.count_documents({})
        
        if count == 0:
            initial_zones = [
                {
                    "id": "1",
                    "zone": "Pacific Northwest",
                    "riskLevel": "high",
                    "confidence": 94,
                    "forecast": "48-72 hours",
                    "indicators": ["Seismic Activity", "Tectonic Shifts"],
                },
                {
                    "id": "2",
                    "zone": "Southeast Asia Coastal",
                    "riskLevel": "moderate",
                    "confidence": 78,
                    "forecast": "5-7 days",
                    "indicators": ["Rising Sea Levels", "Storm Patterns"],
                },
                {
                    "id": "3",
                    "zone": "Central African Region",
                    "riskLevel": "safe",
                    "confidence": 89,
                    "forecast": "Stable",
                    "indicators": ["Normal Climate", "Low Volatility"],
                },
                {
                    "id": "4",
                    "zone": "Arctic Circle",
                    "riskLevel": "moderate",
                    "confidence": 82,
                    "forecast": "72-96 hours",
                    "indicators": ["Ice Melting", "Temperature Rise"],
                },
                {
                    "id": "5",
                    "zone": "Caribbean Basin",
                    "riskLevel": "high",
                    "confidence": 91,
                    "forecast": "24-48 hours",
                    "indicators": ["Hurricane Formation", "Wind Speed"],
                },
                {
                    "id": "6",
                    "zone": "Australian Outback",
                    "riskLevel": "moderate",
                    "confidence": 76,
                    "forecast": "3-5 days",
                    "indicators": ["Drought Conditions", "Heat Waves"],
                },
            ]
            
            await db.risk_zones.insert_many(initial_zones)
    except Exception as e:
        print(f"\nCRITICAL ERROR: Could not connect to MongoDB at {db_client.client.address}")
        print(f"Error details: {e}")
        print("Please ensure MongoDB is running: 'net start MongoDB' or start 'mongod.exe'\n")
        # In development, we allow the app to start but it will fail on DB calls

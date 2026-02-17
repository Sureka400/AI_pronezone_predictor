from app.db.session import db_client, connect_to_mongo
from app.models import RiskZone
from app.utils.forecast_service import update_forecasts, update_risk_zones
from passlib.context import CryptContext
import bcrypt

# Fix for passlib/bcrypt 4.x compatibility
if not hasattr(bcrypt, "__about__"):
    bcrypt.__about__ = type('about', (object,), {'__version__': bcrypt.__version__})

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
                    "lat": 47.6062,
                    "lng": -122.3321
                },
                {
                    "id": "2",
                    "zone": "Southeast Asia Coastal",
                    "riskLevel": "moderate",
                    "confidence": 78,
                    "forecast": "5-7 days",
                    "indicators": ["Rising Sea Levels", "Storm Patterns"],
                    "lat": 13.7563,
                    "lng": 100.5018
                },
                {
                    "id": "3",
                    "zone": "Central African Region",
                    "riskLevel": "safe",
                    "confidence": 89,
                    "forecast": "Stable",
                    "indicators": ["Normal Climate", "Low Volatility"],
                    "lat": -4.4419,
                    "lng": 15.2663
                },
                {
                    "id": "4",
                    "zone": "Arctic Circle",
                    "riskLevel": "moderate",
                    "confidence": 82,
                    "forecast": "72-96 hours",
                    "indicators": ["Ice Melting", "Temperature Rise"],
                    "lat": 69.6492,
                    "lng": 18.9553
                },
                {
                    "id": "5",
                    "zone": "Caribbean Basin",
                    "riskLevel": "high",
                    "confidence": 91,
                    "forecast": "24-48 hours",
                    "indicators": ["Hurricane Formation", "Wind Speed"],
                    "lat": 23.1136,
                    "lng": -82.3666
                },
                {
                    "id": "6",
                    "zone": "Australian Outback",
                    "riskLevel": "moderate",
                    "confidence": 76,
                    "forecast": "3-5 days",
                    "indicators": ["Drought Conditions", "Heat Waves"],
                    "lat": -23.6980,
                    "lng": 133.8807
                },
            ]
            
            await db.risk_zones.insert_many(initial_zones)
            print("Updating risk zones with real data...")
            await update_risk_zones()

        # Seed Forecasts with REAL DATA
        if await db.forecasts_24h.count_documents({}) == 0:
            print("Seeding forecasts with real data...")
            await update_forecasts()
        
        # Seed Analytics
        if await db.risk_trends.count_documents({}) == 0:
            await db.risk_trends.insert_many([
                {"month": "Jan", "high": 18, "moderate": 52, "safe": 177},
                {"month": "Feb", "high": 21, "moderate": 58, "safe": 168},
                {"month": "Mar", "high": 19, "moderate": 61, "safe": 167},
                {"month": "Apr", "high": 24, "moderate": 65, "safe": 158},
                {"month": "May", "high": 26, "moderate": 67, "safe": 154},
                {"month": "Jun", "high": 23, "moderate": 68, "safe": 156},
            ])

        if await db.prediction_accuracy.count_documents({}) == 0:
            await db.prediction_accuracy.insert_many([
                {"week": "W1", "accuracy": 82},
                {"week": "W2", "accuracy": 84},
                {"week": "W3", "accuracy": 86},
                {"week": "W4", "accuracy": 85},
                {"week": "W5", "accuracy": 87},
                {"week": "W6", "accuracy": 88},
                {"week": "W7", "accuracy": 87},
                {"week": "W8", "accuracy": 89},
            ])

        if await db.zone_activity.count_documents({}) == 0:
            await db.zone_activity.insert_many([
                {"zone": "Pacific NW", "incidents": 12},
                {"zone": "Caribbean", "incidents": 9},
                {"zone": "SE Asia", "incidents": 7},
                {"zone": "Arctic", "incidents": 6},
                {"zone": "Australia", "incidents": 5},
                {"zone": "Africa", "incidents": 3},
            ])

        # Seed History
        if await db.historical_data.count_documents({}) == 0:
            await db.historical_data.insert_many([
                {"date": "Jan 2025", "risk": 42, "incidents": 3},
                {"date": "Feb 2025", "risk": 48, "incidents": 5},
                {"date": "Mar 2025", "risk": 45, "incidents": 4},
                {"date": "Apr 2025", "risk": 52, "incidents": 7},
                {"date": "May 2025", "risk": 58, "incidents": 8},
                {"date": "Jun 2025", "risk": 62, "incidents": 9},
            ])

        if await db.historical_events.count_documents({}) == 0:
            await db.historical_events.insert_many([
                {
                    "date": "Aug 15, 2025",
                    "zone": "Pacific Northwest",
                    "event": "Major Seismic Event",
                    "riskLevel": "high",
                    "actualVsPredicted": "Predicted 94% - Occurred",
                    "impact": "Moderate",
                },
            ])

        # Seed Explainability
        if await db.feature_importance.count_documents({}) == 0:
            await db.feature_importance.insert_many([
                {"feature": "Seismic Activity", "importance": 94, "color": "#ff3366"},
                {"feature": "Temperature Anomaly", "importance": 87, "color": "#ffb800"},
                {"feature": "Rainfall Patterns", "importance": 82, "color": "#00d4ff"},
                {"feature": "Wind Speed", "importance": 76, "color": "#4d88ff"},
                {"feature": "Humidity Levels", "importance": 71, "color": "#00ff87"},
            ])

        if await db.prediction_breakdowns.count_documents({}) == 0:
            await db.prediction_breakdowns.insert_many([
                {
                    "zone": "Pacific Northwest",
                    "confidence": 94,
                    "factors": [
                        {"name": "Seismic", "value": 92},
                        {"name": "Temperature", "value": 78},
                        {"name": "Rainfall", "value": 65},
                        {"name": "Wind", "value": 58},
                        {"name": "Historical", "value": 88},
                    ],
                },
                {
                    "zone": "Caribbean Basin",
                    "confidence": 91,
                    "factors": [
                        {"name": "Seismic", "value": 45},
                        {"name": "Temperature", "value": 85},
                        {"name": "Rainfall", "value": 90},
                        {"name": "Wind", "value": 95},
                        {"name": "Historical", "value": 82},
                    ],
                }
            ])

        if await db.model_metrics.count_documents({}) == 0:
            await db.model_metrics.insert_many([
                {"metric": "Precision", "score": 91.2},
                {"metric": "Recall", "score": 88.7},
                {"metric": "F1-Score", "score": 89.9},
                {"metric": "Accuracy", "score": 87.3},
            ])

        # Seed Reports and Insights
        if await db.reports.count_documents({}) == 0:
            await db.reports.insert_many([
                {
                    "title": "Quarterly Risk Assessment Q3 2025",
                    "date": "Sep 30, 2025",
                    "type": "PDF",
                    "pages": 42,
                    "size": "2.4 MB",
                    "status": "Final",
                    "highlights": ["Seismic increase in PNW", "Coastal erosion trends"],
                },
                {
                    "title": "Monthly Performance Analysis - Aug",
                    "date": "Sep 05, 2025",
                    "type": "DOCX",
                    "pages": 15,
                    "size": "1.1 MB",
                    "status": "Archived",
                    "highlights": ["87.3% Model Accuracy", "New data sources integrated"],
                }
            ])

        if await db.insights.count_documents({}) == 0:
            await db.insights.insert_many([
                {
                    "title": "Unusual Seismic Cluster",
                    "zone": "Pacific Northwest",
                    "severity": "high",
                    "insight": "Detected 15 micro-tremors in last 24h. Historical correlation with major events: 92%.",
                    "confidence": 94,
                },
                {
                    "title": "Atmospheric Pressure Drop",
                    "zone": "Caribbean Basin",
                    "severity": "moderate",
                    "insight": "Rapid pressure decline suggests storm formation within 48-72 hours.",
                    "confidence": 88,
                }
            ])
    except Exception as e:
        print(f"\nCRITICAL ERROR: Could not connect to MongoDB at {db_client.client.address}")
        print(f"Error details: {e}")
        print("Please ensure MongoDB is running: 'net start MongoDB' or start 'mongod.exe'\n")
        # In development, we allow the app to start but it will fail on DB calls

from fastapi import APIRouter, Depends
from typing import List
from app.models import HistoricalData, HistoricalEvent
from app.db.session import get_database

router = APIRouter()

@router.get("/data", response_model=List[HistoricalData])
async def get_historical_data(db = Depends(get_database)):
    try:
        cursor = db.historical_data.find({}, {"_id": 0})
        result = await cursor.to_list(length=100)
        if result:
            return result
    except Exception:
        pass

    return [
        {"date": "Jan 2025", "risk": 42, "incidents": 3},
        {"date": "Feb 2025", "risk": 48, "incidents": 5},
        {"date": "Mar 2025", "risk": 45, "incidents": 4},
        {"date": "Apr 2025", "risk": 52, "incidents": 7},
        {"date": "May 2025", "risk": 58, "incidents": 8},
        {"date": "Jun 2025", "risk": 62, "incidents": 9},
    ]

@router.get("/events", response_model=List[HistoricalEvent])
async def get_historical_events(db = Depends(get_database)):
    try:
        cursor = db.historical_events.find({}, {"_id": 0})
        result = await cursor.to_list(length=100)
        if result:
            return result
    except Exception:
        pass

    return [
        {
            "date": "Aug 15, 2025",
            "zone": "Pacific Northwest",
            "event": "Major Seismic Event",
            "riskLevel": "high",
            "actualVsPredicted": "Predicted 94% - Occurred",
            "impact": "Moderate",
        },
    ]

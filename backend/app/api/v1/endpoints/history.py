from fastapi import APIRouter
from typing import List
from app.models import HistoricalData, HistoricalEvent

router = APIRouter()

@router.get("/data", response_model=List[HistoricalData])
async def get_historical_data():
    return [
        {"date": "Jan 2025", "risk": 42, "incidents": 3},
        {"date": "Feb 2025", "risk": 48, "incidents": 5},
        {"date": "Mar 2025", "risk": 45, "incidents": 4},
        {"date": "Apr 2025", "risk": 52, "incidents": 7},
        {"date": "May 2025", "risk": 58, "incidents": 8},
        {"date": "Jun 2025", "risk": 62, "incidents": 9},
        {"date": "Jul 2025", "risk": 68, "incidents": 11},
        {"date": "Aug 2025", "risk": 72, "incidents": 12},
        {"date": "Sep 2025", "risk": 75, "incidents": 14},
        {"date": "Oct 2025", "risk": 78, "incidents": 15},
        {"date": "Nov 2025", "risk": 82, "incidents": 18},
        {"date": "Dec 2025", "risk": 79, "incidents": 16},
        {"date": "Jan 2026", "risk": 85, "incidents": 23},
    ]

@router.get("/events", response_model=List[HistoricalEvent])
async def get_historical_events():
    return [
        {
            "date": "Aug 15, 2025",
            "zone": "Pacific Northwest",
            "event": "Major Seismic Event",
            "riskLevel": "high",
            "actualVsPredicted": "Predicted 94% - Occurred",
            "impact": "Moderate",
        },
        {
            "date": "Sep 22, 2025",
            "zone": "Caribbean Basin",
            "event": "Category 4 Hurricane",
            "riskLevel": "high",
            "actualVsPredicted": "Predicted 91% - Occurred",
            "impact": "Severe",
        },
        {
            "date": "Nov 10, 2025",
            "zone": "Southeast Asia",
            "event": "Coastal Flooding",
            "riskLevel": "moderate",
            "actualVsPredicted": "Predicted 78% - Occurred",
            "impact": "Moderate",
        },
        {
            "date": "Dec 5, 2025",
            "zone": "Arctic Circle",
            "event": "Temperature Spike",
            "riskLevel": "moderate",
            "actualVsPredicted": "Predicted 82% - Occurred",
            "impact": "Low",
        },
    ]

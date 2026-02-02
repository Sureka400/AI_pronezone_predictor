from fastapi import APIRouter
from typing import List
from app.models import Forecast24h, Forecast3day, Forecast7day

router = APIRouter()

@router.get("/24h", response_model=List[Forecast24h])
async def get_forecast_24h():
    return [
        {"hour": "00:00", "risk": 35, "confidence": 88},
        {"hour": "04:00", "risk": 42, "confidence": 86},
        {"hour": "08:00", "risk": 58, "confidence": 84},
        {"hour": "12:00", "risk": 72, "confidence": 82},
        {"hour": "16:00", "risk": 81, "confidence": 85},
        {"hour": "20:00", "risk": 76, "confidence": 87},
        {"hour": "24:00", "risk": 65, "confidence": 89},
    ]

@router.get("/3day", response_model=List[Forecast3day])
async def get_forecast_3day():
    return [
        {"day": "Today", "safe": 156, "moderate": 68, "high": 23},
        {"day": "Day 2", "safe": 142, "moderate": 76, "high": 29},
        {"day": "Day 3", "safe": 135, "moderate": 81, "high": 31},
    ]

@router.get("/7day", response_model=List[Forecast7day])
async def get_forecast_7day():
    return [
        {"day": "Mon", "riskIndex": 42, "trend": "stable"},
        {"day": "Tue", "riskIndex": 48, "trend": "rising"},
        {"day": "Wed", "riskIndex": 55, "trend": "rising"},
        {"day": "Thu", "riskIndex": 62, "trend": "rising"},
        {"day": "Fri", "riskIndex": 71, "trend": "critical"},
        {"day": "Sat", "riskIndex": 68, "trend": "declining"},
        {"day": "Sun", "riskIndex": 59, "trend": "declining"},
    ]

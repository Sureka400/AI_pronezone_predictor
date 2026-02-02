from fastapi import APIRouter
from typing import List
from app.models import RiskTrend, PredictionAccuracy, ZoneActivity

router = APIRouter()

@router.get("/risk-trend", response_model=List[RiskTrend])
async def get_risk_trend():
    return [
        {"month": "Jan", "high": 18, "moderate": 52, "safe": 177},
        {"month": "Feb", "high": 21, "moderate": 58, "safe": 168},
        {"month": "Mar", "high": 19, "moderate": 61, "safe": 167},
        {"month": "Apr", "high": 24, "moderate": 65, "safe": 158},
        {"month": "May", "high": 26, "moderate": 67, "safe": 154},
        {"month": "Jun", "high": 23, "moderate": 68, "safe": 156},
    ]

@router.get("/accuracy", response_model=List[PredictionAccuracy])
async def get_prediction_accuracy():
    return [
        {"week": "W1", "accuracy": 82},
        {"week": "W2", "accuracy": 84},
        {"week": "W3", "accuracy": 86},
        {"week": "W4", "accuracy": 85},
        {"week": "W5", "accuracy": 87},
        {"week": "W6", "accuracy": 88},
        {"week": "W7", "accuracy": 87},
        {"week": "W8", "accuracy": 89},
    ]

@router.get("/zone-activity", response_model=List[ZoneActivity])
async def get_zone_activity():
    return [
        {"zone": "Pacific NW", "incidents": 12},
        {"zone": "Caribbean", "incidents": 9},
        {"zone": "SE Asia", "incidents": 7},
        {"zone": "Arctic", "incidents": 6},
        {"zone": "Australia", "incidents": 5},
        {"zone": "Africa", "incidents": 3},
    ]

from fastapi import APIRouter
from typing import List
from app.models import ZoneComparison, ComparisonTrend

router = APIRouter()

@router.get("/zones", response_model=List[ZoneComparison])
async def get_zone_comparison():
    return [
        {
            "zone": "Pacific Northwest",
            "riskLevel": "high",
            "confidence": 94,
            "population": "14.2M",
            "riskIndex": 85,
            "trend": "+12%",
            "escalationSpeed": "Fast",
            "factors": [
                {"metric": "Seismic", "value": 92},
                {"metric": "Temperature", "value": 78},
                {"metric": "Rainfall", "value": 65},
                {"metric": "Wind", "value": 58},
                {"metric": "Historical", "value": 88},
            ],
        },
        {
            "zone": "Caribbean Basin",
            "riskLevel": "high",
            "confidence": 91,
            "population": "43.7M",
            "riskIndex": 82,
            "trend": "+18%",
            "escalationSpeed": "Critical",
            "factors": [
                {"metric": "Seismic", "value": 45},
                {"metric": "Temperature", "value": 85},
                {"metric": "Rainfall", "value": 90},
                {"metric": "Wind", "value": 95},
                {"metric": "Historical", "value": 82},
            ],
        },
        {
            "zone": "Arctic Circle",
            "riskLevel": "moderate",
            "confidence": 82,
            "population": "4.3M",
            "riskIndex": 62,
            "trend": "+8%",
            "escalationSpeed": "Moderate",
            "factors": [
                {"metric": "Seismic", "value": 25},
                {"metric": "Temperature", "value": 95},
                {"metric": "Rainfall", "value": 55},
                {"metric": "Wind", "value": 68},
                {"metric": "Historical", "value": 72},
            ],
        },
    ]

@router.get("/trend", response_model=List[ComparisonTrend])
async def get_comparison_trend():
    return [
        {"week": "W1", "pnw": 65, "caribbean": 58, "arctic": 52},
        {"week": "W2", "pnw": 68, "caribbean": 62, "arctic": 54},
        {"week": "W3", "pnw": 72, "caribbean": 68, "arctic": 56},
        {"week": "W4", "pnw": 78, "caribbean": 74, "arctic": 59},
        {"week": "W5", "pnw": 82, "caribbean": 78, "arctic": 60},
        {"week": "W6", "pnw": 85, "caribbean": 82, "arctic": 62},
    ]

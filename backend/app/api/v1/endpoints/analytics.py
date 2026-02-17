from fastapi import APIRouter, Depends
from typing import List
from app.models import RiskTrend, PredictionAccuracy, ZoneActivity, SystemStatus
from app.db.session import get_database

router = APIRouter()

@router.get("/status", response_model=SystemStatus)
async def get_system_status(db = Depends(get_database)):
    # In a real app, these would come from monitoring or logs
    return {
        "modelAccuracy": "87.3%",
        "predictionsPerHour": "1,247",
        "avgResponseTime": "1.2s",
        "status": "Operational"
    }

@router.get("/risk-trend", response_model=List[RiskTrend])
async def get_risk_trend(db = Depends(get_database)):
    cursor = db.risk_trends.find({}, {"_id": 0})
    return await cursor.to_list(length=100)

@router.get("/accuracy", response_model=List[PredictionAccuracy])
async def get_prediction_accuracy(db = Depends(get_database)):
    cursor = db.prediction_accuracy.find({}, {"_id": 0})
    return await cursor.to_list(length=100)

@router.get("/zone-activity", response_model=List[ZoneActivity])
async def get_zone_activity(db = Depends(get_database)):
    cursor = db.zone_activity.find({}, {"_id": 0})
    return await cursor.to_list(length=100)

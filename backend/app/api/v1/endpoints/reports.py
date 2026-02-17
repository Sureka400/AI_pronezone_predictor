from fastapi import APIRouter, Depends
from typing import List
from app.models import Report, Insight
from app.db.session import get_database

router = APIRouter()

@router.get("/", response_model=List[Report])
async def get_reports(db = Depends(get_database)):
    cursor = db.reports.find({}, {"_id": 0})
    result = await cursor.to_list(length=100)
    if not result:
        return [
            {
                "title": "Monthly Risk Assessment Report",
                "date": "January 2026",
                "type": "Executive Summary",
                "pages": 24,
                "size": "3.2 MB",
                "status": "Ready",
                "highlights": ["23 high-risk zones identified", "87.3% prediction accuracy", "12% increase in moderate zones"],
            }
        ]
    return result

@router.get("/insights", response_model=List[Insight])
async def get_insights(db = Depends(get_database)):
    cursor = db.insights.find({}, {"_id": 0})
    result = await cursor.to_list(length=100)
    if not result:
        return [
            {
                "title": "Seismic Activity Surge",
                "zone": "Pacific Northwest",
                "severity": "high",
                "insight": "Detected 3.2x increase in seismic readings over baseline. Historical correlation suggests major event probability within 72 hours.",
                "confidence": 94,
            }
        ]
    return result

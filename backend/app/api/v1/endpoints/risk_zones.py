from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from typing import List
from app.models import RiskZone, User
from app.db.session import get_database
from app.api.v1.endpoints.auth import get_current_user
from app.utils.forecast_service import update_risk_zones
import datetime

router = APIRouter()

@router.post("/refresh")
async def refresh_risk_data(
    background_tasks: BackgroundTasks,
    db = Depends(get_database),
    current_user: User = Depends(get_current_user)
):
    """
    Trigger a refresh of risk zone data from external APIs.
    """
    background_tasks.add_task(update_risk_zones)
    return {"message": "Data refresh started in background"}

@router.get("/", response_model=List[RiskZone])
async def get_risk_zones(db = Depends(get_database)):
    cursor = db.risk_zones.find({}, {"_id": 0})
    zones = await cursor.to_list(length=100)
    return zones

@router.get("/{zone_id}", response_model=RiskZone)
async def get_risk_zone(zone_id: str, db = Depends(get_database)):
    zone = await db.risk_zones.find_one({"id": zone_id}, {"_id": 0})
    if not zone:
        raise HTTPException(status_code=404, detail="Risk zone not found")
    return zone

@router.post("/", response_model=RiskZone)
async def create_risk_zone(
    zone: RiskZone, 
    db = Depends(get_database),
    current_user: User = Depends(get_current_user)
):
    # Check if exists
    existing = await db.risk_zones.find_one({"id": zone.id})
    if existing:
        raise HTTPException(status_code=400, detail="Risk zone with this ID already exists")
    
    zone_dict = zone.dict()
    await db.risk_zones.insert_one(zone_dict)
    return zone_dict

@router.put("/{zone_id}", response_model=RiskZone)
async def update_risk_zone(
    zone_id: str, 
    zone: RiskZone, 
    db = Depends(get_database),
    current_user: User = Depends(get_current_user)
):
    update_result = await db.risk_zones.update_one(
        {"id": zone_id}, {"$set": zone.dict()}
    )
    if update_result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Risk zone not found or no changes made")
    return zone

@router.delete("/{zone_id}")
async def delete_risk_zone(
    zone_id: str, 
    db = Depends(get_database),
    current_user: User = Depends(get_current_user)
):
    delete_result = await db.risk_zones.delete_one({"id": zone_id})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Risk zone not found")
    return {"message": "Risk zone deleted successfully"}

from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models import Forecast24h, Forecast3day, Forecast7day
from app.db.session import get_database
from app.utils.forecast_service import update_forecasts

router = APIRouter()

@router.get("/24h", response_model=List[Forecast24h])
async def get_forecast_24h(db = Depends(get_database)):
    cursor = db.forecasts_24h.find({}, {"_id": 0})
    result = await cursor.to_list(length=100)
    if result:
        return result
    
    # If no data in DB, try to update
    await update_forecasts()
    cursor = db.forecasts_24h.find({}, {"_id": 0})
    result = await cursor.to_list(length=100)
    return result if result else []

@router.get("/3day", response_model=List[Forecast3day])
async def get_forecast_3day(db = Depends(get_database)):
    cursor = db.forecasts_3day.find({}, {"_id": 0})
    result = await cursor.to_list(length=100)
    if result:
        return result

    # If no data in DB, try to update
    await update_forecasts()
    cursor = db.forecasts_3day.find({}, {"_id": 0})
    result = await cursor.to_list(length=100)
    return result if result else []

@router.get("/7day", response_model=List[Forecast7day])
async def get_forecast_7day(db = Depends(get_database)):
    cursor = db.forecasts_7day.find({}, {"_id": 0})
    result = await cursor.to_list(length=100)
    if result:
        return result

    # If no data in DB, try to update
    await update_forecasts()
    cursor = db.forecasts_7day.find({}, {"_id": 0})
    result = await cursor.to_list(length=100)
    return result if result else []

@router.post("/refresh")
async def refresh_forecasts():
    try:
        await update_forecasts()
        return {"message": "Forecasts updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

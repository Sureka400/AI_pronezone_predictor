from fastapi import APIRouter, HTTPException
from app.schemas.prediction import PredictionInput, PredictionOutput
from app.utils.prediction import model_handler

router = APIRouter()

@router.post("/", response_model=PredictionOutput)
async def predict_risk(data: PredictionInput):
    try:
        prediction, confidence = model_handler.predict(data.dict())
        return {
            "risk_level": prediction,
            "confidence": confidence
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

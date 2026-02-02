from fastapi import APIRouter
from typing import List
from app.models import FeatureImportance, PredictionBreakdown, ModelMetric

router = APIRouter()

@router.get("/feature-importance", response_model=List[FeatureImportance])
async def get_feature_importance():
    return [
        {"feature": "Seismic Activity", "importance": 94, "color": "#ff3366"},
        {"feature": "Temperature Anomaly", "importance": 87, "color": "#ffb800"},
        {"feature": "Rainfall Patterns", "importance": 82, "color": "#00d4ff"},
        {"feature": "Wind Speed", "importance": 76, "color": "#4d88ff"},
        {"feature": "Humidity Levels", "importance": 71, "color": "#00ff87"},
        {"feature": "Atmospheric Pressure", "importance": 68, "color": "#ff9800"},
        {"feature": "Historical Data", "importance": 85, "color": "#00d4ff"},
        {"feature": "Population Density", "importance": 63, "color": "#9c27b0"},
    ]

@router.get("/prediction-breakdown", response_model=List[PredictionBreakdown])
async def get_prediction_breakdown():
    return [
        {
            "zone": "Pacific Northwest",
            "confidence": 94,
            "factors": [
                {"name": "Seismic", "value": 92},
                {"name": "Temperature", "value": 78},
                {"name": "Rainfall", "value": 65},
                {"name": "Wind", "value": 58},
                {"name": "Historical", "value": 88},
            ],
        },
    ]

@router.get("/model-metrics", response_model=List[ModelMetric])
async def get_model_metrics():
    return [
        {"metric": "Precision", "score": 91.2},
        {"metric": "Recall", "score": 88.7},
        {"metric": "F1-Score", "score": 89.9},
        {"metric": "Accuracy", "score": 87.3},
    ]

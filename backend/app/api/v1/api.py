from fastapi import APIRouter
from app.api.v1.endpoints import (
    risk_zones,
    forecast,
    history,
    analytics,
    explain,
    reports,
    access,
    comparison,
    auth
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(risk_zones.router, prefix="/risk-zones", tags=["risk-zones"])
api_router.include_router(forecast.router, prefix="/forecast", tags=["forecast"])
api_router.include_router(history.router, prefix="/history", tags=["history"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(explain.router, prefix="/explain", tags=["explain"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(access.router, prefix="/access", tags=["access"])
api_router.include_router(comparison.router, prefix="/comparison", tags=["comparison"])

from fastapi import APIRouter
from typing import List
from app.models import Report, Insight

router = APIRouter()

@router.get("/", response_model=List[Report])
async def get_reports():
    return [
        {
            "title": "Monthly Risk Assessment Report",
            "date": "January 2026",
            "type": "Executive Summary",
            "pages": 24,
            "size": "3.2 MB",
            "status": "Ready",
            "highlights": ["23 high-risk zones identified", "87.3% prediction accuracy", "12% increase in moderate zones"],
        },
        {
            "title": "Zone-Wise Prediction Analytics",
            "date": "December 2025",
            "type": "Technical Analysis",
            "pages": 45,
            "size": "5.8 MB",
            "status": "Ready",
            "highlights": ["Detailed zone breakdowns", "ML model performance metrics", "Feature importance analysis"],
        },
        {
            "title": "Q4 2025 Risk Trends",
            "date": "Q4 2025",
            "type": "Quarterly Report",
            "pages": 38,
            "size": "4.5 MB",
            "status": "Ready",
            "highlights": ["Quarterly risk escalation patterns", "Seasonal trend analysis", "Forecasting accuracy"],
        },
        {
            "title": "Historical Event Validation",
            "date": "2025 Annual",
            "type": "Validation Report",
            "pages": 52,
            "size": "6.1 MB",
            "status": "Ready",
            "highlights": ["Event prediction accuracy", "False positive analysis", "Model refinement insights"],
        },
    ]

@router.get("/insights", response_model=List[Insight])
async def get_insights():
    return [
        {
            "title": "Seismic Activity Surge",
            "zone": "Pacific Northwest",
            "severity": "high",
            "insight": "Detected 3.2x increase in seismic readings over baseline. Historical correlation suggests major event probability within 72 hours.",
            "confidence": 94,
        },
        {
            "title": "Temperature Anomalies",
            "zone": "Arctic Circle",
            "severity": "moderate",
            "insight": "Average temperature deviation of +4.7°C from seasonal norms. Ice melting acceleration detected.",
            "confidence": 82,
        },
        {
            "title": "Hurricane Formation",
            "zone": "Caribbean Basin",
            "severity": "high",
            "insight": "Category 3-4 hurricane development confirmed. Wind speeds reaching critical thresholds.",
            "confidence": 91,
        },
        {
            "title": "Monsoon Pattern Shift",
            "zone": "Southeast Asia",
            "severity": "moderate",
            "insight": "Unusual monsoon behavior observed. Moderate flooding risk elevated in coastal regions.",
            "confidence": 78,
        },
    ]

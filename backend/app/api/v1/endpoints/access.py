from fastapi import APIRouter
from typing import List
from app.models import Role, ActivityLog

router = APIRouter()

@router.get("/roles", response_model=List[Role])
async def get_roles():
    return [
        {
            "name": "Administrator",
            "level": "full",
            "users": 3,
            "permissions": [
                "Full system access",
                "User management",
                "Configuration control",
                "Data export (unrestricted)",
                "Alert configuration",
                "Report generation",
            ],
            "color": "#ff3366",
        },
        {
            "name": "Analyst",
            "level": "advanced",
            "users": 12,
            "permissions": [
                "View all dashboards",
                "Generate reports",
                "Export data (restricted)",
                "Create custom views",
                "Access historical data",
            ],
            "color": "#00d4ff",
        },
        {
            "name": "Viewer",
            "level": "basic",
            "users": 47,
            "permissions": [
                "View dashboards (read-only)",
                "Access forecasting data",
                "View reports",
                "Basic alert notifications",
            ],
            "color": "#00ff87",
        },
    ]

@router.get("/activity-log", response_model=List[ActivityLog])
async def get_activity_log():
    return [
        {"user": "Admin Sarah K.", "action": "Generated monthly report", "role": "Administrator", "time": "5 min ago"},
        {"user": "Analyst Mike T.", "action": "Viewed Pacific NW zone details", "role": "Analyst", "time": "12 min ago"},
        {"user": "Viewer John D.", "action": "Accessed risk dashboard", "role": "Viewer", "time": "18 min ago"},
        {"user": "Admin David L.", "action": "Modified alert thresholds", "role": "Administrator", "time": "1 hour ago"},
        {"user": "Analyst Emma R.", "action": "Exported zone comparison data", "role": "Analyst", "time": "2 hours ago"},
    ]

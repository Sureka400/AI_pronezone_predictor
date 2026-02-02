from pydantic import BaseModel
from typing import List, Optional

class RiskZone(BaseModel):
    id: str
    zone: str
    riskLevel: str
    confidence: int
    forecast: str
    indicators: List[str]

class Forecast24h(BaseModel):
    hour: str
    risk: int
    confidence: int

class Forecast3day(BaseModel):
    day: str
    safe: int
    moderate: int
    high: int

class Forecast7day(BaseModel):
    day: str
    riskIndex: int
    trend: str

class HistoricalData(BaseModel):
    date: str
    risk: int
    incidents: int

class HistoricalEvent(BaseModel):
    date: str
    zone: str
    event: str
    riskLevel: str
    actualVsPredicted: str
    impact: str

class RiskTrend(BaseModel):
    month: str
    high: int
    moderate: int
    safe: int

class PredictionAccuracy(BaseModel):
    week: str
    accuracy: int

class ZoneActivity(BaseModel):
    zone: str
    incidents: int

class FeatureImportance(BaseModel):
    feature: str
    importance: int
    color: str

class Factor(BaseModel):
    name: Optional[str] = None
    metric: Optional[str] = None
    value: int

class PredictionBreakdown(BaseModel):
    zone: str
    confidence: int
    factors: List[Factor]

class ModelMetric(BaseModel):
    metric: str
    score: float

class Report(BaseModel):
    title: str
    date: str
    type: str
    pages: int
    size: str
    status: str
    highlights: List[str]

class Insight(BaseModel):
    title: str
    zone: str
    severity: str
    insight: str
    confidence: int

class Role(BaseModel):
    name: str
    level: str
    users: int
    permissions: List[str]
    color: str

class ActivityLog(BaseModel):
    user: str
    action: str
    role: str
    time: str

class ZoneComparison(BaseModel):
    zone: str
    riskLevel: str
    confidence: int
    population: str
    riskIndex: int
    trend: str
    escalationSpeed: str
    factors: List[Factor]

class ComparisonTrend(BaseModel):
    week: str
    pnw: int
    caribbean: int
    arctic: int

class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

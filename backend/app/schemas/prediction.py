from pydantic import BaseModel

class PredictionInput(BaseModel):
    temperature_celsius: float
    feels_like_celsius: float
    humidity: float
    precip_mm: float
    wind_kph: float
    cloud: float
    risk_cluster: int

class PredictionOutput(BaseModel):
    risk_level: str
    confidence: float

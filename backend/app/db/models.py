from sqlalchemy import Column, Integer, String, Float, JSON
from app.db.session import Base

class RiskZoneDB(Base):
    __tablename__ = "risk_zones"

    id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(String, unique=True, index=True)
    zone = Column(String)
    risk_level = Column(String)
    confidence = Column(Integer)
    forecast = Column(String)
    indicators = Column(JSON)

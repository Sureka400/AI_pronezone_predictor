import os
import httpx
from typing import List, Dict, Any
from dotenv import load_dotenv

load_dotenv()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
USGS_API_BASE_URL = os.getenv("USGS_API_BASE_URL", "https://earthquake.usgs.gov/fdsnws/event/1/query")

async def fetch_weather_data(city: str) -> Dict[str, Any]:
    """
    Fetch current weather data for a city using OpenWeatherMap API.
    """
    if not OPENWEATHER_API_KEY or OPENWEATHER_API_KEY == "your_openweathermap_api_key":
        return {"error": "OpenWeatherMap API key not configured"}
    
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP error occurred: {e.response.status_code}"}
        except Exception as e:
            return {"error": f"An error occurred: {str(e)}"}

async def fetch_forecast_data(city: str) -> Dict[str, Any]:
    """
    Fetch 5-day / 3-hour forecast data for a city using OpenWeatherMap API.
    """
    if not OPENWEATHER_API_KEY or OPENWEATHER_API_KEY == "your_openweathermap_api_key":
        return {"error": "OpenWeatherMap API key not configured"}
    
    url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP error occurred: {e.response.status_code}"}
        except Exception as e:
            return {"error": f"An error occurred: {str(e)}"}

async def fetch_seismic_data(starttime: str, endtime: str, minmagnitude: float = 2.5) -> Dict[str, Any]:
    """
    Fetch seismic data from USGS for a given time period and minimum magnitude.
    """
    params = {
        "format": "geojson",
        "starttime": starttime,
        "endtime": endtime,
        "minmagnitude": minmagnitude
    }
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(USGS_API_BASE_URL, params=params)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP error occurred: {e.response.status_code}"}
        except Exception as e:
            return {"error": f"An error occurred: {str(e)}"}

async def get_real_time_indicators(zone_name: str) -> List[str]:
    """
    Example function to get real-time indicators based on external data.
    In a real scenario, this would analyze the fetched data to determine indicators.
    """
    # This is a simplified implementation
    indicators = []
    
    # Map zone name to city/region for weather/seismic data
    zone_mapping = {
        "Pacific Northwest": {"city": "Seattle", "coords": [47.6, -122.3]},
        "Southeast Asia Coastal": {"city": "Bangkok", "coords": [13.7, 100.5]},
        "Caribbean Basin": {"city": "Havana", "coords": [23.1, -82.3]},
    }
    
    mapping = zone_mapping.get(zone_name)
    if mapping:
        # Fetch weather (example: check for high wind or rain)
        weather = await fetch_weather_data(mapping["city"])
        if "wind" in weather and weather["wind"].get("speed", 0) > 10:
            indicators.append("High Wind Speed")
        if "weather" in weather and any(w["main"] == "Rain" for w in weather["weather"]):
            indicators.append("Heavy Rainfall")
            
        # Fetch seismic (example: check for recent earthquakes nearby)
        # Note: In a real app, we'd use coordinates to filter USGS data
    
    return indicators if indicators else ["Normal Conditions"]

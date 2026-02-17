from datetime import datetime, timedelta
from typing import List, Dict, Any
from app.utils.external_api import fetch_forecast_data, fetch_weather_data, get_real_time_indicators
from app.utils.prediction import model_handler
from app.db.session import db_client

ZONE_CITY_MAPPING = {
    "Pacific Northwest": {"city": "Seattle", "pop": "4.1M", "lat": 47.6062, "lng": -122.3321},
    "Southeast Asia Coastal": {"city": "Bangkok", "pop": "10.7M", "lat": 13.7563, "lng": 100.5018},
    "Caribbean Basin": {"city": "Havana", "pop": "2.1M", "lat": 23.1136, "lng": -82.3666},
    "Central African Region": {"city": "Kinshasa", "pop": "17.0M", "lat": -4.4419, "lng": 15.2663},
    "Arctic Circle": {"city": "Tromso", "pop": "77k", "lat": 69.6492, "lng": 18.9553},
    "Australian Outback": {"city": "Alice Springs", "pop": "25k", "lat": -23.6980, "lng": 133.8807}
}

async def update_risk_zones():
    db = db_client.db
    if not db:
        return

    cursor = db.risk_zones.find({})
    zones = await cursor.to_list(length=100)
    
    for zone in zones:
        mapping = ZONE_CITY_MAPPING.get(zone["zone"])
        if not mapping:
            continue
            
        city = mapping["city"]
        weather = await fetch_weather_data(city)
        if "main" not in weather:
            continue

        precip = 0
        if "rain" in weather:
            precip = weather["rain"].get("1h", 0)
        elif "snow" in weather:
            precip = weather["snow"].get("1h", 0)

        input_data = {
            "temperature_celsius": weather["main"]["temp"],
            "feels_like_celsius": weather["main"]["feels_like"],
            "humidity": weather["main"]["humidity"],
            "precip_mm": precip,
            "wind_kph": weather["wind"]["speed"] * 3.6,
            "cloud": weather["clouds"]["all"],
            "risk_cluster": 0
        }
        
        try:
            prediction, confidence = model_handler.predict(input_data)
            
            risk_levels = ["safe", "moderate", "high", "critical"]
            risk_level = risk_levels[min(int(prediction), 3)]
            
            indicators = await get_real_time_indicators(zone["zone"])
            
            await db.risk_zones.update_one(
                {"id": zone["id"]},
                {"$set": {
                    "riskLevel": risk_level,
                    "confidence": int(confidence * 100),
                    "indicators": indicators,
                    "population": mapping["pop"],
                    "lat": mapping["lat"],
                    "lng": mapping["lng"],
                    "lastUpdate": datetime.now().strftime("%I:%M %p")
                }}
            )
        except Exception as e:
            print(f"Error updating zone {zone['zone']}: {e}")

async def update_forecasts():
    db = db_client.db
    if not db:
        print("Database not connected")
        return

    all_predictions = []
    
    for zone, mapping in ZONE_CITY_MAPPING.items():
        city = mapping["city"]
        forecast_data = await fetch_forecast_data(city)
        if "list" not in forecast_data:
            print(f"Error fetching forecast for {city}: {forecast_data.get('error', 'Unknown error')}")
            continue
        
        for item in forecast_data["list"]:
            # Prepare input for model
            # features = ['temperature_celsius', 'feels_like_celsius', 'humidity', 
            #             'precip_mm', 'wind_kph', 'cloud', 'risk_cluster']
            
            # Note: risk_cluster is expected by the model but not used for prediction (only first 6)
            # precip_mm: openweather provides 'rain' or 'snow' objects
            precip = 0
            if "rain" in item:
                precip = item["rain"].get("3h", 0)
            elif "snow" in item:
                precip = item["snow"].get("3h", 0)

            input_data = {
                "temperature_celsius": item["main"]["temp"],
                "feels_like_celsius": item["main"]["feels_like"],
                "humidity": item["main"]["humidity"],
                "precip_mm": precip,
                "wind_kph": item["wind"]["speed"] * 3.6, # convert m/s to kph
                "cloud": item["clouds"]["all"],
                "risk_cluster": 0 # Placeholder
            }
            
            try:
                prediction, confidence = model_handler.predict(input_data)
                
                all_predictions.append({
                    "zone": zone,
                    "timestamp": item["dt"],
                    "dt_txt": item["dt_txt"],
                    "risk_level": int(prediction),
                    "confidence": int(confidence * 100)
                })
            except Exception as e:
                print(f"Prediction error for {zone}: {e}")

    if not all_predictions:
        return

    # 1. 24h Forecast (Aggregate first 8 slots - 24 hours)
    # We'll take the average risk across zones for each time slot
    forecast_24h = []
    time_slots = sorted(list(set(p["dt_txt"] for p in all_predictions)))[:7] # Take 7 slots for the chart
    
    for ts in time_slots:
        slot_predictions = [p for p in all_predictions if p["dt_txt"] == ts]
        avg_risk = sum(p["risk_level"] for p in slot_predictions) / len(slot_predictions)
        avg_conf = sum(p["confidence"] for p in slot_predictions) / len(slot_predictions)
        
        # Convert "2023-10-27 12:00:00" to "12:00"
        hour = ts.split(" ")[1][:5]
        
        forecast_24h.append({
            "hour": hour,
            "risk": int(avg_risk * 33), # Map 0-3 to 0-100 roughly
            "confidence": int(avg_conf)
        })

    # 2. 3day Forecast
    # Count zones in each risk category for next 3 days
    forecast_3day = []
    days = ["Today", "Tomorrow", "Day 3"]
    now = datetime.now()
    
    for i in range(3):
        target_date = (now + timedelta(days=i)).strftime("%Y-%m-%d")
        day_predictions = [p for p in all_predictions if p["dt_txt"].startswith(target_date)]
        
        if not day_predictions:
            # Fallback for "Day 3" if not enough data
            forecast_3day.append({"day": days[i], "safe": 0, "moderate": 0, "high": 0})
            continue

        safe = len([p for p in day_predictions if p["risk_level"] == 0])
        moderate = len([p for p in day_predictions if p["risk_level"] == 1])
        high = len([p for p in day_predictions if p["risk_level"] >= 2])
        
        forecast_3day.append({
            "day": days[i],
            "safe": safe,
            "moderate": moderate,
            "high": high
        })

    # 3. 7day Forecast (Actually 5 days from OpenWeather)
    forecast_7day = []
    # OpenWeather only gives 5 days, so we'll show 5 days
    day_names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    
    unique_dates = sorted(list(set(p["dt_txt"].split(" ")[0] for p in all_predictions)))
    
    for date_str in unique_dates:
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        day_name = day_names[date_obj.weekday()]
        
        day_preds = [p for p in all_predictions if p["dt_txt"].startswith(date_str)]
        avg_risk = sum(p["risk_level"] for p in day_preds) / len(day_preds)
        
        risk_index = int(avg_risk * 33)
        trend = "stable"
        if risk_index > 60: trend = "critical"
        elif risk_index > 40: trend = "rising"
        elif risk_index < 20: trend = "declining"
        
        forecast_7day.append({
            "day": day_name,
            "riskIndex": risk_index,
            "trend": trend
        })

    # Update Database
    await db.forecasts_24h.delete_many({})
    await db.forecasts_24h.insert_many(forecast_24h)
    
    await db.forecasts_3day.delete_many({})
    await db.forecasts_3day.insert_many(forecast_3day)
    
    await db.forecasts_7day.delete_many({})
    await db.forecasts_7day.insert_many(forecast_7day)

    print("Forecasts updated successfully with real data")

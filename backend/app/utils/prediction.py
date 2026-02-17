import joblib
import pandas as pd
import os
from pathlib import Path

# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent.parent

SCALER_PATH = BASE_DIR / "scaler.pkl"
MODEL_PATH = BASE_DIR / "pronezone_model.pkl"

class ModelHandler:
    def __init__(self):
        self.scaler = None
        self.model = None
        self.load_models()

    def load_models(self):
        if SCALER_PATH.exists() and MODEL_PATH.exists():
            try:
                self.scaler = joblib.load(SCALER_PATH)
                self.model = joblib.load(MODEL_PATH)
            except Exception as e:
                print(f"Error loading models: {e}")
        else:
            print(f"Model files not found at {SCALER_PATH} or {MODEL_PATH}")

    def predict(self, input_data: dict):
        if self.scaler is None or self.model is None:
            raise Exception("Models not loaded")

        # Create DataFrame for prediction
        df = pd.DataFrame([input_data])
        
        # Ensure correct order of features
        features = ['temperature_celsius', 'feels_like_celsius', 'humidity', 
                    'precip_mm', 'wind_kph', 'cloud', 'risk_cluster']
        df = df[features]
        
        # Scale input
        scaled_data = self.scaler.transform(df)
        
        # Predict (model expects only the first 6 features)
        model_input = scaled_data[:, :6]
        prediction = self.model.predict(model_input)[0]
        
        # Get probabilities for confidence
        probabilities = self.model.predict_proba(model_input)[0]
        confidence = float(max(probabilities))
        
        return prediction, confidence

    def get_feature_importance(self):
        if self.model is None:
            return []
        
        features = ['Temperature', 'Feels Like', 'Humidity', 
                    'Precipitation', 'Wind Speed', 'Cloud Cover']
        
        importances = self.model.feature_importances_
        
        # Normalize to 0-100 scale for consistency with frontend
        max_imp = max(importances)
        normalized = [(imp / max_imp) * 100 for imp in importances]
        
        colors = ["#ff3366", "#ffb800", "#00d4ff", "#4d88ff", "#00ff87", "#9b51e0", "#f2994a"]
        
        result = []
        for i in range(len(features)):
            result.append({
                "feature": features[i],
                "importance": int(normalized[i]),
                "color": colors[i % len(colors)]
            })
        
        # Sort by importance descending
        result.sort(key=lambda x: x["importance"], reverse=True)
        return result

model_handler = ModelHandler()

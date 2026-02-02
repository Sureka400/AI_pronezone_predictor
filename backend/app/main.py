from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router
from app.db.session import connect_to_mongo, close_mongo_connection
from app.db.init_db import init_db

app = FastAPI(title="ProneZone Predictor API", version="1.0.0")

# Database connection events
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()
    await init_db()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "ProneZone Predictor API is operational", "version": "1.0.0"}

app.include_router(api_router, prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8001, reload=True)

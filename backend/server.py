from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Import routes
from routes import venues, users, bookings, services, wedding_tools, support

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="Hyderabad HallBook API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Include all route modules
api_router.include_router(venues.router)
api_router.include_router(users.router)
api_router.include_router(bookings.router)
api_router.include_router(services.router)
api_router.include_router(wedding_tools.router)
api_router.include_router(support.router)

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Hyderabad HallBook API is running!", "version": "1.0.0"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "hyderabad-hallbook-api"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("Hyderabad HallBook API starting up...")
    
@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Hyderabad HallBook API shutting down...")
    from database import db
    await db.close()
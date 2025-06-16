from fastapi import APIRouter, HTTPException
from models import Service, APIResponse
from database import db

router = APIRouter(prefix="/services", tags=["services"])

@router.get("/", response_model=APIResponse)
async def get_services():
    """Get all services with their providers"""
    try:
        services = await db.get_services()
        return APIResponse(
            success=True,
            message="Services retrieved successfully",
            data=[service.dict() for service in services]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=APIResponse)
async def create_service(service: Service):
    """Create a new service"""
    try:
        created_service = await db.create_service(service)
        return APIResponse(
            success=True,
            message="Service created successfully",
            data=created_service.dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
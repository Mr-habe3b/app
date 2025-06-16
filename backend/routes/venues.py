from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models import Venue, VenueCreate, VenueFilters, APIResponse, PaginatedResponse
from database import db

router = APIRouter(prefix="/venues", tags=["venues"])

@router.get("/", response_model=PaginatedResponse)
async def get_venues(
    budget: Optional[float] = Query(None, description="Maximum budget"),
    capacity: Optional[int] = Query(None, description="Minimum capacity"),
    availability: Optional[str] = Query(None, description="Availability status"),
    pincode: Optional[str] = Query(None, description="Pincode filter"),
    search_query: Optional[str] = Query(None, description="Search in name and location"),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(10, ge=1, le=50, description="Items per page")
):
    """Get venues with optional filters and pagination"""
    try:
        filters = VenueFilters(
            budget=budget,
            capacity=capacity,
            availability=availability,
            pincode=pincode,
            search_query=search_query
        )
        
        skip = (page - 1) * per_page
        venues = await db.get_venues(filters, skip=skip, limit=per_page)
        total = await db.get_venues_count(filters)
        total_pages = (total + per_page - 1) // per_page
        
        return PaginatedResponse(
            success=True,
            message="Venues retrieved successfully",
            data=[venue.dict() for venue in venues],
            total=total,
            page=page,
            per_page=per_page,
            total_pages=total_pages
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{venue_id}", response_model=APIResponse)
async def get_venue(venue_id: str):
    """Get a specific venue by ID"""
    try:
        venue = await db.get_venue(venue_id)
        if not venue:
            raise HTTPException(status_code=404, detail="Venue not found")
        
        return APIResponse(
            success=True,
            message="Venue retrieved successfully",
            data=venue.dict()
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=APIResponse)
async def create_venue(venue: VenueCreate):
    """Create a new venue"""
    try:
        created_venue = await db.create_venue(venue)
        return APIResponse(
            success=True,
            message="Venue created successfully",
            data=created_venue.dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
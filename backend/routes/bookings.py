from fastapi import APIRouter, HTTPException
from typing import List
from models import Booking, BookingCreate, BookingUpdate, BookingStatus, APIResponse
from database import db

router = APIRouter(prefix="/bookings", tags=["bookings"])

@router.post("/", response_model=APIResponse)
async def create_booking(booking: BookingCreate):
    """Create a new booking"""
    try:
        created_booking = await db.create_booking(booking)
        return APIResponse(
            success=True,
            message="Booking created successfully",
            data=created_booking.dict()
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/user/{user_id}", response_model=APIResponse)
async def get_user_bookings(user_id: str):
    """Get all bookings for a user"""
    try:
        bookings = await db.get_user_bookings(user_id)
        return APIResponse(
            success=True,
            message="Bookings retrieved successfully",
            data=[booking.dict() for booking in bookings]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{booking_id}", response_model=APIResponse)
async def get_booking(booking_id: str):
    """Get a specific booking by ID"""
    try:
        booking = await db.get_booking(booking_id)
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        return APIResponse(
            success=True,
            message="Booking retrieved successfully",
            data=booking.dict()
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{booking_id}/status", response_model=APIResponse)
async def update_booking_status(booking_id: str, status: BookingStatus):
    """Update booking status"""
    try:
        updated_booking = await db.update_booking_status(booking_id, status)
        if not updated_booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        return APIResponse(
            success=True,
            message="Booking status updated successfully",
            data=updated_booking.dict()
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
from fastapi import APIRouter, HTTPException
from models import WeddingBudget, GuestList, WeddingTimeline, APIResponse
from database import db

router = APIRouter(prefix="/wedding-tools", tags=["wedding-tools"])

# Budget endpoints
@router.get("/budget/{user_id}", response_model=APIResponse)
async def get_wedding_budget(user_id: str):
    """Get wedding budget for a user"""
    try:
        budget = await db.get_user_wedding_budget(user_id)
        if not budget:
            # Return default budget structure if none exists
            default_budget = WeddingBudget(
                user_id=user_id,
                total_budget=800000,
                categories=[
                    {"name": "Venue", "budgeted": 60000, "spent": 0.0, "color": "#800000"},
                    {"name": "Catering", "budgeted": 180000, "spent": 0.0, "color": "#FFD700"},
                    {"name": "Decoration", "budgeted": 80000, "spent": 0.0, "color": "#008080"},
                    {"name": "Photography", "budgeted": 50000, "spent": 0.0, "color": "#FF6B6B"},
                    {"name": "Flowers", "budgeted": 15000, "spent": 0.0, "color": "#4ECDC4"},
                    {"name": "Miscellaneous", "budgeted": 30000, "spent": 0.0, "color": "#95A5A6"}
                ]
            )
            budget = await db.create_or_update_wedding_budget(default_budget)
        
        return APIResponse(
            success=True,
            message="Wedding budget retrieved successfully",
            data=budget.dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/budget/{user_id}", response_model=APIResponse)
async def update_wedding_budget(user_id: str, budget: WeddingBudget):
    """Update wedding budget for a user"""
    try:
        budget.user_id = user_id  # Ensure user_id matches
        updated_budget = await db.create_or_update_wedding_budget(budget)
        return APIResponse(
            success=True,
            message="Wedding budget updated successfully",
            data=updated_budget.dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Guest list endpoints
@router.get("/guests/{user_id}", response_model=APIResponse)
async def get_guest_list(user_id: str):
    """Get guest list for a user"""
    try:
        guest_list = await db.get_user_guest_list(user_id)
        if not guest_list:
            # Create empty guest list if none exists
            guest_list = GuestList(user_id=user_id, guests=[])
            guest_list = await db.create_or_update_guest_list(guest_list)
        
        return APIResponse(
            success=True,
            message="Guest list retrieved successfully",
            data=guest_list.dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/guests/{user_id}", response_model=APIResponse)
async def update_guest_list(user_id: str, guest_list: GuestList):
    """Update guest list for a user"""
    try:
        guest_list.user_id = user_id  # Ensure user_id matches
        updated_guest_list = await db.create_or_update_guest_list(guest_list)
        return APIResponse(
            success=True,
            message="Guest list updated successfully",
            data=updated_guest_list.dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Timeline endpoints
@router.get("/timeline/{user_id}", response_model=APIResponse)
async def get_wedding_timeline(user_id: str):
    """Get wedding timeline for a user"""
    try:
        timeline = await db.get_user_wedding_timeline(user_id)
        if not timeline:
            # Create default timeline if none exists
            from datetime import datetime, timedelta
            default_items = [
                {
                    "id": "t1",
                    "date": datetime.now() + timedelta(days=30),
                    "time": "10:00",
                    "event": "Venue Booking Confirmation",
                    "description": "Finalize venue booking and make advance payment",
                    "status": "pending"
                },
                {
                    "id": "t2", 
                    "date": datetime.now() + timedelta(days=45),
                    "time": "14:00",
                    "event": "Catering Menu Selection",
                    "description": "Meet with caterer to finalize menu and guest count",
                    "status": "pending"
                },
                {
                    "id": "t3",
                    "date": datetime.now() + timedelta(days=60),
                    "time": "11:00", 
                    "event": "Decoration Theme Discussion",
                    "description": "Discuss decoration themes and color schemes",
                    "status": "pending"
                }
            ]
            timeline = WeddingTimeline(user_id=user_id, items=default_items)
            timeline = await db.create_or_update_wedding_timeline(timeline)
        
        return APIResponse(
            success=True,
            message="Wedding timeline retrieved successfully",
            data=timeline.dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/timeline/{user_id}", response_model=APIResponse)
async def update_wedding_timeline(user_id: str, timeline: WeddingTimeline):
    """Update wedding timeline for a user"""
    try:
        timeline.user_id = user_id  # Ensure user_id matches
        updated_timeline = await db.create_or_update_wedding_timeline(timeline)
        return APIResponse(
            success=True,
            message="Wedding timeline updated successfully",
            data=updated_timeline.dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
from fastapi import APIRouter, HTTPException
from models import User, UserCreate, UserUpdate, APIResponse
from database import db

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=APIResponse)
async def create_user(user: UserCreate):
    """Create a new user"""
    try:
        created_user = await db.create_user(user)
        return APIResponse(
            success=True,
            message="User created successfully",
            data=created_user.dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{user_id}", response_model=APIResponse)
async def get_user(user_id: str):
    """Get user by ID"""
    try:
        user = await db.get_user(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return APIResponse(
            success=True,
            message="User retrieved successfully",
            data=user.dict()
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{user_id}", response_model=APIResponse)
async def update_user(user_id: str, user_update: UserUpdate):
    """Update user information"""
    try:
        updated_user = await db.update_user(user_id, user_update)
        if not updated_user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return APIResponse(
            success=True,
            message="User updated successfully",
            data=updated_user.dict()
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
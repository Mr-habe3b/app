from fastapi import APIRouter, HTTPException
from typing import List
from models import SupportTicket, SupportTicketCreate, ChatMessage, FAQ, APIResponse
from database import db

router = APIRouter(prefix="/support", tags=["support"])

@router.post("/tickets", response_model=APIResponse)
async def create_support_ticket(ticket: SupportTicketCreate):
    """Create a new support ticket"""
    try:
        created_ticket = await db.create_support_ticket(ticket)
        return APIResponse(
            success=True,
            message="Support ticket created successfully",
            data=created_ticket.dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/tickets/{ticket_id}/messages", response_model=APIResponse)
async def add_message_to_ticket(ticket_id: str, message: ChatMessage):
    """Add a message to an existing support ticket"""
    try:
        updated_ticket = await db.add_message_to_ticket(ticket_id, message)
        if not updated_ticket:
            raise HTTPException(status_code=404, detail="Support ticket not found")
        
        return APIResponse(
            success=True,
            message="Message added successfully",
            data=updated_ticket.dict()
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/faqs", response_model=APIResponse)
async def get_faqs():
    """Get all frequently asked questions"""
    try:
        faqs = await db.get_faqs()
        return APIResponse(
            success=True,
            message="FAQs retrieved successfully",
            data=[faq.dict() for faq in faqs]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/faqs", response_model=APIResponse)
async def create_faq(faq: FAQ):
    """Create a new FAQ"""
    try:
        created_faq = await db.create_faq(faq)
        return APIResponse(
            success=True,
            message="FAQ created successfully",
            data=created_faq.dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
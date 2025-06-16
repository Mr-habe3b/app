from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional, Dict, Any
from datetime import datetime
import os
from models import *

class Database:
    def __init__(self, mongo_url: str, db_name: str):
        self.client = AsyncIOMotorClient(mongo_url)
        self.db = self.client[db_name]
        
        # Collections
        self.users = self.db.users
        self.venues = self.db.venues
        self.bookings = self.db.bookings
        self.services = self.db.services
        self.wedding_budgets = self.db.wedding_budgets
        self.guest_lists = self.db.guest_lists
        self.wedding_timelines = self.db.wedding_timelines
        self.support_tickets = self.db.support_tickets
        self.faqs = self.db.faqs

    async def close(self):
        self.client.close()

    # User Operations
    async def create_user(self, user: UserCreate) -> User:
        user_dict = user.dict()
        user_obj = User(**user_dict)
        await self.users.insert_one(user_obj.dict())
        return user_obj

    async def get_user(self, user_id: str) -> Optional[User]:
        user_doc = await self.users.find_one({"id": user_id})
        if user_doc:
            return User(**user_doc)
        return None

    async def update_user(self, user_id: str, user_update: UserUpdate) -> Optional[User]:
        update_data = {k: v for k, v in user_update.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await self.users.update_one(
            {"id": user_id},
            {"$set": update_data}
        )
        
        if result.modified_count:
            return await self.get_user(user_id)
        return None

    # Venue Operations
    async def create_venue(self, venue: VenueCreate) -> Venue:
        venue_dict = venue.dict()
        venue_obj = Venue(**venue_dict)
        await self.venues.insert_one(venue_obj.dict())
        return venue_obj

    async def get_venues(self, filters: VenueFilters, skip: int = 0, limit: int = 50) -> List[Venue]:
        query = {}
        
        if filters.budget:
            query["price"] = {"$lte": filters.budget}
        if filters.capacity:
            query["capacity"] = {"$gte": filters.capacity}
        if filters.availability:
            query["availability"] = filters.availability
        if filters.pincode:
            query["pincode"] = filters.pincode
        if filters.search_query:
            query["$or"] = [
                {"name": {"$regex": filters.search_query, "$options": "i"}},
                {"location": {"$regex": filters.search_query, "$options": "i"}}
            ]

        cursor = self.venues.find(query).skip(skip).limit(limit)
        venues = []
        async for venue_doc in cursor:
            venues.append(Venue(**venue_doc))
        return venues

    async def get_venue(self, venue_id: str) -> Optional[Venue]:
        venue_doc = await self.venues.find_one({"id": venue_id})
        if venue_doc:
            return Venue(**venue_doc)
        return None

    async def get_venues_count(self, filters: VenueFilters) -> int:
        query = {}
        if filters.budget:
            query["price"] = {"$lte": filters.budget}
        if filters.capacity:
            query["capacity"] = {"$gte": filters.capacity}
        if filters.availability:
            query["availability"] = filters.availability
        if filters.pincode:
            query["pincode"] = filters.pincode
        if filters.search_query:
            query["$or"] = [
                {"name": {"$regex": filters.search_query, "$options": "i"}},
                {"location": {"$regex": filters.search_query, "$options": "i"}}
            ]
        
        return await self.venues.count_documents(query)

    # Booking Operations
    async def create_booking(self, booking: BookingCreate) -> Booking:
        # Get venue details
        venue = await self.get_venue(booking.venue_id)
        if not venue:
            raise ValueError("Venue not found")

        # Calculate total amount
        total_amount = venue.price
        for service in booking.services:
            total_amount += service.price

        booking_dict = booking.dict()
        booking_dict.update({
            "venue_name": venue.name,
            "venue_location": venue.location,
            "total_amount": total_amount
        })
        
        booking_obj = Booking(**booking_dict)
        await self.bookings.insert_one(booking_obj.dict())
        return booking_obj

    async def get_user_bookings(self, user_id: str) -> List[Booking]:
        cursor = self.bookings.find({"user_id": user_id}).sort("created_at", -1)
        bookings = []
        async for booking_doc in cursor:
            bookings.append(Booking(**booking_doc))
        return bookings

    async def get_booking(self, booking_id: str) -> Optional[Booking]:
        booking_doc = await self.bookings.find_one({"id": booking_id})
        if booking_doc:
            return Booking(**booking_doc)
        return None

    async def update_booking_status(self, booking_id: str, status: BookingStatus) -> Optional[Booking]:
        result = await self.bookings.update_one(
            {"id": booking_id},
            {"$set": {"status": status, "updated_at": datetime.utcnow()}}
        )
        
        if result.modified_count:
            return await self.get_booking(booking_id)
        return None

    # Service Operations
    async def get_services(self) -> List[Service]:
        cursor = self.services.find({})
        services = []
        async for service_doc in cursor:
            services.append(Service(**service_doc))
        return services

    async def create_service(self, service: Service) -> Service:
        await self.services.insert_one(service.dict())
        return service

    # Wedding Planning Operations
    async def get_user_wedding_budget(self, user_id: str) -> Optional[WeddingBudget]:
        budget_doc = await self.wedding_budgets.find_one({"user_id": user_id})
        if budget_doc:
            return WeddingBudget(**budget_doc)
        return None

    async def create_or_update_wedding_budget(self, budget: WeddingBudget) -> WeddingBudget:
        existing = await self.get_user_wedding_budget(budget.user_id)
        
        if existing:
            budget.updated_at = datetime.utcnow()
            await self.wedding_budgets.update_one(
                {"user_id": budget.user_id},
                {"$set": budget.dict()}
            )
        else:
            await self.wedding_budgets.insert_one(budget.dict())
        
        return budget

    async def get_user_guest_list(self, user_id: str) -> Optional[GuestList]:
        guest_list_doc = await self.guest_lists.find_one({"user_id": user_id})
        if guest_list_doc:
            return GuestList(**guest_list_doc)
        return None

    async def create_or_update_guest_list(self, guest_list: GuestList) -> GuestList:
        existing = await self.get_user_guest_list(guest_list.user_id)
        
        if existing:
            guest_list.updated_at = datetime.utcnow()
            await self.guest_lists.update_one(
                {"user_id": guest_list.user_id},
                {"$set": guest_list.dict()}
            )
        else:
            await self.guest_lists.insert_one(guest_list.dict())
        
        return guest_list

    async def get_user_wedding_timeline(self, user_id: str) -> Optional[WeddingTimeline]:
        timeline_doc = await self.wedding_timelines.find_one({"user_id": user_id})
        if timeline_doc:
            return WeddingTimeline(**timeline_doc)
        return None

    async def create_or_update_wedding_timeline(self, timeline: WeddingTimeline) -> WeddingTimeline:
        existing = await self.get_user_wedding_timeline(timeline.user_id)
        
        if existing:
            timeline.updated_at = datetime.utcnow()
            await self.wedding_timelines.update_one(
                {"user_id": timeline.user_id},
                {"$set": timeline.dict()}
            )
        else:
            await self.wedding_timelines.insert_one(timeline.dict())
        
        return timeline

    # Support Operations
    async def create_support_ticket(self, ticket: SupportTicketCreate) -> SupportTicket:
        # Create initial message
        initial_message = ChatMessage(
            user_id=ticket.user_id,
            message=ticket.message,
            sender_type="user"
        )
        
        support_ticket = SupportTicket(
            user_id=ticket.user_id,
            subject=ticket.subject,
            messages=[initial_message]
        )
        
        await self.support_tickets.insert_one(support_ticket.dict())
        return support_ticket

    async def add_message_to_ticket(self, ticket_id: str, message: ChatMessage) -> Optional[SupportTicket]:
        result = await self.support_tickets.update_one(
            {"id": ticket_id},
            {
                "$push": {"messages": message.dict()},
                "$set": {"updated_at": datetime.utcnow()}
            }
        )
        
        if result.modified_count:
            ticket_doc = await self.support_tickets.find_one({"id": ticket_id})
            if ticket_doc:
                return SupportTicket(**ticket_doc)
        return None

    async def get_faqs(self) -> List[FAQ]:
        cursor = self.faqs.find({}).sort("order", 1)
        faqs = []
        async for faq_doc in cursor:
            faqs.append(FAQ(**faq_doc))
        return faqs

    async def create_faq(self, faq: FAQ) -> FAQ:
        await self.faqs.insert_one(faq.dict())
        return faq

# Database instance
db = Database(os.environ['MONGO_URL'], os.environ['DB_NAME'])
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

# Enums
class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"

class AvailabilityStatus(str, Enum):
    AVAILABLE = "available"
    BOOKED = "booked"
    MAINTENANCE = "maintenance"

class TimelineStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    UPCOMING = "upcoming"

# Base Models
class Coordinates(BaseModel):
    lat: float
    lng: float

class ContactInfo(BaseModel):
    phone: str
    email: str

# User Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str
    profile_image: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(BaseModel):
    name: str
    phone: str
    email: str
    profile_image: Optional[str] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    profile_image: Optional[str] = None

# Venue Models
class Venue(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    pincode: str
    coordinates: Coordinates
    price: float
    capacity: int
    rating: float = 0.0
    reviews: int = 0
    availability: AvailabilityStatus = AvailabilityStatus.AVAILABLE
    images: List[str] = []
    amenities: List[str] = []
    description: str
    contact: ContactInfo
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class VenueCreate(BaseModel):
    name: str
    location: str
    pincode: str
    coordinates: Coordinates
    price: float
    capacity: int
    images: List[str] = []
    amenities: List[str] = []
    description: str
    contact: ContactInfo

class VenueFilters(BaseModel):
    budget: Optional[float] = None
    capacity: Optional[int] = None
    availability: Optional[AvailabilityStatus] = None
    pincode: Optional[str] = None
    search_query: Optional[str] = None

# Service Models
class ServiceProvider(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    rating: float
    price_range: str
    speciality: str
    services: List[str]
    contact: ContactInfo

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    icon: str
    providers: List[ServiceProvider] = []

# Booking Models
class BookingService(BaseModel):
    service_id: str
    provider_id: str
    name: str
    price: float

class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    venue_id: str
    venue_name: str
    venue_location: str
    event_date: datetime
    guest_count: Optional[int] = None
    total_amount: float
    booking_date: datetime = Field(default_factory=datetime.utcnow)
    status: BookingStatus = BookingStatus.PENDING
    services: List[BookingService] = []
    special_requests: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class BookingCreate(BaseModel):
    user_id: str
    venue_id: str
    event_date: datetime
    guest_count: Optional[int] = None
    services: List[BookingService] = []
    special_requests: Optional[str] = None

class BookingUpdate(BaseModel):
    status: Optional[BookingStatus] = None
    special_requests: Optional[str] = None

# Wedding Planning Models
class BudgetCategory(BaseModel):
    name: str
    budgeted: float
    spent: float = 0.0
    color: str

class WeddingBudget(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    total_budget: float
    categories: List[BudgetCategory]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Guest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    relation: str
    phone: Optional[str] = None
    address: Optional[str] = None
    category: str = "Family"
    invited: bool = False
    confirmed: bool = False

class GuestList(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    guests: List[Guest] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TimelineItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: datetime
    time: str
    event: str
    description: str
    status: TimelineStatus = TimelineStatus.PENDING

class WeddingTimeline(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    items: List[TimelineItem] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Support Models
class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: Optional[str] = None
    message: str
    sender_type: str  # 'user' or 'bot' or 'agent'
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class SupportTicket(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: Optional[str] = None
    subject: str
    status: str = "open"  # open, in_progress, resolved
    messages: List[ChatMessage] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SupportTicketCreate(BaseModel):
    user_id: Optional[str] = None
    subject: str
    message: str

class FAQ(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question: str
    answer: str
    category: str = "general"
    order: int = 0

# Request/Response Models
class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

class PaginatedResponse(BaseModel):
    success: bool
    message: str
    data: List[Any] = []
    total: int = 0
    page: int = 1
    per_page: int = 10
    total_pages: int = 0
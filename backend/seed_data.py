from database import initialize_database
import asyncio
from models import *

async def seed_venues():
    """Seed initial venue data"""
    db = initialize_database()
    
    venues_data = [
        VenueCreate(
            name="R K Function Hall",
            location="Bandlaguda Jagir",
            pincode="500005",
            coordinates=Coordinates(lat=17.3616, lng=78.4747),
            price=40000.0,
            capacity=500,
            images=[
                "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800"
            ],
            amenities=["Air Conditioning", "Parking", "Sound System", "Stage", "Green Rooms"],
            description="Premium function hall perfect for weddings and grand celebrations in the heart of Bandlaguda Jagir.",
            contact=ContactInfo(phone="+91 9876543210", email="rk.hall@example.com")
        ),
        VenueCreate(
            name="Sri Lakshmi Convention",
            location="Chandrayangutta",
            pincode="500005",
            coordinates=Coordinates(lat=17.3580, lng=78.4820),
            price=35000.0,
            capacity=400,
            images=[
                "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
            ],
            amenities=["Air Conditioning", "Parking", "Catering Kitchen", "Decoration Support"],
            description="Elegant convention center with traditional architecture and modern facilities.",
            contact=ContactInfo(phone="+91 9876543211", email="lakshmi.convention@example.com")
        ),
        VenueCreate(
            name="Golden Palace Banquet",
            location="Bandlaguda Jagir",
            pincode="500005",
            coordinates=Coordinates(lat=17.3590, lng=78.4760),
            price=55000.0,
            capacity=800,
            images=[
                "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=800",
                "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800"
            ],
            amenities=["Air Conditioning", "Valet Parking", "Sound System", "Bridal Suite", "Photography Studio"],
            description="Luxury banquet hall with royal ambiance for your special occasions.",
            contact=ContactInfo(phone="+91 9876543212", email="golden.palace@example.com")
        ),
        VenueCreate(
            name="Marigold Gardens",
            location="Chandrayangutta",
            pincode="500005",
            coordinates=Coordinates(lat=17.3550, lng=78.4800),
            price=30000.0,
            capacity=300,
            images=[
                "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800"
            ],
            amenities=["Garden Setting", "Parking", "Sound System", "Outdoor Stage"],
            description="Beautiful garden venue perfect for intimate celebrations and outdoor ceremonies.",
            contact=ContactInfo(phone="+91 9876543213", email="marigold.gardens@example.com")
        )
    ]
    
    for venue_data in venues_data:
        await db.create_venue(venue_data)
    
    print("Venues seeded successfully!")

async def seed_services():
    """Seed initial service data"""
    services_data = [
        Service(
            name="Catering Services",
            icon="🍽️",
            providers=[
                ServiceProvider(
                    name="Hyderabadi Biryani Caterers",
                    rating=4.6,
                    price_range="₹250-400 per plate",
                    speciality="Traditional Hyderabadi Cuisine",
                    services=["Hyderabadi Biryani", "Haleem", "Kebabs", "Traditional Sweets"],
                    contact=ContactInfo(phone="+91 9876543301", email="biryani.caterers@example.com")
                ),
                ServiceProvider(
                    name="Royal Feast Catering",
                    rating=4.4,
                    price_range="₹300-500 per plate",
                    speciality="Multi-Cuisine",
                    services=["North Indian", "South Indian", "Continental", "Chinese"],
                    contact=ContactInfo(phone="+91 9876543302", email="royal.feast@example.com")
                )
            ]
        ),
        Service(
            name="Decoration",
            icon="🎨",
            providers=[
                ServiceProvider(
                    name="Floral Dreams Decor",
                    rating=4.5,
                    price_range="₹15,000-50,000",
                    speciality="Wedding Decorations",
                    services=["Stage Decoration", "Floral Arrangements", "Lighting", "Entrance Decor"],
                    contact=ContactInfo(phone="+91 9876543401", email="floral.dreams@example.com")
                ),
                ServiceProvider(
                    name="Royal Events Decor",
                    rating=4.3,
                    price_range="₹20,000-80,000",
                    speciality="Luxury Events",
                    services=["Theme-based Decor", "LED Walls", "Custom Setups", "Photo Booths"],
                    contact=ContactInfo(phone="+91 9876543402", email="royal.events@example.com")
                )
            ]
        ),
        Service(
            name="Photography",
            icon="📸",
            providers=[
                ServiceProvider(
                    name="Wedding Moments Studio",
                    rating=4.7,
                    price_range="₹25,000-75,000",
                    speciality="Wedding Photography",
                    services=["Pre-Wedding Shoot", "Wedding Day Coverage", "Album Creation", "Video Editing"],
                    contact=ContactInfo(phone="+91 9876543501", email="wedding.moments@example.com")
                )
            ]
        ),
        Service(
            name="Flowers",
            icon="🌸",
            providers=[
                ServiceProvider(
                    name="Fresh Petals",
                    rating=4.4,
                    price_range="₹5,000-25,000",
                    speciality="Fresh Flower Arrangements",
                    services=["Bridal Bouquets", "Garlands", "Car Decoration", "Venue Flowers"],
                    contact=ContactInfo(phone="+91 9876543601", email="fresh.petals@example.com")
                )
            ]
        )
    ]
    
    for service in services_data:
        await db.create_service(service)
    
    print("Services seeded successfully!")

async def seed_faqs():
    """Seed FAQ data"""
    faqs_data = [
        FAQ(
            question="How do I book a function hall?",
            answer="Simply browse through our map-based interface, select a hall that suits your needs, choose your date and services, and complete the booking with our one-click payment system.",
            category="booking",
            order=1
        ),
        FAQ(
            question="Can I cancel my booking?",
            answer="Yes, you can cancel your booking. Full refund 7 days prior, 50% refund for 3-7 days, and no refund within 3 days of the event.",
            category="booking",
            order=2
        ),
        FAQ(
            question="What payment methods do you accept?",
            answer="We accept UPI, credit cards, debit cards, and net banking through our secure Razorpay integration.",
            category="payment",
            order=3
        ),
        FAQ(
            question="Are the prices negotiable?",
            answer="Our platform offers competitive prices that are already 10-20% lower than offline vendors. Prices are fixed to ensure transparency.",
            category="pricing",
            order=4
        ),
        FAQ(
            question="Do you provide catering services?",
            answer="Yes, we offer various catering services including traditional Hyderabadi cuisine, multi-cuisine options, and customized menus.",
            category="services",
            order=5
        ),
        FAQ(
            question="How can I contact the venue directly?",
            answer="Once you book a venue, you will receive the venue contact details for direct coordination.",
            category="support",
            order=6
        )
    ]
    
    for faq in faqs_data:
        await db.create_faq(faq)
    
    print("FAQs seeded successfully!")

async def seed_all():
    """Seed all initial data"""
    try:
        await seed_venues()
        await seed_services()
        await seed_faqs()
        print("All seed data created successfully!")
    except Exception as e:
        print(f"Error seeding data: {e}")

if __name__ == "__main__":
    asyncio.run(seed_all())
// Mock data for Hyderabad HallBook App

export const venues = [
  {
    id: '1',
    name: 'R K Function Hall',
    location: 'Bandlaguda Jagir',
    pincode: '500005',
    coordinates: { lat: 17.3616, lng: 78.4747 },
    price: 40000,
    capacity: 500,
    rating: 4.5,
    reviews: 128,
    availability: 'available',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800'
    ],
    amenities: ['Air Conditioning', 'Parking', 'Sound System', 'Stage', 'Green Rooms'],
    description: 'Premium function hall perfect for weddings and grand celebrations in the heart of Bandlaguda Jagir.',
    contactPhone: '+91 9876543210',
    contactEmail: 'rk.hall@example.com'
  },
  {
    id: '2',
    name: 'Sri Lakshmi Convention',
    location: 'Chandrayangutta',
    pincode: '500005',
    coordinates: { lat: 17.3580, lng: 78.4820 },
    price: 35000,
    capacity: 400,
    rating: 4.3,
    reviews: 96,
    availability: 'available',
    images: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
    ],
    amenities: ['Air Conditioning', 'Parking', 'Catering Kitchen', 'Decoration Support'],
    description: 'Elegant convention center with traditional architecture and modern facilities.',
    contactPhone: '+91 9876543211',
    contactEmail: 'lakshmi.convention@example.com'
  },
  {
    id: '3',
    name: 'Golden Palace Banquet',
    location: 'Bandlaguda Jagir',
    pincode: '500005',
    coordinates: { lat: 17.3590, lng: 78.4760 },
    price: 55000,
    capacity: 800,
    rating: 4.7,
    reviews: 156,
    availability: 'booked',
    images: [
      'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=800',
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800'
    ],
    amenities: ['Air Conditioning', 'Valet Parking', 'Sound System', 'Bridal Suite', 'Photography Studio'],
    description: 'Luxury banquet hall with royal ambiance for your special occasions.',
    contactPhone: '+91 9876543212',
    contactEmail: 'golden.palace@example.com'
  },
  {
    id: '4',
    name: 'Marigold Gardens',
    location: 'Chandrayangutta',
    pincode: '500005',
    coordinates: { lat: 17.3550, lng: 78.4800 },
    price: 30000,
    capacity: 300,
    rating: 4.2,
    reviews: 84,
    availability: 'available',
    images: [
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800'
    ],
    amenities: ['Garden Setting', 'Parking', 'Sound System', 'Outdoor Stage'],
    description: 'Beautiful garden venue perfect for intimate celebrations and outdoor ceremonies.',
    contactPhone: '+91 9876543213',
    contactEmail: 'marigold.gardens@example.com'
  }
];

export const services = [
  {
    id: 'catering',
    name: 'Catering Services',
    icon: '🍽️',
    providers: [
      {
        id: 'c1',
        name: 'Hyderabadi Biryani Caterers',
        rating: 4.6,
        pricePerPlate: 250,
        speciality: 'Traditional Hyderabadi Cuisine',
        menu: ['Hyderabadi Biryani', 'Haleem', 'Kebabs', 'Traditional Sweets']
      },
      {
        id: 'c2',
        name: 'Royal Feast Catering',
        rating: 4.4,
        pricePerPlate: 300,
        speciality: 'Multi-Cuisine',
        menu: ['North Indian', 'South Indian', 'Continental', 'Chinese']
      }
    ]
  },
  {
    id: 'decoration',
    name: 'Decoration',
    icon: '🎨',
    providers: [
      {
        id: 'd1',
        name: 'Floral Dreams Decor',
        rating: 4.5,
        priceRange: '15000-50000',
        speciality: 'Wedding Decorations',
        services: ['Stage Decoration', 'Floral Arrangements', 'Lighting', 'Entrance Decor']
      },
      {
        id: 'd2',
        name: 'Royal Events Decor',
        rating: 4.3,
        priceRange: '20000-80000',
        speciality: 'Luxury Events',
        services: ['Theme-based Decor', 'LED Walls', 'Custom Setups', 'Photo Booths']
      }
    ]
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: '📸',
    providers: [
      {
        id: 'p1',
        name: 'Wedding Moments Studio',
        rating: 4.7,
        priceRange: '25000-75000',
        speciality: 'Wedding Photography',
        services: ['Pre-Wedding Shoot', 'Wedding Day Coverage', 'Album Creation', 'Video Editing']
      }
    ]
  },
  {
    id: 'flowers',
    name: 'Flowers',
    icon: '🌸',
    providers: [
      {
        id: 'f1',
        name: 'Fresh Petals',
        rating: 4.4,
        priceRange: '5000-25000',
        speciality: 'Fresh Flower Arrangements',
        services: ['Bridal Bouquets', 'Garlands', 'Car Decoration', 'Venue Flowers']
      }
    ]
  }
];

export const mockUser = {
  id: 'user1',
  name: 'Priya Sharma',
  phone: '+91 9876543210',
  email: 'priya.sharma@example.com',
  profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
  bookings: []
};

export const weddingBudget = {
  totalBudget: 800000,
  allocated: {
    venue: 60000,
    catering: 180000,
    decoration: 80000,
    photography: 50000,
    flowers: 15000,
    miscellaneous: 30000
  },
  spent: {
    venue: 0,
    catering: 0,
    decoration: 0,
    photography: 0,
    flowers: 0,
    miscellaneous: 0
  },
  categories: [
    { name: 'Venue', budgeted: 60000, spent: 0, color: '#800000' },
    { name: 'Catering', budgeted: 180000, spent: 0, color: '#FFD700' },
    { name: 'Decoration', budgeted: 80000, spent: 0, color: '#008080' },
    { name: 'Photography', budgeted: 50000, spent: 0, color: '#FF6B6B' },
    { name: 'Flowers', budgeted: 15000, spent: 0, color: '#4ECDC4' },
    { name: 'Miscellaneous', budgeted: 30000, spent: 0, color: '#95A5A6' }
  ]
};

export const guestList = [
  {
    id: 'g1',
    name: 'Rajesh Uncle',
    relation: 'Uncle',
    phone: '+91 9876543001',
    address: 'Hyderabad',
    invited: true,
    confirmed: true,
    category: 'Family'
  },
  {
    id: 'g2',
    name: 'Sunita Aunty',
    relation: 'Aunt',
    phone: '+91 9876543002',
    address: 'Hyderabad',
    invited: true,
    confirmed: false,
    category: 'Family'
  },
  {
    id: 'g3',
    name: 'Amit Kumar',
    relation: 'Friend',
    phone: '+91 9876543003',
    address: 'Bangalore',
    invited: true,
    confirmed: true,
    category: 'Friends'
  }
];

export const weddingTimeline = [
  {
    id: 't1',
    date: '2024-12-01',
    time: '10:00',
    event: 'Venue Booking Confirmation',
    status: 'pending',
    description: 'Finalize venue booking and make advance payment'
  },
  {
    id: 't2',
    date: '2024-12-15',
    time: '14:00',
    event: 'Catering Menu Selection',
    status: 'pending',
    description: 'Meet with caterer to finalize menu and guest count'
  },
  {
    id: 't3',
    date: '2025-01-01',
    time: '11:00',
    event: 'Decoration Theme Discussion',
    status: 'pending',
    description: 'Discuss decoration themes and color schemes'
  },
  {
    id: 't4',
    date: '2025-02-14',
    time: '09:00',
    event: 'Wedding Day',
    status: 'upcoming',
    description: 'The big day celebration'
  }
];

// Local storage helper functions
export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
    return defaultValue;
  }
};

export const generateBookingId = () => {
  return 'HHB' + Date.now() + Math.random().toString(36).substr(2, 5);
};
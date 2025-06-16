import React from 'react';

const VenueCard = ({ venue, onBook, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      {/* Image Carousel */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={venue.images[0]} 
          alt={venue.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            venue.availability === 'available' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {venue.availability === 'available' ? 'Available' : 'Booked'}
          </span>
        </div>
        
        {/* Heart Icon */}
        <button className="absolute top-3 left-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
          <svg className="w-4 h-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{venue.name}</h3>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-sm font-medium text-gray-700">{venue.rating}</span>
            <span className="text-sm text-gray-500">({venue.reviews} reviews)</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{venue.location}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-sm">Up to {venue.capacity} guests</span>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {venue.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                {amenity}
              </span>
            ))}
            {venue.amenities.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                +{venue.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{venue.price?.toLocaleString()}</span>
            <span className="text-gray-600 text-sm ml-1">/day</span>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => onViewDetails(venue)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              View Details
            </button>
            {venue.availability === 'available' && (
              <button 
                onClick={() => onBook(venue)}
                className="px-4 py-2 bg-gradient-to-r from-red-800 to-red-700 text-white rounded-lg hover:from-red-900 hover:to-red-800 transition-all duration-200 transform hover:scale-105 shadow-lg text-sm font-medium"
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
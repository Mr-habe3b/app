import React, { useState, useEffect } from 'react';
import { venues } from '../data/mock';

const MapView = ({ onVenueSelect, selectedVenue, filters }) => {
  const [filteredVenues, setFilteredVenues] = useState(venues);

  useEffect(() => {
    let filtered = venues;
    
    if (filters.budget) {
      filtered = filtered.filter(venue => venue.price <= filters.budget);
    }
    
    if (filters.capacity) {
      filtered = filtered.filter(venue => venue.capacity >= filters.capacity);
    }
    
    if (filters.availability === 'available') {
      filtered = filtered.filter(venue => venue.availability === 'available');
    }
    
    setFilteredVenues(filtered);
  }, [filters]);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl overflow-hidden shadow-lg">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-teal-100">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Roads */}
            <path d="M0 150 L400 150" stroke="#ccc" strokeWidth="3"/>
            <path d="M200 0 L200 300" stroke="#ccc" strokeWidth="3"/>
            <path d="M50 50 L350 250" stroke="#ddd" strokeWidth="2"/>
            <path d="M100 250 L300 50" stroke="#ddd" strokeWidth="2"/>
            
            {/* Area Labels */}
            <text x="80" y="80" fill="#666" fontSize="12" fontWeight="600">Bandlaguda Jagir</text>
            <text x="250" y="220" fill="#666" fontSize="12" fontWeight="600">Chandrayangutta</text>
          </svg>
        </div>
      </div>

      {/* Venue Pins */}
      {filteredVenues.map((venue) => (
        <div
          key={venue.id}
          className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-300 hover:scale-110 ${
            selectedVenue?.id === venue.id ? 'z-20 scale-125' : 'z-10'
          }`}
          style={{
            left: `${((venue.coordinates.lng - 78.4700) / 0.0150) * 100}%`,
            top: `${((17.3650 - venue.coordinates.lat) / 0.0100) * 100}%`
          }}
          onClick={() => onVenueSelect(venue)}
        >
          {/* Pin */}
          <div className={`relative ${venue.availability === 'available' ? 'text-green-600' : 'text-red-500'}`}>
            <svg className="w-8 h-8 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            
            {/* Info Card */}
            <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
              bg-white rounded-lg shadow-xl p-3 min-w-48 border-2 transition-all duration-200
              ${selectedVenue?.id === venue.id ? 'border-yellow-400 scale-100 opacity-100' : 'border-gray-200 scale-95 opacity-90'}
              hover:scale-100 hover:opacity-100`}>
              <div className="text-xs space-y-1">
                <h4 className="font-bold text-gray-800 text-sm">{venue.name}</h4>
                <p className="text-gray-600">{venue.location}</p>
                <div className="flex justify-between items-center">
                  <span className="text-maroon-600 font-semibold">₹{venue.price?.toLocaleString()}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-gray-700">{venue.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">{venue.capacity} guests</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    venue.availability === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {venue.availability}
                  </span>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 
                border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
        <div className="text-xs space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
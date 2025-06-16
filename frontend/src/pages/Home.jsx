import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapView from '../components/MapView';
import VenueCard from '../components/VenueCard';
import { venues, services } from '../data/mock';

const Home = () => {
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    budget: '',
    capacity: '',
    availability: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVenues = venues.filter(venue => {
    if (searchQuery && !venue.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !venue.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.budget && venue.price > parseInt(filters.budget)) return false;
    if (filters.capacity && venue.capacity < parseInt(filters.capacity)) return false;
    if (filters.availability !== 'all' && venue.availability !== filters.availability) return false;
    return true;
  });

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
  };

  const handleBookVenue = (venue) => {
    navigate('/booking', { state: { venue } });
  };

  const handleViewDetails = (venue) => {
    navigate('/venue-details', { state: { venue } });
  };

  const clearFilters = () => {
    setFilters({ budget: '', capacity: '', availability: 'all' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-yellow-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Hyderabad HallBook</h1>
            <p className="text-red-100 text-sm">Celebrate Simply</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5zm0 0v-2a4 4 0 00-4-4H8m0 0H3m5 0V5a3 3 0 013-3h6a3 3 0 013 3v6" />
              </svg>
            </button>
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5zm0 0v-2a4 4 0 00-4-4H8m0 0H3m5 0V5a3 3 0 013-3h6a3 3 0 013 3v6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search halls in Hyderabad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 bg-white/90 text-gray-800 rounded-xl focus:outline-none focus:bg-white transition-colors placeholder-gray-500"
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
          </button>
        </div>

        {/* Location Indicator */}
        <div className="flex items-center text-red-100 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span>500005 - Bandlaguda Jagir, Chandrayangutta</span>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white m-4 p-4 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget (Max)</label>
              <select 
                value={filters.budget} 
                onChange={(e) => setFilters({...filters, budget: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Any Budget</option>
                <option value="30000">Under ₹30,000</option>
                <option value="40000">Under ₹40,000</option>
                <option value="50000">Under ₹50,000</option>
                <option value="60000">Under ₹60,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (Min)</label>
              <select 
                value={filters.capacity} 
                onChange={(e) => setFilters({...filters, capacity: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Any Capacity</option>
                <option value="200">200+ guests</option>
                <option value="300">300+ guests</option>
                <option value="500">500+ guests</option>
                <option value="800">800+ guests</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select 
                value={filters.availability} 
                onChange={(e) => setFilters({...filters, availability: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Venues</option>
                <option value="available">Available Only</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button 
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear Filters
            </button>
            <button 
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Map View */}
      <div className="p-4">
        <MapView 
          onVenueSelect={handleVenueSelect}
          selectedVenue={selectedVenue}
          filters={filters}
        />
      </div>

      {/* Quick Services */}
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Services</h2>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => navigate('/services', { state: { service } })}
              className="flex-shrink-0 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 min-w-24 text-center transform hover:scale-105"
            >
              <div className="text-2xl mb-2">{service.icon}</div>
              <div className="text-xs font-medium text-gray-700">{service.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Venue List */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Function Halls ({filteredVenues.length})
          </h2>
          <div className="flex space-x-2">
            <button className="p-2 bg-white rounded-lg shadow-md">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button className="p-2 bg-white rounded-lg shadow-md">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredVenues.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              onBook={handleBookVenue}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No venues found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
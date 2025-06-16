import React, { useState, useEffect } from 'react';
import { getFromLocalStorage } from '../data/mock';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const savedBookings = getFromLocalStorage('userBookings', []);
    setBookings(savedBookings);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterBookings = (status) => {
    if (status === 'upcoming') {
      return bookings.filter(booking => 
        booking.status === 'confirmed' || booking.status === 'pending'
      );
    }
    if (status === 'completed') {
      return bookings.filter(booking => booking.status === 'completed');
    }
    if (status === 'cancelled') {
      return bookings.filter(booking => booking.status === 'cancelled');
    }
    return bookings;
  };

  const filteredBookings = filterBookings(activeTab);

  const EmptyState = ({ type }) => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">
        {type === 'upcoming' ? '📅' : type === 'completed' ? '✅' : '❌'}
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        No {type} bookings
      </h3>
      <p className="text-gray-500 mb-6">
        {type === 'upcoming' 
          ? "You don't have any upcoming bookings yet." 
          : type === 'completed'
          ? "No completed bookings to show."
          : "No cancelled bookings."
        }
      </p>
      {type === 'upcoming' && (
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
          Browse Venues
        </button>
      )}
    </div>
  );

  const BookingCard = ({ booking }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{booking.venueName}</h3>
          <p className="text-gray-600">{booking.venueLocation}</p>
          <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
          {booking.status?.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Event Date</p>
          <p className="font-semibold">{new Date(booking.eventDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Guests</p>
          <p className="font-semibold">{booking.guestCount || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="font-semibold text-green-600">₹{booking.totalAmount?.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Booking Date</p>
          <p className="font-semibold">{new Date(booking.bookingDate).toLocaleDateString()}</p>
        </div>
      </div>

      {booking.services && booking.services.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Additional Services</p>
          <div className="flex flex-wrap gap-2">
            {booking.services.map((service, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {service.name} - ₹{service.price?.toLocaleString()}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex space-x-3 pt-4 border-t border-gray-100">
        <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          View Details
        </button>
        {booking.status === 'confirmed' && (
          <button className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Contact Venue
          </button>
        )}
        {booking.status === 'pending' && (
          <button className="flex-1 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
            Pay Now
          </button>
        )}
      </div>
    </div>
  );

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: filterBookings('upcoming').length },
    { id: 'completed', label: 'Completed', count: filterBookings('completed').length },
    { id: 'cancelled', label: 'Cancelled', count: filterBookings('cancelled').length }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-yellow-600 text-white p-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-red-100 text-sm">Manage your venue reservations</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-2 text-center transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-red-600 text-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="font-medium">{tab.label}</div>
              {tab.count > 0 && (
                <div className={`inline-block ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {filteredBookings.length === 0 ? (
          <EmptyState type={activeTab} />
        ) : (
          <div>
            {filteredBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {bookings.length > 0 && (
        <div className="fixed bottom-20 right-4 space-y-2">
          <button className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Bookings;
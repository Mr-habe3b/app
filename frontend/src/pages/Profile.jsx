import React, { useState, useEffect } from 'react';
import { mockUser, getFromLocalStorage, saveToLocalStorage } from '../data/mock';

const Profile = () => {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(mockUser);

  useEffect(() => {
    const savedUser = getFromLocalStorage('currentUser', mockUser);
    setUser(savedUser);
    setEditedUser(savedUser);
  }, []);

  const handleSave = () => {
    setUser(editedUser);
    saveToLocalStorage('currentUser', editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const menuItems = [
    { icon: '🏠', label: 'My Bookings', description: 'View booking history', action: () => {} },
    { icon: '❤️', label: 'Favorites', description: 'Saved venues and services', action: () => {} },
    { icon: '🔔', label: 'Notifications', description: 'Booking updates and offers', action: () => {} },
    { icon: '💳', label: 'Payment Methods', description: 'Manage cards and UPI', action: () => {} },
    { icon: '📍', label: 'Addresses', description: 'Delivery and event locations', action: () => {} },
    { icon: '🎯', label: 'Preferences', description: 'Language and region settings', action: () => {} },
    { icon: '🛡️', label: 'Privacy & Security', description: 'Account protection settings', action: () => {} },
    { icon: '📞', label: 'Help & Support', description: '24/7 customer assistance', action: () => {} },
    { icon: '⭐', label: 'Rate Our App', description: 'Help us improve', action: () => {} }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-yellow-600 text-white p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="p-4 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <img 
                src={user.profileImage} 
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Full Name"
                  />
                  <input
                    type="tel"
                    value={editedUser.phone}
                    onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Phone Number"
                  />
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Email Address"
                  />
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleSave}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Save
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-gray-600">{user.phone}</p>
                  <p className="text-gray-600">{user.email}</p>
                  
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-sm text-gray-600">Verified Account</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">12</div>
              <div className="text-xs text-gray-600">Total Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-600">5</div>
              <div className="text-xs text-gray-600">Favorites</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">₹2.5L</div>
              <div className="text-xs text-gray-600">Total Spent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-4 transform hover:scale-[1.02]"
          >
            <div className="text-2xl">{item.icon}</div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-800">{item.label}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      {/* App Info */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🏛️</div>
          <h3 className="font-bold text-gray-800">Hyderabad HallBook</h3>
          <p className="text-sm text-gray-600 mb-2">Version 1.0.0</p>
          <p className="text-xs text-gray-500">Made with ❤️ for Hyderabad</p>
          
          <div className="flex justify-center space-x-4 mt-4 text-sm">
            <button className="text-red-600 hover:underline">Privacy Policy</button>
            <span className="text-gray-300">•</span>
            <button className="text-red-600 hover:underline">Terms of Service</button>
            <span className="text-gray-300">•</span>
            <button className="text-red-600 hover:underline">About Us</button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button className="w-full bg-red-50 text-red-600 p-4 rounded-xl hover:bg-red-100 transition-colors font-semibold">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
import React, { useState, useEffect } from 'react';
import { weddingBudget, guestList, weddingTimeline, saveToLocalStorage, getFromLocalStorage } from '../data/mock';

const WeddingTools = () => {
  const [activeTab, setActiveTab] = useState('budget');
  const [budget, setBudget] = useState(weddingBudget);
  const [guests, setGuests] = useState(guestList);
  const [timeline, setTimeline] = useState(weddingTimeline);
  const [newGuest, setNewGuest] = useState({ name: '', relation: '', phone: '', category: 'Family' });
  const [showAddGuest, setShowAddGuest] = useState(false);

  useEffect(() => {
    // Load data from localStorage
    const savedBudget = getFromLocalStorage('weddingBudget', weddingBudget);
    const savedGuests = getFromLocalStorage('guestList', guestList);
    const savedTimeline = getFromLocalStorage('weddingTimeline', weddingTimeline);
    
    setBudget(savedBudget);
    setGuests(savedGuests);
    setTimeline(savedTimeline);
  }, []);

  const addGuest = () => {
    if (newGuest.name && newGuest.relation) {
      const guest = {
        id: `g${Date.now()}`,
        ...newGuest,
        invited: false,
        confirmed: false
      };
      const updatedGuests = [...guests, guest];
      setGuests(updatedGuests);
      saveToLocalStorage('guestList', updatedGuests);
      setNewGuest({ name: '', relation: '', phone: '', category: 'Family' });
      setShowAddGuest(false);
    }
  };

  const toggleGuestStatus = (guestId, field) => {
    const updatedGuests = guests.map(guest => 
      guest.id === guestId ? { ...guest, [field]: !guest[field] } : guest
    );
    setGuests(updatedGuests);
    saveToLocalStorage('guestList', updatedGuests);
  };

  const updateTimelineStatus = (timelineId, status) => {
    const updatedTimeline = timeline.map(item => 
      item.id === timelineId ? { ...item, status } : item
    );
    setTimeline(updatedTimeline);
    saveToLocalStorage('weddingTimeline', updatedTimeline);
  };

  const BudgetTracker = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-800 to-yellow-600 text-white p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-2">Total Wedding Budget</h3>
        <div className="text-3xl font-bold">₹{budget.totalBudget.toLocaleString()}</div>
        <div className="text-red-100 text-sm mt-1">
          Allocated: ₹{Object.values(budget.allocated).reduce((a, b) => a + b, 0).toLocaleString()} | 
          Spent: ₹{Object.values(budget.spent).reduce((a, b) => a + b, 0).toLocaleString()}
        </div>
      </div>

      <div className="grid gap-4">
        {budget.categories.map((category, index) => {
          const percentage = (category.spent / category.budgeted) * 100;
          return (
            <div key={index} className="bg-white p-4 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-gray-800">{category.name}</h4>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    ₹{category.spent.toLocaleString()} / ₹{category.budgeted.toLocaleString()}
                  </div>
                  <div className={`text-xs ${percentage > 90 ? 'text-red-600' : 'text-green-600'}`}>
                    {percentage.toFixed(1)}% used
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: category.color }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const GuestList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Guest List</h3>
        <button 
          onClick={() => setShowAddGuest(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Add Guest
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-600">{guests.length}</div>
          <div className="text-sm text-blue-800">Total Guests</div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-600">{guests.filter(g => g.invited).length}</div>
          <div className="text-sm text-green-800">Invited</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-yellow-600">{guests.filter(g => g.confirmed).length}</div>
          <div className="text-sm text-yellow-800">Confirmed</div>
        </div>
      </div>

      {/* Guest List */}
      <div className="space-y-3">
        {guests.map(guest => (
          <div key={guest.id} className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-800">{guest.name}</h4>
                <p className="text-sm text-gray-600">{guest.relation} • {guest.category}</p>
                {guest.phone && <p className="text-xs text-gray-500">{guest.phone}</p>}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => toggleGuestStatus(guest.id, 'invited')}
                  className={`px-3 py-1 rounded-full text-xs ${
                    guest.invited ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {guest.invited ? 'Invited' : 'Not Invited'}
                </button>
                <button 
                  onClick={() => toggleGuestStatus(guest.id, 'confirmed')}
                  className={`px-3 py-1 rounded-full text-xs ${
                    guest.confirmed ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {guest.confirmed ? 'Confirmed' : 'Pending'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Guest Modal */}
      {showAddGuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add New Guest</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Guest Name"
                value={newGuest.name}
                onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Relation (e.g., Uncle, Friend)"
                value={newGuest.relation}
                onChange={(e) => setNewGuest({...newGuest, relation: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newGuest.phone}
                onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <select
                value={newGuest.category}
                onChange={(e) => setNewGuest({...newGuest, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
                <option value="Colleagues">Colleagues</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowAddGuest(false)}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={addGuest}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Add Guest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const Timeline = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">Wedding Timeline</h3>
      
      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                item.status === 'completed' ? 'bg-green-100 text-green-600' :
                item.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {index + 1}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{item.event}</h4>
                  <div className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()} at {item.time}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => updateTimelineStatus(item.id, 'completed')}
                    className={`px-3 py-1 rounded-full text-xs ${
                      item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Completed
                  </button>
                  <button 
                    onClick={() => updateTimelineStatus(item.id, 'pending')}
                    className={`px-3 py-1 rounded-full text-xs ${
                      item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Pending
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'budget', label: 'Budget Tracker', icon: '💰' },
    { id: 'guests', label: 'Guest List', icon: '👥' },
    { id: 'timeline', label: 'Timeline', icon: '📅' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-yellow-600 text-white p-6">
        <h1 className="text-2xl font-bold">Wedding Tools</h1>
        <p className="text-red-100 text-sm">Plan your perfect celebration</p>
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
              <div className="text-lg mb-1">{tab.icon}</div>
              <div className="text-xs font-medium">{tab.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'budget' && <BudgetTracker />}
        {activeTab === 'guests' && <GuestList />}
        {activeTab === 'timeline' && <Timeline />}
      </div>
    </div>
  );
};

export default WeddingTools;
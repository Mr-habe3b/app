import React, { useState } from 'react';

const Support = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! Welcome to Hyderabad HallBook support. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const faqs = [
    {
      question: 'How do I book a function hall?',
      answer: 'Simply browse through our map-based interface, select a hall that suits your needs, choose your date and services, and complete the booking with our one-click payment system.'
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking. Full refund 7 days prior, 50% refund for 3-7 days, and no refund within 3 days of the event.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept UPI, credit cards, debit cards, and net banking through our secure Razorpay integration.'
    },
    {
      question: 'Are the prices negotiable?',
      answer: 'Our platform offers competitive prices that are already 10-20% lower than offline vendors. Prices are fixed to ensure transparency.'
    },
    {
      question: 'Do you provide catering services?',
      answer: 'Yes, we offer various catering services including traditional Hyderabadi cuisine, multi-cuisine options, and customized menus.'
    },
    {
      question: 'How can I contact the venue directly?',
      answer: 'Once you book a venue, you will receive the venue contact details for direct coordination.'
    }
  ];

  const supportOptions = [
    {
      title: '24/7 Live Chat',
      description: 'Get instant help from our support team',
      icon: '💬',
      action: () => setActiveTab('chat')
    },
    {
      title: 'Call Support',
      description: 'Speak directly with our experts',
      icon: '📞',
      action: () => window.location.href = 'tel:+919876543210'
    },
    {
      title: 'Email Support',
      description: 'Send us detailed queries',
      icon: '📧',
      action: () => window.location.href = 'mailto:support@hyderabadhallbook.com'
    },
    {
      title: 'WhatsApp',
      description: 'Quick support via WhatsApp',
      icon: '📱',
      action: () => window.open('https://wa.me/919876543210', '_blank')
    }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        type: 'user',
        message: newMessage,
        timestamp: new Date()
      };
      
      setChatMessages([...chatMessages, userMessage]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botMessage = {
          id: chatMessages.length + 2,
          type: 'bot',
          message: 'Thank you for your message. Our support team will assist you shortly. Is there anything specific you need help with regarding venue booking?',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const ChatInterface = () => (
    <div className="flex flex-col h-96">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-t-xl">
        {chatMessages.map(message => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
              message.type === 'user' 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-gray-800 shadow-sm'
            }`}>
              <p className="text-sm">{message.message}</p>
              <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-red-100' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-white border-t border-gray-200 rounded-b-xl">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <button 
            onClick={sendMessage}
            className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  const FAQSection = () => (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100">
          <details className="group">
            <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-800">{faq.question}</h3>
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4">
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          </details>
        </div>
      ))}
    </div>
  );

  const tabs = [
    { id: 'chat', label: 'Live Chat', icon: '💬' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'contact', label: 'Contact', icon: '📞' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-yellow-600 text-white p-6">
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-red-100 text-sm">We're here to help you 24/7</p>
      </div>

      {/* Quick Support Options */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Get Help Instantly</h2>
        <div className="grid grid-cols-2 gap-3">
          {supportOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-center transform hover:scale-105"
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <h3 className="font-semibold text-gray-800 text-sm">{option.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{option.description}</p>
            </button>
          ))}
        </div>
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
        {activeTab === 'chat' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">24/7 Live Support</h2>
            <ChatInterface />
          </div>
        )}
        
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <FAQSection />
          </div>
        )}
        
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Phone Support</p>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-xs text-gray-500">Available 24/7</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email Support</p>
                    <p className="text-gray-600">support@hyderabadhallbook.com</p>
                    <p className="text-xs text-gray-500">Response within 2 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Office Address</p>
                    <p className="text-gray-600">T-Hub, IIIT Campus, Hyderabad</p>
                    <p className="text-xs text-gray-500">Mon-Sat, 9 AM - 8 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Send us a Message</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                    <option>Booking Issue</option>
                    <option>Payment Problem</option>
                    <option>Venue Query</option>
                    <option>Service Request</option>
                    <option>Technical Support</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows="4"
                    placeholder="Describe your issue or query in detail..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 resize-none"
                  ></textarea>
                </div>
                
                <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
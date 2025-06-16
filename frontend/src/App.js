import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import WeddingTools from "./pages/WeddingTools";
import Profile from "./pages/Profile";
import Support from "./pages/Support";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/wedding-tools" element={<WeddingTools />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
          </Routes>
          <Navigation />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
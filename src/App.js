import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profiles from './pages/Profiles';
import ProfileDetails from './pages/ProfileDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Other main routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />

        {/* Catch-all route for unmatched URLs */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

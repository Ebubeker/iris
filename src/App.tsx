import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
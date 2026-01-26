import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import CookiesPolicy from './pages/CookiesPolicy';
import AccessibilityStatement from './pages/AccessibilityStatement';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen relative">
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
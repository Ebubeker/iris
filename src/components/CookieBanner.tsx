import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from './ui/button';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/rejected cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    console.log('Cookie consent value:', cookieConsent); // Debug log
    if (!cookieConsent) {
      // Show banner after a small delay for better UX
      setTimeout(() => {
        console.log('Showing cookie banner'); // Debug log
        setIsVisible(true);
      }, 1000);
    } else {
      console.log('Cookie banner hidden - user already responded'); // Debug log
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      dir="rtl"
      style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999, backgroundColor: 'white', padding: '10px', borderTop: '1px solid #e0e0e0' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Close button - top right on mobile */}
          <button
            onClick={handleReject}
            className="absolute top-4 left-4 md:hidden text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="סגור"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-right">
            <p className="text-gray-700 leading-relaxed">
              כדי להעניק לך חוויית גלישה נעימה ומדויקת, האתר עושה שימוש בעוגיות (Cookies).
              <br className="hidden md:block" />
              המשך השימוש באתר או לחיצה על אישור משמעה הסכמה לשימוש בעוגיות בהתאם ל
              <Link
                to="/cookies-policy"
                className="text-orange-500 hover:text-orange-600 underline mx-1"
              >
                מדיניות הפרטיות שלנו
              </Link>.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              onClick={handleAccept}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 w-full sm:w-1/2"
              style={{ width: '50%' }}
            >
              אישור
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-2 w-full sm:w-1/2"
              style={{ width: '50%' }}
            >
              <Link to="/cookies-policy">
                מידע נוסף
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;


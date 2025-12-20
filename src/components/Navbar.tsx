import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { MessageCircle, Menu, X } from 'lucide-react';
// @ts-ignore
import logo from 'figma:asset/5238df62aa5d3c4e2b5040b827041631a24389b9.png';

interface NavbarProps {
  activeSection?: 'home' | 'blogs' | 'admin';
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
}

export default function Navbar({ activeSection, showBackButton, backButtonText = 'חזור', backButtonHref = '/' }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
  const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
  const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Function to handle section navigation
  const handleSectionClick = (sectionId: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu if open
    
    if (location.pathname === '/') {
      // If we're on the home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // If we're on another page, navigate to home with hash
      navigate(`/#${sectionId}`);
    }
  };

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div ref={mobileMenuRef}>
        <header className="bg-white w-full backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
          <div className="flex justify-between items-center h-16" style={{height: '80px'}}>
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img src={'/logo.png'} alt="לוגו איריס שני - יועצת משאבי אנוש" style={{
                  height: '66px'
                }} className=" w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            {showBackButton ? (
              <nav className="flex items-center">
                <Link 
                  to={backButtonHref} 
                  className="text-gray-700 hover:text-orange-500 transition-colors"
                >
                  {backButtonText}
                </Link>
              </nav>
            ) : (
              <nav className="items-center space-x-reverse" style={{ display: isMobile ? 'none' : 'flex' }}>
                <Link 
                  to="/" 
                  className={`transition-colors ml-8 ${
                    activeSection === 'home' 
                      ? 'text-orange-500 font-medium' 
                      : 'text-gray-700 hover:text-orange-500'
                  }`}
                >
                  בית
                </Link>
                <button
                  onClick={() => setIsAboutDialogOpen(true)}
                  className="text-gray-700 hover:text-orange-500 transition-colors ml-8"
                >
                  עלי
                </button>
                <button 
                  onClick={() => handleSectionClick('employee-services')}
                  className="text-gray-700 hover:text-orange-500 transition-colors ml-8"
                >
                  שירותים לעובדים
                </button>
                <button 
                  onClick={() => handleSectionClick('employer-services')}
                  className="text-gray-700 hover:text-orange-500 transition-colors ml-8"
                >
                  שירותים למעסיקים
                </button>
                <button 
                  onClick={() => handleSectionClick('about')}
                  className="text-gray-700 hover:text-orange-500 transition-colors ml-8"
                >
                  אודותיי
                </button>
                <Link 
                  to="/blogs" 
                  className={`transition-colors ml-8 ${
                    activeSection === 'blogs' 
                      ? 'text-orange-500 font-medium' 
                      : 'text-gray-700 hover:text-orange-500'
                  }`}
                >
                  בלוג
                </Link>
                <button 
                  onClick={() => handleSectionClick('contact')}
                  className="text-gray-700 hover:text-orange-500 transition-colors ml-12"
                >
                  צור קשר
                </button>
              </nav>
            )}

            {/* Mobile menu button and Desktop WhatsApp CTA */}
            <div className="flex items-center">
              {!showBackButton && isMobile && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-700 hover:text-orange-500 transition-colors"
                  style={{ 
                    marginLeft: '1rem',
                    display: 'block'
                  }}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              )}
              
              {/* WhatsApp CTA - Hidden on mobile when menu is open */}
              <Button 
                className={`bg-orange-500 hover:bg-orange-600 text-white ${
                  isMobileMenuOpen && !showBackButton ? 'hidden' : ''
                }`} 
                asChild
              >
                <a href="https://wa.me/972508836955" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">צור קשר עכשיו</span>
                  <span className="sm:hidden">צור קשר</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {!showBackButton && isMobile && (
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileMenuOpen ? 'block' : 'hidden'
            }`}
            style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
          >
            <nav className="bg-white border-t border-gray-200 shadow-lg relative z-50">
              <div className="max-w-7xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/" 
                    className={`block w-full text-right transition-colors rounded-lg ${
                      activeSection === 'home' 
                        ? 'text-orange-500 font-medium bg-orange-50' 
                        : 'text-gray-700 hover:text-orange-500 hover:bg-gray-50'
                    }`}
                    style={{ padding: '0.75rem 1rem', display: 'block', width: '100%' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    בית
                  </Link>
                  <button
                    onClick={() => {
                      setIsAboutDialogOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-right text-gray-700 hover:text-orange-500 hover:bg-gray-50 transition-colors rounded-lg block"
                    style={{ padding: '0.75rem 1rem', display: 'block', width: '100%' }}
                  >
                    עלי
                  </button>
                  <button 
                    onClick={() => handleSectionClick('employee-services')}
                    className="block w-full text-right text-gray-700 hover:text-orange-500 hover:bg-gray-50 transition-colors rounded-lg"
                    style={{ padding: '0.75rem 1rem', display: 'block', width: '100%' }}
                  >
                    שירותים לעובדים
                  </button>
                  <button 
                    onClick={() => handleSectionClick('employer-services')}
                    className="block w-full text-right text-gray-700 hover:text-orange-500 hover:bg-gray-50 transition-colors rounded-lg"
                    style={{ padding: '0.75rem 1rem', display: 'block', width: '100%' }}
                  >
                    שירותים למעסיקים
                  </button>
                  <button 
                    onClick={() => handleSectionClick('about')}
                    className="block w-full text-right text-gray-700 hover:text-orange-500 hover:bg-gray-50 transition-colors rounded-lg"
                    style={{ padding: '0.75rem 1rem', display: 'block', width: '100%' }}
                  >
                    אודותיי
                  </button>
                  <Link 
                    to="/blogs" 
                    className={`block w-full text-right transition-colors rounded-lg ${
                      activeSection === 'blogs' 
                        ? 'text-orange-500 font-medium bg-orange-50' 
                        : 'text-gray-700 hover:text-orange-500 hover:bg-gray-50'
                    }`}
                    style={{ padding: '0.75rem 1rem', display: 'block', width: '100%' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    בלוג
                  </Link>
                  <button 
                    onClick={() => handleSectionClick('contact')}
                    className="block w-full text-right text-gray-700 hover:text-orange-500 hover:bg-gray-50 transition-colors rounded-lg"
                    style={{ padding: '0.75rem 1rem', display: 'block', width: '100%' }}
                  >
                    צור קשר
                  </button>
                </div>

                {/* Mobile WhatsApp CTA */}
                <div style={{ marginTop: '1rem', paddingTop: '1rem' }} className="border-t border-gray-200">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" asChild>
                    <a 
                      href="https://wa.me/972508836955" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      צור קשר עכשיו
                    </a>
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
        </header>
      </div>

      {/* About Dialog */}
      <Dialog open={isAboutDialogOpen} onOpenChange={setIsAboutDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-right">
              נעים להכיר - אני איריס שני
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 text-right" style={{ paddingTop: '1rem' }}>
            <div>
              <p className="text-gray-700 leading-relaxed text-right" style={{ marginBottom: '1.5rem' }}>
                עם יותר מ-20 שנות ניסיון בעולם השכר, יחסי העבודה וגיוס עובדים, למדתי דבר אחד חשוב -
                מאחורי כל תלוש, חוזה או תהליך גיוס עומד אדם.
                וכל אדם הוא עולם בפני עצמו, עם צרכים, חלומות ונסיבות חיים ייחודיות.
              </p>

              <p className="text-gray-700 leading-relaxed text-right" style={{ marginBottom: '1.5rem' }}>
                המטרה שלי פשוטה - לעשות סדר, להרגיע, ללוות ולהחזיר ביטחון לעובדים ולמעסיקים.
              </p>

              <p className="text-gray-700 leading-relaxed text-right" style={{ marginBottom: '1.5rem' }}>
                לעובדים - אני עוזרת להבין את תנאי ההעסקה והשכר, לבדוק זכויות, לנתח תלושי שכר ולהתנהל נכון מול ביטוח לאומי ומס הכנסה.
                למעסיקים - אני מציעה ליווי מקצועי בגיוס והשמה, בבניית חוזי עבודה ובהתנהלות שוטפת עם עובדים - כאילו יש להם מנהלת משאבי אנוש צמודה לעסק.
              </p>

              <p className="text-gray-700 leading-relaxed text-right" style={{ marginBottom: '1.5rem' }}>
                אני רואה בעצמי גשר בין אנשים לעולם העבודה -
                "מתווכת אמון" שמחברת בין מעסיקים הוגנים שאני מאמינה בהם לבין עובדים שאני מזהה אצלם את הפוטנציאל, המחויבות והערך האנושי.
              </p>

              <p className="text-gray-700 leading-relaxed text-right">
                הכול נעשה בגישה אישית, באמפתיה מלאה, בשפה פשוטה וברורה -
                ובמחירים נגישים שמתאימים לעובדים ולעסקים קטנים ובינוניים.
              </p>
            </div>

            <div className="flex justify-center border-t" style={{ paddingTop: '1.5rem' }}>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                style={{ paddingLeft: '2rem', paddingRight: '2rem', marginRight: '1rem' }}
                asChild
              >
                <a href="https://wa.me/972508836955" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  בואו נדבר
                </a>
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsAboutDialogOpen(false)}
                style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
              >
                סגור
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog open={isTermsDialogOpen} onOpenChange={setIsTermsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-right">
              תנאי שימוש - אתר iris-hr.work
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 text-right" style={{ paddingTop: '1rem' }}>
            <div>
              <p className="text-gray-700 leading-relaxed text-right">
                ברוכים הבאים לאתר של איריס שני - ייעוץ לעובדים ולמעסיקים (להלן: "האתר").
                השימוש באתר זה כפוף לתנאים המפורטים להלן.
                אנא קרא אותם בקפידה, שכן השימוש באתר מעיד על הסכמתך להם.
              </p>
            </div>

            <div>
              <h4 className="text-lg text-gray-900 text-right" style={{ marginBottom: '0.75rem' }}>1. מטרת האתר</h4>
              <p className="text-gray-700 leading-relaxed text-right">
                האתר נועד לספק מידע כללי, טיפים מקצועיים ותוכן כללי בנושאי דיני עבודה, שכר, זכויות עובדים ויחסי עבודה.
                התכנים באתר ניתנים לצורכי ידע והכוונה בלבד, ואינם מהווים ייעוץ משפטי, חשבונאי או מקצועי מכל סוג.
              </p>
            </div>

            <div>
              <h4 className="text-lg text-gray-900 text-right" style={{ marginBottom: '0.75rem' }}>2. אין באמור באתר משום תחליף לייעוץ משפטי</h4>
              <p className="text-gray-700 leading-relaxed text-right">
                התכנים באתר אינם מהווים תחליף לייעוץ אישי מקצועי או משפטי.
                איריס שני אינה אחראית לכל פעולה שתבוצע על סמך מידע המתפרסם באתר, וכל משתמש נושא באחריות המלאה לשימוש שהוא עושה בתוכן.
                מומלץ לפנות באופן אישי לייעוץ פרטני לפני קבלת החלטות הקשורות לדיני עבודה, שכר או מיסוי.
              </p>
            </div>

            <div className="flex justify-center" style={{ paddingTop: '1.5rem' }}>
              <Button
                variant="outline"
                onClick={() => setIsTermsDialogOpen(false)}
                style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
              >
                סגור
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Dialog */}
      <Dialog open={isPrivacyDialogOpen} onOpenChange={setIsPrivacyDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-right">
              מדיניות פרטיות - אתר iris-hr.work
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 text-right" style={{ paddingTop: '1rem' }}>
            <div>
              <p className="text-gray-700 leading-relaxed text-right">
                ברוכים הבאים לאתר של איריס שני - ייעוץ לעובדים ולמעסיקים (להלן: "האתר").
                שמירה על פרטיות המבקרים והלקוחות שלנו חשובה לנו מאוד. מטרת מסמך זה היא להסביר כיצד אנו אוספים, משתמשים ושומרים על המידע האישי הנמסר לנו דרך האתר.
              </p>
            </div>

            <div>
              <h4 className="text-lg text-gray-900 text-right" style={{ marginBottom: '0.75rem' }}>1. איזה מידע אנו אוספים?</h4>
              <p className="text-gray-700 leading-relaxed text-right">
                המידע שאנו עשויים לאסוף כולל: שם מלא, מספר טלפון, כתובת דוא"ל, ומידע נוסף שתבחרו לשתף עימנו בעת יצירת קשר או קביעת פגישה.
                בנוסף, אנו עשויים לאסוף מידע טכני כללי כגון כתובת IP וסוג הדפדפן לצורכי שיפור חוויית הגלישה באתר.
              </p>
            </div>

            <div>
              <h4 className="text-lg text-gray-900 text-right" style={{ marginBottom: '0.75rem' }}>2. כיצד אנו משתמשים במידע?</h4>
              <p className="text-gray-700 leading-relaxed text-right">
                המידע שאנו אוספים משמש אותנו לצורך מתן שירות מקצועי, יצירת קשר עם לקוחות פוטנציאליים, קביעת פגישות וייעוץ.
                אנו לא נעשה שימוש במידע שלכם למטרות שיווק או פרסום ללא הסכמתכם המפורשת.
              </p>
            </div>

            <div className="flex justify-center" style={{ paddingTop: '1.5rem' }}>
              <Button
                variant="outline"
                onClick={() => setIsPrivacyDialogOpen(false)}
                style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
              >
                סגור
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

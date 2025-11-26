import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import CookieBanner from '../components/CookieBanner';

export default function CookiesPolicy() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative" dir="rtl">
      <SEO 
        title="מדיניות עוגיות - איריס שני יועצת משאבי אנוש"
        description="מדיניות עוגיות מפורטת של איריס שני יועצת משאבי אנוש - איך אנו משתמשים בעוגיות באתר"
        keywords="מדיניות עוגיות, cookies, עוגיות, איריס שני, משאבי אנוש"
        url="/cookies-policy"
        image="/background.png"
      />
      
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 to-orange-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
          <div className="max-w-4xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl text-gray-900 leading-tight" style={{ fontWeight: 500, marginBottom: '1rem' }}>
                מדיניות עוגיות
              </h1>
              <p className="text-xl text-gray-700" style={{ marginBottom: '2rem' }}>
                איך אנו משתמשים בעוגיות באתר
              </p>
              <div className="text-sm text-gray-600">
                עודכן לאחרונה: 15 ספטמבר 2025
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="max-w-4xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="prose prose-lg max-w-none" style={{ direction: 'rtl', textAlign: 'right' }}>
              
              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">1. מה הן עוגיות?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  עוגיות (Cookies) הן קבצים קטנים הנשמרים במכשיר שלכם כאשר אתם מבקרים באתר. 
                  הן מסייעות לאתר לזכור מידע על הביקור שלכם, כגון העדפות הגלישה והתנהגות באתר.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  עוגיות יכולות להיות "עוגיות זמניות" (Session Cookies) שנמחקות כשאתם סוגרים את הדפדפן, 
                  או "עוגיות קבועות" (Persistent Cookies) שנשמרות במכשיר שלכם לפרק זמן מסוים.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">2. איך אנו משתמשים בעוגיות?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  אנו משתמשים בעוגיות למטרות הבאות:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4" style={{ paddingRight: '1.5rem' }}>
                  <li>שיפור חוויית הגלישה באתר</li>
                  <li>זכירת העדפות הגלישה שלכם</li>
                  <li>ניתוח התנהגות הגולשים באתר</li>
                  <li>שיפור ביצועי האתר</li>
                  <li>הבטחת אבטחת האתר</li>
                  <li>מתן שירותים מותאמים אישית</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">3. סוגי עוגיות שאנו משתמשים בהן</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl text-gray-800 mb-3">עוגיות הכרחיות (Essential Cookies)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    עוגיות אלה הכרחיות לתפקוד הבסיסי של האתר ואי אפשר להשבית אותן. 
                    הן כוללות עוגיות אבטחה, עוגיות זיהוי משתמש ועוגיות העדפות בסיסיות.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl text-gray-800 mb-3">עוגיות ביצועים (Performance Cookies)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    עוגיות אלה עוזרות לנו להבין איך מבקרים משתמשים באתר, 
                    על ידי איסוף מידע אנונימי על דפים שנצפו וזמן שהייה באתר.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl text-gray-800 mb-3">עוגיות פונקציונליות (Functional Cookies)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    עוגיות אלה מאפשרות לאתר לזכור בחירות שעשיתם (כמו שם משתמש, 
                    שפה או אזור) ולספק תכונות משופרות ומותאמות אישית.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl text-gray-800 mb-3">עוגיות שיווק (Marketing Cookies)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    עוגיות אלה משמשות לעקוב אחר מבקרים באתרים שונים. 
                    המטרה היא להציג מודעות רלוונטיות ומעוררות עניין עבור המשתמש הבודד.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">4. עוגיות של צדדים שלישיים</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  האתר שלנו עשוי להכיל עוגיות של צדדים שלישיים, כגון:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4" style={{ paddingRight: '1.5rem' }}>
                  <li>Google Analytics - לניתוח תנועה באתר</li>
                  <li>Google Maps - להצגת מפות</li>
                  <li>רשתות חברתיות - לכפתורי שיתוף</li>
                  <li>ספקי שירותים אחרים - לשיפור חוויית המשתמש</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  עוגיות אלה כפופות למדיניות הפרטיות של הצדדים השלישיים הרלוונטיים.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">5. איך לנהל עוגיות</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  תוכלו לנהל עוגיות באמצעות הגדרות הדפדפן שלכם:
                </p>
                
                <div className="mb-4">
                  <h3 className="text-lg text-gray-800 mb-2">Chrome</h3>
                  <p className="text-gray-700 leading-relaxed">
                    הגדרות → פרטיות ואבטחה → עוגיות ואתרים אחרים
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg text-gray-800 mb-2">Firefox</h3>
                  <p className="text-gray-700 leading-relaxed">
                    הגדרות → פרטיות ואבטחה → עוגיות ונתוני אתרים
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg text-gray-800 mb-2">Safari</h3>
                  <p className="text-gray-700 leading-relaxed">
                    העדפות → פרטיות → עוגיות ונתוני אתרים
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg text-gray-800 mb-2">Edge</h3>
                  <p className="text-gray-700 leading-relaxed">
                    הגדרות → עוגיות ואתרים → עוגיות ונתונים מאוחסנים
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">6. השפעות של השבתת עוגיות</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  השבתת עוגיות עלולה להשפיע על חוויית הגלישה באתר:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4" style={{ paddingRight: '1.5rem' }}>
                  <li>חלק מהתכונות באתר עלולות לא לעבוד כראוי</li>
                  <li>האתר עלול לא לזכור את ההעדפות שלכם</li>
                  <li>חוויית הגלישה עלולה להיות פחות מותאמת אישית</li>
                  <li>ייתכן שתצטרכו להזין מידע חוזר בכל ביקור</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">7. עוגיות ופרטיות</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  אנו מחויבים להגנה על הפרטיות שלכם. עוגיות שאנו משתמשים בהן:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4" style={{ paddingRight: '1.5rem' }}>
                  <li>לא מכילות מידע אישי מזהה</li>
                  <li>משמשות רק למטרות המוצהרות</li>
                  <li>נמחקות אוטומטית לאחר פרק זמן מסוים</li>
                  <li>מוגנות באמצעי אבטחה מתאימים</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">8. שינויים במדיניות</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  אנו עשויים לעדכן מדיניות עוגיות זו מעת לעת. כל שינוי יפורסם בדף זה 
                  עם תאריך העדכון. אנו ממליצים לכם לבדוק דף זה מעת לעת.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">9. יצירת קשר</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  לשאלות או הבהרות לגבי מדיניות עוגיות זו, ניתן ליצור קשר:
                </p>
                <ul className="list-none text-gray-700 leading-relaxed" style={{ paddingRight: '0' }}>
                  <li>📧 דוא"ל: info@iris-hr.work</li>
                  <li>📞 טלפון: 050-8836955</li>
                  <li>📍 כתובת: גבעת ברנר</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center md:text-right">
                <h3 className="text-lg mb-4">צור קשר</h3>
                <p className="text-gray-300">טלפון: 0508836955</p>
                <p className="text-gray-300">מייל: info@iris-hr.work</p>
                <p className="text-gray-300">מיקום: גבעת ברנר</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg mb-4">קישורים</h3>
                <div className="space-y-2">
                  <p><a href="/#employee-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים לעובדים</a></p>
                  <p><a href="/#employer-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים למעסיקים</a></p>
                  <p><a href="/#about" className="text-gray-300 hover:text-orange-500 transition-colors">אודותיי</a></p>
                  <p><Link to="/blogs" className="text-gray-300 hover:text-orange-500 transition-colors">בלוג</Link></p>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg mb-4">מידע משפטי</h3>
                <div className="space-y-2">
                  <p>
                    <Link to="/privacy-policy" className="text-gray-300 hover:text-orange-500 transition-colors">
                      מדיניות פרטיות
                    </Link>
                  </p>
                  <p>
                    <Link to="/terms-of-use" className="text-gray-300 hover:text-orange-500 transition-colors">
                      תנאי שימוש
                    </Link>
                  </p>
                  <p>
                    <Link to="/cookies-policy" className="text-gray-300 hover:text-orange-500 transition-colors">
                      מדיניות עוגיות
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center">
              <p className="text-gray-400">© {new Date().getFullYear()} איריס שני - ייעוץ משאבי אנוש. כל הזכויות שמורות.</p>
            </div>
          </div>
        </footer>
      </div>
      <CookieBanner />
    </div>
  );
}

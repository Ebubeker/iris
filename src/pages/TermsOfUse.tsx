import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import CookieBanner from '../components/CookieBanner';

export default function TermsOfUse() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative" dir="rtl">
      <SEO 
        title="תנאי שימוש - איריס שני יועצת משאבי אנוש"
        description="תנאי השימוש באתר איריס שני יועצת משאבי אנוש - כללים והגבלות לשימוש באתר ובשירותים"
        keywords="תנאי שימוש, כללי אתר, הגבלות שימוש, איריס שני, משאבי אנוש"
        url="/terms-of-use"
        image="/iris-og.png"
      />
      
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 to-orange-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
          <div className="max-w-4xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl text-gray-900 leading-tight" style={{ fontWeight: 500, marginBottom: '1rem' }}>
                תנאי שימוש
              </h1>
              <p className="text-xl text-gray-700" style={{ marginBottom: '2rem' }}>
                כללים והגבלות לשימוש באתר ובשירותים
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
                <h2 className="text-2xl text-gray-900 mb-4">1. הסכמה לתנאים</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  על ידי גישה ושימוש באתר זה, אתם מסכימים להיות כפופים לתנאי השימוש המפורטים להלן. 
                  אם אינכם מסכימים לתנאים אלה, אנא הימנעו משימוש באתר.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">2. תיאור השירותים</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  איריס שני יועצת משאבי אנוש מספקת שירותי ייעוץ מקצועי בתחום משאבי האנוש, כולל:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4" style={{ paddingRight: '1.5rem' }}>
                  <li>ייעוץ שכר ובדיקת זכויות עובדים</li>
                  <li>חישובי ניכויים והפרשות</li>
                  <li>בדיקת תלושי משכורת</li>
                  <li>אין בנאמר באתר משום ייעוץ משפטי</li>
                  <li>ייעוץ בנושאי פיצויי פיטורים</li>
                  <li>הדרכה בנושאי זכויות סוציאליות</li>
                  <li>שירותי ייעוץ נוספים בתחום משאבי האנוש</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">3. הגבלות שימוש</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  אסור להשתמש באתר למטרות הבאות:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4" style={{ paddingRight: '1.5rem' }}>
                  <li>פעילות בלתי חוקית או בלתי מוסרית</li>
                  <li>העברת תוכן מזיק, וירוסים או קוד זדוני</li>
                  <li>פגיעה בזכויות קניין רוחני של אחרים</li>
                  <li>שליחת ספאם או הודעות לא רצויות</li>
                  <li>ניסיון לפרוץ לאבטחת האתר</li>
                  <li>שימוש אוטומטי או בוטים ללא הרשאה מפורשת</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">4. זכויות קניין רוחני</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  כל התוכן באתר זה, כולל טקסטים, גרפיקה, לוגו, תמונות ותוכנה, הוא רכושה של איריס שני 
                  או של צדדים שלישיים שנתנו לה רישיון להשתמש בו, והוא מוגן על ידי חוקי זכויות יוצרים.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  אסור להעתיק, להפיץ, לשנות או ליצור יצירות נגזרות מהתוכן ללא הרשאה מפורשת בכתב.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">5. אחריות והגבלות</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  השירותים מסופקים "כפי שהם" ללא כל אחריות מפורשת או משתמעת. אנו לא נושאים באחריות:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4" style={{ paddingRight: '1.5rem' }}>
                  <li>לנכונות או דיוק המידע באתר</li>
                  <li>לזמינות או תפקוד רציף של האתר</li>
                  <li>לנזקים שעלולים להיגרם משימוש באתר</li>
                  <li>לתוכן של אתרים חיצוניים המקושרים לאתר</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">6. הגבלת אחריות</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  במקרה של הפרת תנאים אלה, האחריות שלנו תוגבל לסכום ששולם עבור השירותים, 
                  ולא תעלה על 1,000 ש"ח.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">7. שינויים בתנאים</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  אנו שומרים לעצמנו את הזכות לשנות את תנאי השימוש בכל עת. שינויים ייכנסו לתוקף 
                  מייד עם פרסומם באתר. המשך השימוש באתר לאחר השינויים מהווה הסכמה לתנאים החדשים.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">8. ביטול והשעיה</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  אנו שומרים לעצמנו את הזכות לבטל או להשעות את הגישה לאתר בכל עת, 
                  ללא הודעה מוקדמת, במקרה של הפרת תנאים אלה.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">9. חוק שולט</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  תנאי שימוש אלה כפופים לחוקי מדינת ישראל. כל סכסוך ייפתר בפני בתי המשפט המוסמכים בישראל.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">10. יצירת קשר</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  לשאלות, פניות או ייעוץ אישי ניתן ליצור קשר עם איריס שני בכתובת הדוא"ל:
                  info@iris-hr.work או בטלפון: 050-8836955
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">11. שינוי תנאים</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  אנו שומרים לעצמנו את הזכות לעדכן תנאי שימוש אלה מעת לעת. 
                  כל שינוי יפורסם בדף זה עם תאריך העדכון.
                </p>
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
                <p className="text-gray-300">טלפון: <a href="tel:+972508836955" className="hover:text-orange-500 transition-colors" dir="ltr">050-883-6955</a></p>
                <p className="text-gray-300">מייל: info@iris-hr.work</p>
                <p className="text-gray-300">מיקום: גבעת ברנר</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg mb-4">קישורים</h3>
                <div className="space-y-2">
                  <p><a href="/#employee-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים לעובדים</a></p>
                  <p><a href="/#employer-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים למעסיקים</a></p>
                  <p><Link to="/about" className="text-gray-300 hover:text-orange-500 transition-colors">אודות</Link></p>
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

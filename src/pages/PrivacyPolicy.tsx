import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import CookieBanner from '../components/CookieBanner';

export default function PrivacyPolicy() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative" dir="rtl">
      <SEO
        title="מדיניות פרטיות - איריס שני יועצת משאבי אנוש"
        description="מדיניות פרטיות מפורטת של איריס שני יועצת משאבי אנוש - איך אנו אוספים, משתמשים ומגנים על המידע האישי שלכם"
        keywords="מדיניות פרטיות, הגנת מידע, פרטיות, איריס שני, משאבי אנוש"
        url="/privacy-policy"
        image="/src/assets/background.png"
      />

      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 to-orange-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
          <div className="max-w-4xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl text-gray-900 leading-tight" style={{ fontWeight: 500, marginBottom: '1rem' }}>
                מדיניות פרטיות
              </h1>
              <p className="text-xl text-gray-700" style={{ marginBottom: '2rem' }}>
                הגנה על הפרטיות והמידע האישי שלכם
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
                <h2 className="text-2xl text-gray-900 mb-4">1. מבוא</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  איריס שני יועצת משאבי אנוש ("אנו", "שלנו", "החברה") מחויבת להגנה על הפרטיות והמידע האישי של לקוחותינו.
                  מדיניות פרטיות זו מסבירה איך אנו אוספים, משתמשים, מגנים ומחלקים מידע אישי.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  השימוש באתר זה מהווה הסכמה למדיניות פרטיות זו. אם אינכם מסכימים לתנאים המפורטים כאן,
                  אנא הימנעו משימוש באתר.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">2. איזה מידע אנו אוספים?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  המידע שאנו עשויים לאסוף כולל:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4" style={{ paddingRight: '1.5rem' }}>
                  <li>שם מלא ופרטי קשר (כתובת דוא"ל, מספר טלפון)</li>
                  <li>מידע על מקום העבודה והתפקיד</li>
                  <li>פרטי שכר וזכויות סוציאליות (לצורך ייעוץ)</li>
                  <li>מידע נוסף שתבחרו לשתף עימנו בעת יצירת קשר או קביעת פגישה</li>
                  <li>מידע טכני כללי כגון כתובת IP וסוג הדפדפן לצורכי שיפור חוויית הגלישה</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">3. איך אנו משתמשים במידע?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  אנו משתמשים במידע האישי שלכם למטרות הבאות:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4" style={{ paddingRight: '1.5rem' }}>
                  <li>מתן שירותי ייעוץ מקצועי בתחום משאבי האנוש</li>
                  <li>בדיקת זכויות עובדים וחישובי שכר</li>
                  <li>תקשורת איתכם בנוגע לשירותים שלנו</li>
                  <li>שיפור השירותים והאתר שלנו</li>
                  <li>עמידה בחובות משפטיות</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">4. שיתוף מידע</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  אנו לא מוכרים, משכירים או חולקים את המידע האישי שלכם עם צדדים שלישיים, למעט:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4" style={{ paddingRight: '1.5rem' }}>
                  <li>כאשר נדרש על פי חוק</li>
                  <li>כאשר יש צורך להגן על זכויותינו או זכויות אחרים</li>
                  <li>עם ספקי שירותים מהימנים המסייעים לנו בפעילות העסקית</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">5. אבטחת מידע</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  אנו נוקטים באמצעי אבטחה מתאימים כדי להגן על המידע האישי שלכם מפני גישה לא מורשית,
                  שינוי, חשיפה או השמדה. עם זאת, אין שיטה של העברה באינטרנט או אחסון אלקטרוני שהיא 100% מאובטחת.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">6. זכויותיכם</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  לכם הזכות:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4" style={{ paddingRight: '1.5rem' }}>
                  <li>לגשת למידע האישי שלכם</li>
                  <li>לבקש תיקון של מידע שגוי או לא מדויק</li>
                  <li>לבקש מחיקה של המידע האישי שלכם</li>
                  <li>להתנגד לעיבוד המידע האישי שלכם</li>
                  <li>לבקש העברה של המידע שלכם</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  לבקשות כאלה, אנא פנו אלינו בכתובת: info@iris-hr.work או בטלפון: 050-8836955.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">7. עוגיות (Cookies)</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  האתר שלנו משתמש בעוגיות כדי לשפר את חוויית הגלישה. עוגיות הן קבצים קטנים הנשמרים
                  במכשיר שלכם ומסייעים לנו לזכור את ההעדפות שלכם.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  תוכלו להגדיר את הדפדפן שלכם לדחות עוגיות, אך הדבר עלול להשפיע על תפקוד האתר.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">8. שינויים במדיניות</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. כל שינוי יפורסם בדף זה עם תאריך העדכון.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">9. יצירת קשר</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  לשאלות או הבהרות לגבי מדיניות פרטיות זו, ניתן ליצור קשר:
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

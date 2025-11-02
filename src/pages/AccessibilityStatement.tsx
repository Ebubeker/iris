import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import CookieBanner from '../components/CookieBanner';

export default function AccessibilityStatement() {
  return (
    <div className="min-h-screen relative" dir="rtl">
      <SEO 
        title="הצהרת נגישות - איריס שני יועצת משאבי אנוש"
        description="הצהרת נגישות של איריס שני יועצת משאבי אנוש - מחויבותנו לשוויון זכויות ולנגישות לאנשים בעלי מוגבלויות"
        keywords="הצהרת נגישות, נגישות, שוויון זכויות, מוגבלויות, איריס שני, משאבי אנוש"
        url="/accessibility-statement"
        image="/src/assets/background.png"
      />
      
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 to-orange-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
          <div className="max-w-4xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl text-gray-900 leading-tight" style={{ fontWeight: 500, marginBottom: '1rem' }}>
                הצהרת נגישות
              </h1>
              <p className="text-xl text-gray-700" style={{ marginBottom: '2rem' }}>
                מחויבותנו לשוויון זכויות ולנגישות
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="max-w-4xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="prose prose-lg max-w-none" style={{ direction: 'rtl', textAlign: 'right' }}>
              
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  חברת איריס שני – ייעוץ לעובד הינה חברה למתן שירותים בתחום משאבי אנוש
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  בהצהרה זו מטרתנו לייעל את השימוש ולשפר את השירות שלנו בכל הנוגע לנגישות ושוויון זכויות לאנשים בעלי מוגבלויות.
                  התאמת הנגישות שלנו בוצעה בהתאם לתקנה 35 בתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות) התשע"ג 2013 לרמה AA בכפוף לשינויים והתאמות שבוצעו במסמך התקן הישראלי.
                  התאמת הנגישות נבדקה בדפדפנים כרום, פיירפוקס, ספארי, מוזילה ואדג'.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4" style={{ fontWeight: 600 }}>אמצעי נגישות הקיימים באתר:</h2>
                <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed" style={{ paddingRight: '1.5rem' }}>
                  <li>תמיכה בכל הדפדפנים התקניים המקובלים (כמו Chrome, Explorer, FireFox, Opera, Mozila).</li>
                  <li>תכני האתר נכתבו בשפה ברורה ונעשה שימוש בפונטים קריאים</li>
                  <li>מבניות האתר בנויה מכותרות, פסקאות ורשימות</li>
                  <li>התמצאות באתר היא פשוטה ונוחה וכוללת תפריטים זמינים וברורים</li>
                  <li>הקישורים באתר ברורים ומסבירים להיכן מועברים לאחר לחיצה עליהם</li>
                  <li>קישורים בתחילת הדף המאפשרים דילוג לתוכן</li>
                  <li>תיאור טקסטואלי לתמונות ואייקונים עבור טכנולוגיות מסייעות</li>
                  <li>התאמת האתר לסביבות עבודה ברזולוציות שונות (רספונסיביות)</li>
                  <li>כפתורי עצירה והפעלה של גלריות סרטונים</li>
                  <li>הוטמעו חוקי ARIA העוזרים לפרש את תוכן האתר בצורה מדויקת וטובה יותר</li>
                  <li>הנגשת תפריטים, טפסים ושדות, היררכיית כותרות, רכיבי טאבים, חלונות קופצים ועוד</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4" style={{ fontWeight: 600 }}>שינוי תצוגה באתר</h2>
                <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed" style={{ paddingRight: '1.5rem' }}>
                  <li>
                    ניתן להגדיל או להקטין את תצוגת האתר באמצעות לחיצה על אחד מכפתורי ה- "CTRL" ביחד עם גלגלת העכבר או ביחד עם הסימן "+" עבור הגדלה או ביחד עם הסימן "-" עבור הקטנת התצוגה. כל לחיצה תקטין או תגדיל את המסך בעשרה אחוזים (10%).
                  </li>
                  <li>שינוי גודל הגופן ייעשה באמצעות שימוש בתפריט הנגישות המצוי באתר</li>
                  <li>
                    גולשים אשר אין ברשותם עכבר או שאינם יכולים לעשות שימוש בעכבר יכולים להפעיל את התכונות המצויות באתר על ידי לחיצה על המקש "TAB". כל לחיצה תעביר את הסמן אל האפשרות הבאה באתר.
                    לחיצה על מקש ה- "Enter" תפעיל את הקישור עליו נמצא הסמן
                  </li>
                  <li>
                    האתר אינו כולל הבהובים, ריצודים ותכנים בתנועה. במקומות אשר נמצאים תכנים כאלה, ניתן לעצור אותם בעמידה עליהם ולחיצה על העכבר או מעבר אליהם על ידי מקש ה- "TAB" ולחיצה על מקש ה- "Enter"
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4" style={{ fontWeight: 600 }}>התאמת אתר למוגבלי ראייה ושמיעה</h2>
                <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed" style={{ paddingRight: '1.5rem' }}>
                  <li>מגדילי ראות (רזולוציה) בסיסיים</li>
                  <li>תוכנות זיהוי קולי</li>
                  <li>חבילות זיהוי קולי של מערכות ההפעלה</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4" style={{ fontWeight: 600 }}>סייגים לנגישות</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  הנהלת האתר עושה ככל שניתן על מנת לוודא כי כלל הדפים המוצגים יהיו מונגשים. יחד עם זאת, יתכן וישנם דפים שטרם הונגשו, או שטרם נמצא פתרון טכנולוגי מתאים לצורך הנגשתם. בנוסף, ייתכן ובמודעות חיצוניות, אשר הוכנסו על ידי בעלי עסקים המפרסמים באתר, ההנגשה לא תהיה שלמה או מספקת.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4" style={{ fontWeight: 600 }}>נתקלתם בבעיה? אנחנו כאן כדי לסייע!</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  פרטי אחראי נגישות באתר:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>שם:</strong> איריס שני
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>אימייל:</strong> <a href="mailto:iris@iris-hr.work" className="text-orange-500 hover:text-orange-600">iris@iris-hr.work</a>
                  </p>
                </div>
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
                  <p><Link to="/#employee-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים לעובדים</Link></p>
                  <p><Link to="/#employer-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים למעסיקים</Link></p>
                  <p><Link to="/#about" className="text-gray-300 hover:text-orange-500 transition-colors">אודותיי</Link></p>
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
                  <p>
                    <Link to="/accessibility-statement" className="text-gray-300 hover:text-orange-500 transition-colors">
                      הצהרת נגישות
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


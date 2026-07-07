import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { MessageCircle, Cog, BriefcaseBusiness, GitGraph } from 'lucide-react';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import CookieBanner from '../components/CookieBanner';
// @ts-ignore
import heroImage from 'figma:asset/24970e13ba695a8b5fca661a1de5bf574ad76d59.png';
// @ts-ignore
import backgroundImage from '../assets/background.png';
// @ts-ignore
import artboardImage from '../../Artboard 1.png';

export default function About() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative" dir="rtl">
      <SEO
        title="אודות איריס שני - יועצת משאבי אנוש עם 20+ שנות ניסיון"
        description="הכירו את איריס שני - יועצת משאבי אנוש מנוסה המתמחה בייעוץ שכר, זכויות עובדים והסכמי עבודה. למעלה מ-20 שנות ניסיון, מעל 1500 עובדים שקיבלו ליווי."
        keywords="איריס שני, אודות, יועצת משאבי אנוש, ניסיון, ייעוץ שכר, גבעת ברנר"
        url="/about"
        image="/iris-og.png"
        breadcrumbs={[
          { name: 'דף הבית', url: '/' },
          { name: 'אודות', url: '/about' },
        ]}
      />

      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-60 z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section
          className="relative bg-gradient-to-br from-orange-50 to-orange-100"
          style={{ paddingTop: '8rem', paddingBottom: '6rem' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: `url(${artboardImage})`,
              maskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)',
            }}
          ></div>
          <div className="absolute inset-0 bg-white/20 z-5"></div>
          <div className="max-w-4xl mx-auto relative z-10" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl text-gray-900 leading-tight" style={{ fontWeight: 500, marginBottom: '1.5rem' }}>
                נעים להכיר - אני איריס שני
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                יועצת משאבי אנוש עם למעלה מ-20 שנות ניסיון בעולם השכר, יחסי העבודה וגיוס עובדים
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-white" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="max-w-6xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Profile Image */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl transform rotate-3"></div>
                  <img
                    src={heroImage}
                    alt="איריס שני - יועצת משאבי אנוש מקצועית"
                    className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">הסיפור שלי</h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">
                    עם יותר מ-20 שנות ניסיון בעולם השכר, יחסי העבודה וגיוס עובדים, למדתי דבר אחד חשוב -
                    מאחורי כל תלוש, חוזה או תהליך גיוס עומד אדם.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    וכל אדם הוא עולם בפני עצמו, עם צרכים, חלומות ונסיבות חיים ייחודיות.
                  </p>
                </div>
              </div>
            </div>

            {/* Approach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">הגישה שלי</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  אני מאמינה בליווי אישי, אמפתי ומקצועי. כל לקוח מקבל יחס אישי, הסברים ברורים בשפה
                  פשוטה, וכלים שמאפשרים לו להבין באמת את הזכויות, החובות וההזדמנויות שלו.
                </p>
              </div>

              <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">המטרה שלי</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  לעזור לכם לעשות סדר, להרגיע, ללוות ולהחזיר את הביטחון העצמי - בין אם אתם שכירים
                  ובין אם אתם מעסיקים. ביחד נבנה גשר אמין, שקוף ומכבד בינכם לבין עולם התעסוקה.
                </p>
              </div>
            </div>

            {/* Who I Help */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">למי אני עוזרת?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">לשכירים</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    אם אתם רוצים להבין באמת את תלוש המשכורת, לוודא שאתם מקבלים את כל מה שמגיע לכם,
                    לקבל ייעוץ לפני חתימה על חוזה עבודה, או לקבל ליווי בסיום העסקה - אני כאן.
                  </p>
                  <Link to="/#employee-services" className="text-orange-500 hover:text-orange-600 font-medium">
                    לכל השירותים לעובדים ←
                  </Link>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">למעסיקים</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    עסקים קטנים ובינוניים מקבלים ממני ליווי מקצועי בגיוס עובדים, בנייה של תהליכי שכר תקינים
                    ועמידה בדרישות החוק - הכל תוך שמירה על הוגנות ושקיפות.
                  </p>
                  <Link to="/#employer-services" className="text-orange-500 hover:text-orange-600 font-medium">
                    לכל השירותים למעסיקים ←
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-orange-100">
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-orange-500 rounded-full flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
                    <Cog className="h-10 w-10 text-white" />
                  </div>
                </div>
                <span className="text-orange-500 text-4xl font-bold block mb-2" style={{ fontWeight: 600 }}>20+</span>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">שנות ניסיון</h4>
                <p className="text-gray-600">בתחום השכר ויחסי עבודה</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-orange-100">
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-orange-500 rounded-full flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
                    <BriefcaseBusiness className="h-10 w-10 text-white" />
                  </div>
                </div>
                <span className="text-orange-500 text-4xl font-bold block mb-2" style={{ fontWeight: 600 }}>1500+</span>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">עובדים</h4>
                <p className="text-gray-600">שקיבלו ליווי מקצועי</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-orange-100">
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-orange-500 rounded-full flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
                    <GitGraph className="h-10 w-10 text-white" />
                  </div>
                </div>
                <span className="text-orange-500 text-4xl font-bold block mb-2" style={{ fontWeight: 600 }}>100%</span>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">מחויבות</h4>
                <p className="text-gray-600">להצלחת הלקוחות שלי</p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl" style={{ padding: '3rem 2rem' }}>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">רוצים להתחיל?</h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                בואו נדבר. ייעוץ ראשוני, היכרות, ובניית תוכנית אישית שמתאימה למצב שלכם.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  asChild
                >
                  <a
                    href="https://wa.me/972508836955"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="צור קשר בוואטסאפ"
                  >
                    <MessageCircle className="ml-2 h-5 w-5" />
                    צור קשר בוואטסאפ
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-50"
                  asChild
                >
                  <Link to="/#contact">טופס יצירת קשר</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="max-w-7xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginBottom: '2rem' }}>
              <div className="text-center md:text-right">
                <h3 className="text-lg" style={{ marginBottom: '1rem' }}>צור קשר</h3>
                <p className="text-gray-300">טלפון: <a href="tel:+972508836955" className="hover:text-orange-500 transition-colors" dir="ltr">050-883-6955</a></p>
                <p className="text-gray-300">מייל: info@iris-hr.work</p>
                <p className="text-gray-300">מיקום: גבעת ברנר</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg" style={{ marginBottom: '1rem' }}>קישורים</h3>
                <div className="space-y-2">
                  <p><Link to="/#employee-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים לעובדים</Link></p>
                  <p><Link to="/#employer-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים למעסיקים</Link></p>
                  <p><Link to="/about" className="text-gray-300 hover:text-orange-500 transition-colors">אודות</Link></p>
                  <p><Link to="/blogs" className="text-gray-300 hover:text-orange-500 transition-colors">בלוג</Link></p>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg" style={{ marginBottom: '1rem' }}>מידע משפטי</h3>
                <div className="space-y-2">
                  <p><Link to="/privacy-policy" className="text-gray-300 hover:text-orange-500 transition-colors">מדיניות פרטיות</Link></p>
                  <p><Link to="/terms-of-use" className="text-gray-300 hover:text-orange-500 transition-colors">תנאי שימוש</Link></p>
                  <p><Link to="/cookies-policy" className="text-gray-300 hover:text-orange-500 transition-colors">מדיניות עוגיות</Link></p>
                  <p><Link to="/accessibility-statement" className="text-gray-300 hover:text-orange-500 transition-colors">הצהרת נגישות</Link></p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 text-center" style={{ paddingTop: '2rem' }}>
              <p className="text-gray-400">© {new Date().getFullYear()} איריס שני - ייעוץ משאבי אנוש. כל הזכויות שמורות.</p>
            </div>
          </div>
        </footer>
      </div>
      <CookieBanner />
    </div>
  );
}

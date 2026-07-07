import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { MessageCircle, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import CookieBanner from '../components/CookieBanner';
// @ts-ignore
import backgroundImage from '../assets/background.png';
// @ts-ignore
import artboardImage from '../../Artboard 1.png';

// NOTE: These FAQ items are an initial draft based on the services listed on the site.
// Iris should review and edit each answer to match her exact wording and add/remove
// questions as needed.
const faqs = [
  {
    question: 'למה כדאי לעשות בדיקת תלוש שכר?',
    answer:
      'תלוש השכר הוא לא רק מספרים - הוא משקף את כל ההפרשות, הזכויות והניכויים שלך. בבדיקה מקצועית אפשר לזהות טעויות בחישוב שעות נוספות, הפרשות לפנסיה, ניכויי מס, דמי הבראה ועוד, ולוודא שמגיע לך כל מה שמגיע. טעויות נפוצות עלולות לעלות לך אלפי שקלים בשנה.',
  },
  {
    question: 'מה ההבדל בין ייעוץ שכר וזכויות עובדים לבין פנייה לעורך דין לענייני עבודה?',
    answer:
      'ההבדל טמון בגישה ובסוג המומחיות. עורך דין מייצג עובדים בבתי דין ומטפל בהליכים משפטיים ותביעות.\nייעוץ שכר ומשאבי אנוש, לעומת זאת, מתמקד בצד הפרקטי והמספרי: פירוק התלושים ל: בדיקת החישובים המתמטיים, בדיקת הצבירות הסוציאליות ביחד להיקף השעות בתלוש, בדיקת ההפרשות הפנסיוניות בפועל וניתוח הסכם העבודה.\nהייעוץ מאפשר לכם להבין בדיוק "איפה אתם עומדים" ולקבל דוח נתונים מדויק. עם הדוח הזה ניתן לפתור את רוב המחלוקות מול המעסיק בצורה נעימה, מהירה ודיפלומטית בתוך הארגון - בליווי שלי, ללא צורך בהוצאות כבדות על תביעות משפטיות ארוכות ומתישות.',
  },
  {
    question: 'מצאתי טעות בתלוש השכר שלי - מה עכשיו?',
    answer:
      'קודם כל אל תיבהל. אספי את כל התלושים הרלוונטיים ומידע נלווה (חוזה עבודה, תכתובות עם המעסיק). נעבור יחד על הממצאים, ננסח פנייה מסודרת למעסיק או למחלקת השכר, ובמידת הצורך נלווה אותך מול הגורמים הרלוונטיים כדי לתקן את הטעות ולקבל החזרים.',
  },
  {
    question: 'מתי כדאי לקבל ייעוץ לפני חתימה על חוזה עבודה?',
    answer:
      'תמיד - לפני שאתה חותם. חוזה עבודה הוא מסמך מחייב שיקבע את הזכויות שלך לאורך כל תקופת ההעסקה ובסיומה. בייעוץ נעבור יחד על סעיפים כמו תקופת ניסיון, סעיף 14, פיצויי פיטורים, סודיות, אי-תחרות, שעות עבודה והפרשות. זה הזמן לדייק תנאים ולמנוע הפתעות מאוחר יותר.',
  },
  {
    question: 'קיבלתי זימון לשימוע לפני פיטורים. כיצד ייעוץ וליווי מקצועי יכולים לעזור לי ברגע הזה?',
    answer:
      'זימון לשימוע הוא רגע מלחיץ ומבלבל. הליווי המקצועי מעניק לכם קודם כל "מפת דרכים" ברורה: אנחנו עוברים יחד על מכתב הזימון, מבינים את הטענות, ומכינים בצורה שקולה ומאורגנת את הטיעונים שלכם לקראת הפגישה. במקביל, נערכת בדיקה מקיפה של זכויות סיום ההעסקה שלכם (פיצויי פיטורים, פדיון ימי חופשה, הודעה מוקדמת והפרשות פנסיוניות). המטרה היא להביא אתכם לשיחת השימוע כשאתם בטוחים בעצמכם, יודעים בדיוק מה מגיע לכם, ושומרים על האינטרסים והזכויות שלכם בצורה המקסימלית.',
  },
  {
    question: 'אילו זכויות מגיעות לי בעת פיטורים?',
    answer:
      'בין השאר: פיצויי פיטורים (בהתאם לוותק ולהיקף המשרה), הודעה מוקדמת, פדיון ימי חופשה צבורים, השלמת דמי הבראה, שחרור כספי הפנסיה והקופות, וזכאות פוטנציאלית לדמי אבטלה. חשוב גם לקבל מכתב פיטורים, טופס 161, ולוודא ששימוע נעשה כדין. מומלץ לקבל ליווי כדי לוודא שלא מוותרים על כלום.',
  },
  {
    question: 'האם אני זכאי לפיצויי פיטורים גם אם התפטרתי?',
    answer:
      'במקרים מסוימים כן. החוק מכיר ב"התפטרות בדין מפוטר" - למשל בהרעה מוחשית בתנאי העבודה, מעבר דירה למרחק שמקשה על הגעה לעבודה, מצב בריאותי, טיפול בילד או הורה, ועוד. כל מקרה נבחן לגופו, וחשוב לתעד את הנסיבות לפני ההתפטרות.',
  },
  {
    question: 'איך לחשב את ימי החופשה שמגיעים לי?',
    answer:
      'ימי החופשה תלויים בוותק, בהיקף המשרה ובסוג ההעסקה (שכיר חודשי / שעתי). לפי החוק, בשנים הראשונות מגיעים 16 ימי חופשה בשנה (פחות בפועל אחרי הפחתת שישי-שבת), והכמות עולה עם הוותק. ימי חופשה שלא נוצלו נצברים, ובסיום ההעסקה משולמים כפדיון. בדיקת התלוש תעלה את היתרה המעודכנת.',
  },
  {
    question: 'אני מעסיק קטן - איך אני יודע שניהול השכר אצלי תקין?',
    answer:
      'יש כמה נקודות מפתח לבדוק: תלושי שכר תקינים מבחינת חישוב שעות, שעות נוספות, הפרשות סוציאליות וניכויי מס; חוזי עבודה חתומים ומעודכנים; ניהול נכון של ימי חופשה, מחלה ודמי הבראה; הפרשות מסודרות לפנסיה ולקרן השתלמות; ועמידה בדיני העבודה הרלוונטיים. אני מציעה בקרה מקיפה לעסקים קטנים ובינוניים שמזהה פערים ומקימה נהלים שמונעים טעויות בעתיד.',
  },
  {
    question: 'כמה עולה ייעוץ אצלך?',
    answer:
      'המחיר תלוי בסוג השירות ובהיקף - בדיקת תלוש שכר היא פגישה ממוקדת, בעוד שליווי תהליך סיום העסקה או ייעוץ לעסק קטן הם עבודה רחבה יותר. בשיחת היכרות ראשונית קצרה (ללא תשלום) נבין את הצרכים שלך ואיתן הצעת מחיר מותאמת. נא צרי קשר בוואטסאפ או בטלפון לתיאום.',
  },
  {
    question: 'איך נראה תהליך עבודה איתך?',
    answer:
      'מתחילים בשיחת היכרות קצרה (טלפון או וואטסאפ) כדי להבין במה אפשר לעזור. אם זה מתאים, קובעים פגישה אישית (בזום או פרונטלית), עוברים יחד על המסמכים והשאלות שלך, ואני מספקת המלצות פעולה ברורות. במידת הצורך אני מלווה אותך גם בביצוע - מול המעסיק, הרשויות או חברות הביטוח.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative" dir="rtl">
      <SEO
        title="שאלות נפוצות - איריס שני יועצת משאבי אנוש"
        description="תשובות לשאלות הנפוצות ביותר על ייעוץ שכר, זכויות עובדים, פיטורים, פיצויים, הסכמי עבודה וניהול שכר לעסקים. מאת איריס שני, יועצת משאבי אנוש."
        keywords="שאלות נפוצות, ייעוץ שכר, זכויות עובדים, פיצויי פיטורים, שימוע לפני פיטורים, ימי חופשה, איריס שני"
        url="/faq"
        image="/iris-og.png"
        breadcrumbs={[
          { name: 'דף הבית', url: '/' },
          { name: 'שאלות נפוצות', url: '/faq' },
        ]}
        faqs={faqs}
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
                שאלות נפוצות
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                תשובות לשאלות החשובות ביותר ששואלים אותי - על ייעוץ שכר, זכויות עובדים וניהול תהליכי עבודה
              </p>
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="bg-white" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="max-w-4xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex justify-between items-center text-right transition-colors hover:bg-orange-50"
                      style={{ padding: '1.5rem' }}
                      aria-expanded={isOpen}
                    >
                      <ChevronDown
                        className={`h-5 w-5 text-orange-500 flex-shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                      <h2 className="text-lg font-semibold text-gray-900 leading-tight" style={{ marginRight: '1rem', marginLeft: '1rem' }}>
                        {faq.question}
                      </h2>
                    </button>
                    {isOpen && (
                      <div
                        className="border-t border-gray-100 text-gray-700 leading-relaxed"
                        style={{ padding: '1.5rem', fontSize: '1rem', whiteSpace: 'pre-line' }}
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div
              className="text-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl"
              style={{ padding: '3rem 2rem', marginTop: '4rem' }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">לא מצאת תשובה לשאלה שלך?</h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                בואי נדבר. כל מקרה הוא ייחודי, ואני כאן כדי לעזור במה שצריך.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                  <a
                    href="https://wa.me/972508836955"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="צור קשר בוואטסאפ"
                  >
                    <MessageCircle className="ml-2 h-5 w-5" />
                    שאלו אותי בוואטסאפ
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

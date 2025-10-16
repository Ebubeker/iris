import { MessageCircle, Phone, Mail, MapPin, User, FileText, PiggyBank, LogOut, BriefcaseBusiness, X, GitGraph, Cog } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useState } from 'react';
import logo from 'figma:asset/5238df62aa5d3c4e2b5040b827041631a24389b9.png';
import heroImage from 'figma:asset/24970e13ba695a8b5fca661a1de5bf574ad76d59.png';
import backgroundImage from '../assets/background.png';
import artboardImage from '../../Artboard 1.png';

export default function Home() {
  const [selectedService, setSelectedService] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
  const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false);
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);

  const businessImage = "https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTk0MDA3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const documentsImage = "https://images.unsplash.com/photo-1746221331496-a87689fc8eb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBkb2N1bWVudHMlMjBjYWxjdWxhdG9yfGVufDF8fHx8MTc1OTQwMTU5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const lawImage = "https://images.unsplash.com/photo-1583521214690-73421a1829a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrcGxhY2UlMjBsYXclMjBkb2N1bWVudHN8ZW58MXx8fHwxNzU5NDAxNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const employeeServices = [
    {
      title: "ניתוח תלוש שכר",
      subtitle: "לדעת, להבין ולהרוויח",
      description: "זיהוי טעויות והבטחת קבלת מלוא הזכויות",
      icon: <FileText className="h-8 w-8 text-orange-500" />,
      fullDescription: "תלוש השכר הוא לא רק מספרים. בבדיקה אישית ומעמיקה אני עוזרת לך להבין את כל רכיבי השכר, ההפרשות, הניכויים והזכויות - כדי לוודא שמגיע לך כל מה שמגיע, בזמן העבודה ובסיומה. השירות כולל הסבר ברור, ייעוץ שכר מקצועי וליווי אמפתי שמעניקים ביטחון, ידע ושליטה אמיתית במה שמגיע לך.",
      benefitsTitle: "למה חשוב לבצע ניתוח תלוש שכר?",
      benefits: [
        "שקט נפשי וביטחון כלכלי - הידיעה שכל רכיב שכר, ניכוי והפרשה מחושבים נכון מעניקה יציבות ויכולת לתכנן קדימה בראש שקט.",
        "גילוי ותיקון טעויות בזמן - טעויות בתלוש שכר או בחישובי שעות נוספות, מס או פנסיה קורות לעיתים קרובות. בדיקה מוקדמת מונעת הפסדים מיותרים.",
        "הבנת הזכויות הסוציאליות שלך - חופשה, מחלה, פנסיה, הבראה ושעות עבודה הופכים ברורים ופשוטים להבנה.",
        "העצמה וביטחון אישי - כשאתה מבין את תלוש המשכורת שלך, אתה מרגיש בטוח יותר בעבודה, בשיח עם המעסיק ובכל שינוי תעסוקתי.",
        "מניעת הלנת שכר ואי-הבנות - ידע מדויק יוצר מערכת יחסים הוגנת, שקופה ומכבדת בינך לבין מקום העבודה."
      ],
      buttonText: "בדוק את התלוש שלך"
    },
    {
      title: "ייעוץ על הסכמי עבודה",
      subtitle: "להבין. לשפר. להגן על עצמך.",
      description: "הבנה והכוונה לפני החתימה",
      icon: <User className="h-8 w-8 text-orange-500" />,
      fullDescription: "לפני שחותמים על הסכם עבודה חשוב להבין כל סעיף. אני מציעה קריאה וניתוח מעמיק של ההסכם כדי לוודא הוגנות ושקיפות, חישוב שכר תקין, זכויות עובדים מלאות והטמעה נכונה של תנאי העסקה. במהלך הפגישה נעבור יחד בשפה פשוטה וברורה על תלוש משכורת, רכיבי שכר, שעות עבודה ושעות נוספות, הפרשות לפנסיה וקרן השתלמות, ימי חופשה וימי מחלה, ניכויים וזיכויים, ביטוח לאומי ומס הכנסה, ונבנה המלצות לשיפור התנאים ולמשא ומתן יעיל ומכבד.",
      benefitsTitle: "מה נבדוק יחד",
      benefits: [
        "חישובי שכר, תלוש משכורת, רכיבי שכר, שעות נוספות וזכויות סוציאליות.",
        "ימי חופשה, ימי מחלה, דמי הבראה, הפרשות סוציאליות, פנסיה וקרן השתלמות.",
        "סעיפים מרכזיים כמו תקופת ניסיון, סעיף 14, פיצויי פיטורים, סודיות ואי תחרות, שימוע והלנת שכר.",
        "תנאי עבודה בפועל כמו מיקום, מודל היברידי, זמינות, עבודה בערבי חג ושבת, היקף ושעות עבודה.",
        "תגמול והטבות כמו בונוסים, רכב, טלפון והחזרי הוצאות המשפיעים על השכר הכולל.",
        "מסים והטבות מס כמו תיאום מס, נקודות זיכוי, ניכויים וזיכויים."
      ],
      additionalBenefitsTitle: "היתרון שלכם",
      additionalBenefits: [
        "הבנה מלאה של כל סעיף ללא אותיות קטנות והפתעות.",
        "זיהוי מוקדם של סעיפים בעייתיים שעלולים לפגוע בזכויות שלכם.",
        "הכנה מקצועית למשא ומתן כדי לדעת מה לשאול, איך לבקש ואיך לעמוד על שלכם בנועם.",
        "הגנה על הזכויות והעתיד התעסוקתי בזמן העבודה ובסיומה.",
        "חיסכון בזמן ובטעויות בזכות בדיקה יסודית ובהירה.",
        "בסיס נכון לבקשת העלאת שכר או לשדרוג תנאים כשמגיע לכם."
      ],
      buttonText: "קבע ייעוץ על ההסכם"
    },
    {
      title: "ליווי מול רשויות",
      subtitle: "לברר. להגיש. לקבל מה שמגיע.",
      description: "ביטוח לאומי ומס הכנסה",
      icon: <Phone className="h-8 w-8 text-orange-500" />,
      fullDescription: "התנהלות מול ביטוח לאומי, מס הכנסה או חברות הביטוח יכולה להיות מתישה ומבלבלת - אבל אתם לא צריכים לעבור את זה לבד. אני כאן כדי ללוות אתכם באופן אישי ומקצועי, לוודא שכל הזכויות הסוציאליות, הפנסיוניות והמיסויות שלכם נשמרות, ושתקבלו את כל מה שמגיע לכם - במלואו.",
      benefitsTitle: "השירות כולל",
      benefits: [
        "הכנת מסמכים, טפסים ודוחות בצורה מדויקת וברורה - כולל תיאום מס, נקודות זיכוי והחזרי מס.",
        "ליווי מול ביטוח לאומי ומס הכנסה, כולל טיפול בתביעות, עררים ובקשות מיוחדות.",
        "סיוע מול חברות ביטוח, קופות גמל וקרנות השתלמות - כדי לוודא שההפרשות והזכויות הפנסיוניות שלכם מתבצעות כנדרש.",
        "ייעוץ שכר והכוונה מקצועית שמחברת בין תלוש המשכורת, ההפרשות הסוציאליות וההתנהלות מול הרשויות.",
        "בדיקה מקיפה של הזכאות שלכם לגמלאות, דמי לידה, דמי אבטלה, נכות ועוד - והכוונה מדויקת להמשך הדרך."
      ],
      buttonText: "בדוק את הזכאות שלך"
    },
    {
      title: "פנסיה בתלוש השכר",
      subtitle: "לבדוק. להבין. לשמור על הפנסיה שלך.",
      description: "בדיקת הפרשות לפנסיה",
      icon: <PiggyBank className="h-8 w-8 text-orange-500" />,
      fullDescription: "הפנסיה שלך היא חלק חשוב מהביטחון הכלכלי שלך - וחשוב לוודא שכבר היום הכול מחושב נכון. בבדיקה אישית אני בוחנת את ההפרשות לפנסיה בתלוש השכר, את גובה ההפרשות בפועל, ואת התאמתן להוראות החוק ולתנאי ההעסקה שלך. השירות כולל בדיקה יסודית של רכיבי השכר, ההפרשות הסוציאליות, הניכויים והזכויות - כדי לוודא שכל שקל מופרש כנדרש ושלא חסרות זכויות או סכומים בדרך.",
      benefitsTitle: "היתרונות",
      benefits: [
        "וידוא שכל ההפרשות לפנסיה מחושבות ומבוצעות בצורה מדויקת.",
        "בדיקה מקיפה של תלוש השכר ורכיבי ההפרשה הסוציאלית.",
        "איתור טעויות או חוסרים בהפקדות הפנסיה ובקרן ההשתלמות.",
        "הסבר ברור על משמעות ההפרשות והניכויים בתלוש.",
        "ביטחון ושקט נפשי בידיעה שהפנסיה שלך מנוהלת נכון מול המעסיק."
      ],
      buttonText: "בדוק את הפנסיה שלך"
    },
    {
      title: "סיומי עבודה",
      subtitle: "פיטורין, התפטרות או פרישה - כדי לוודא שתקבלו את כל מה שמגיע לכם",
      description: "ליווי בעזיבת מקום עבודה",
      icon: <LogOut className="h-8 w-8 text-orange-500" />,
      fullDescription: "סיום עבודה הוא רגע משמעותי - לפעמים מפתיע, לפעמים מתוכנן - ותמיד חשוב לעשות אותו נכון. אני מלווה אתכם באופן אישי ומקצועי כדי לוודא שכל הזכויות הסוציאליות והכספיות נשמרות, שכל חישובי השכר והפיצויים תקינים, ושתצאו מהתהליך עם בהירות, ביטחון ושקט נפשי לקראת הדרך החדשה שלכם.",
      benefitsTitle: "השירות כולל",
      benefits: [
        "ליווי בהליך שימוע - הכנה לשיחה, ניסוח תגובה מקצועית והכוונה להצגת הדברים באופן מכבד ומדויק.",
        "בדיקה יסודית של תלוש השכר וגמר החשבון - פיצויי פיטורין, ימי חופשה, הבראה, הודעה מוקדמת והפרשות לפנסיה ולקרן השתלמות.",
        "הכנת מכתב התפטרות מותאם אישית, מנוסח נכון מבחינה משפטית ותעסוקתית.",
        "הדרכה מלאה למילוי טופס 161 וליווי מול מס הכנסה, ביטוח לאומי וחברות הביטוח לשחרור כספים וזכויות.",
        "ליווי בפגישות עם HR או המעסיק, לפי הצורך.",
        "הכוונה מלאה להמשך הדרך - התנהלות נכונה לאחר סיום ההעסקה, כולל בדיקת זכאות לדמי אבטלה, פנסיה וגמלאות."
      ],
      buttonText: "בדוק את זכויותיך בסיום עבודה"
    },
    {
      title: "ליווי במציאת עבודה",
      subtitle: "להתמקד. להתכונן. למצוא את המקום הנכון עבורך.",
      description: "קורות חיים והכוונה",
      icon: <BriefcaseBusiness className="h-8 w-8 text-orange-500" />,
      fullDescription: "חיפוש עבודה הוא תהליך שיכול להיות מתיש ומבלבל - אבל עם ליווי נכון הוא הופך להזדמנות אמיתית לצמיחה. אני כאן כדי ללוות אותך צעד-צעד - משלב כתיבת קורות החיים ועד הריאיון והחתימה על החוזה - בדרך אישית, ממוקדת וברורה.",
      benefitsTitle: "השירות כולל",
      benefits: [
        "בניית קורות חיים מקצועיים - התאמה אישית שמבליטה את החוזקות, הניסיון והכישורים שלך בצורה נכונה ומדויקת.",
        "הכנה לראיונות עבודה - סימולציות ממוקדות, תשובות לשאלות מאתגרות וטיפים יעילים להתמודדות עם מצבי לחץ וביטחון עצמי.",
        "אסטרטגיית חיפוש עבודה מותאמת אישית - לפי התחום, היעדים והשאיפות שלך, כולל הכוונה למשרות ולמעסיקים המתאימים לך באמת.",
        "הכוונה תעסוקתית מקצועית - עזרה בבחירת כיוון תעסוקתי, מעבר תחום או שינוי קריירה באופן מושכל ובטוח.",
        "הכנה לשלב החוזה וההעסקה - לוודא שההצעה שקיבלת תואמת את הציפיות והזכויות שלך."
      ],
      buttonText: "התחל לחפש עבודה"
    }
  ];

  const employerServices = [
    // {
    //   title: "בקרה על תלושי שכר",
    //   description: "מניעת טעויות ושמירה על חוקיות",
    //   icon: <FileText className="h-8 w-8 text-orange-500" />,
    //   subtitle: "לבדוק. לוודא. לעבוד בראש שקט.",
    //   fullDescription: "ניהול שכר תקין הוא אחד התחומים הרגישים ביותר בעסק - טעויות קטנות עלולות להפוך במהירות להוצאה גדולה או לתביעה מיותרת. אני מציעה שירות בקרה מקיף על מערכת השכר בעסק שלך, המותאם במיוחד לעסקים קטנים ובינוניים. השירות כולל בדיקת תלושי שכר, בחינת הפרשות סוציאליות, עמידה בדרישות החוק והרגולציה, והקמת נהלי בקרה פנימיים שמונעים טעויות מראש. בזכות הניסיון הרב שלי כחשבת ומבקרת שכר, אני יודעת לזהות אי-סדרים, למנוע טעויות חוזרות ולהעניק למעסיק שקט נפשי וביטחון שהכול מתנהל כשורה.",
    //   benefitsTitle: "השירות כולל",
    //   benefits: [
    //     "בדיקה יסודית של תלושי השכר והעמידה בדרישות דיני העבודה",
    //     "בקרה על חישובי שכר, שעות עבודה, ניכויים והפרשות לפנסיה ולביטוח לאומי",
    //     "הקמת נהלי בקרה פנימיים והדרכה לתפעול שוטף של מערכת השכר",
    //     "זיהוי מוקדם של טעויות שעלולות לעלות כסף או לגרור תביעות עובדים",
    //     "דו\"ח ממצאים ברור עם המלצות מעשיות לשיפור וייעול"
    //   ],
    //   additionalBenefitsTitle: "היתרונות שלך",
    //   additionalBenefits: [
    //     "מניעת טעויות יקרות וחיסכון בזמן ובכסף",
    //     "עמידה מלאה בדרישות החוק ובתקנות העבודה",
    //     "הקמת מערכת בקרה פנימית שמבטיחה דיוק ושקיפות",
    //     "שמירה על אמון העובדים והגנה על מוניטין העסק"
    //   ],
    //   buttonText: "וודא שהכול מחושב נכון"
    // },
    // {
    //   title: "ייעוץ בהסכמי עבודה",
    //   description: "בניית חוזים מותאמים והוגנים",
    //   icon: <User className="h-8 w-8 text-orange-500" />,
    //   subtitle: "לדייק. לבדוק. להעסיק כחוק.",
    //   fullDescription: "ניהול עובדים מתחיל מהבסיס - הסכם עבודה ברור, מאוזן וחוקי שמגן גם על העסק וגם על העובדים. אני מציעה ליווי וייעוץ אישי בבניית הסכמי העסקה מותאמים לעסק שלך, שמבטיחים עמידה בדרישות החוק, הוגנות כלפי העובדים ושקט נפשי למעסיק. באמצעות ניסיון רב בעולם השכר, דיני העבודה והבקרה, אני עוזרת לנסח חוזים שקופים וברורים שמונעים אי-הבנות ומבססים מערכת יחסים מקצועית ויציבה לטווח ארוך.",
    //   benefitsTitle: "השירות כולל",
    //   benefits: [
    //     "התאמת הסכמי העסקה לצרכים ולמבנה של העסק שלך",
    //     "ניסוח סעיפים ברורים בנושאי שכר, שעות עבודה, זכויות סוציאליות ופיצויי פיטורים",
    //     "בדיקה ועדכון חוזי עבודה כך שיעמדו במבחן החוק",
    //     "שילוב סעיפים המגנים על העסק תוך שמירה על הוגנות ושקיפות מול העובדים",
    //     "ייעוץ מעשי לשיפור חוזים קיימים והפחתת סיכונים עתידיים"
    //   ],
    //   additionalBenefitsTitle: "יתרונות השירות",
    //   additionalBenefits: [
    //     "חוזים מותאמים אישית לצרכי העסק",
    //     "הגנה משפטית ועמידה בדרישות החוק",
    //     "ניסוח סעיפים ברורים ומאוזנים לשני הצדדים",
    //     "מניעת מחלוקות וסכסוכי עבודה עתידיים",
    //     "חיסכון בזמן ובטעויות שנובעות מחוזים כלליים או לא מעודכנים"
    //   ],
    //   buttonText: "עדכן חוזי עבודה"
    // },
    {
      title: "גיוס בהתאמה אישית",
      description: "התאמת עובדים ממאגר אישי",
      icon: <BriefcaseBusiness className="h-8 w-8 text-orange-500" />,
      subtitle: "לדעת מה צריך. למצוא מי שמתאים.",
      fullDescription: "גיוס עובדים הוא תהליך מורכב שדורש זמן, הקשבה ודיוק - במיוחד בעסקים שבהם כל עובד עושה הבדל גדול. אני מציעה שירות גיוס והשמה אישי ומקצועי שמאפשר לך למצוא את האדם המתאים ביותר - בקלות, ביעילות ובאופן שמשקף את הצרכים, הערכים והתרבות של העסק שלך. עם ניסיון רב בתחום השכר, יחסי העבודה והניהול, אני פועלת כמו שותפה אמיתית לדרך - מלווה אותך בכל שלב עד שהעובד הנכון מצטרף לצוות שלך.",
      benefitsTitle: "השירות כולל",
      benefits: [
        "פגישה בעסק ובסביבת העבודה כדי להבין לעומק את הצרכים, התרבות הארגונית והאופי של הצוות",
        "הגדרה מדויקת של התפקיד והדרישות למשרה בהתאם למציאות בשטח ולתקציב השכר",
        "ניסוח מודעת דרושים מקצועית, מושכת וברורה שמשקפת את רוח העסק",
        "הפצת המודעה בקבוצות ייעודיות ובקהילות אמינות של מנהלי משאבי אנוש, עסקים וקיבוצים",
        "ראיונות טלפוניים ראשוניים וסינון מועמדים לפי התאמה מקצועית ואישיותית",
        "ליווי מלא בתהליך הראיונות - כולל אפשרות לנוכחות אישית בראיונות לסיוע בבחירה הנכונה",
        "סיוע בניסוח הסכמי העסקה ותנאי שכר בהתאם לדיני העבודה ולצרכים של העסק"
      ],
      additionalBenefitsTitle: "יתרונות השירות",
      additionalBenefits: [
        "חיסכון בזמן ובעלות של תהליכי גיוס",
        "התאמה מדויקת של מועמדים לצרכים האמיתיים של העסק",
        "גיוס מהיר ומבוסס ניסיון שטח רב שנים",
        "ביטחון שכל תהליך ההעסקה מתבצע כחוק, בהוגנות ובשקיפות מלאה"
      ],
      buttonText: "מצא את העובד הנכון עבורך"
    }
  ];

  const blogPosts = [
    {
      title: "זכויות עובדים בישראל: מדריך מקיף לשנת 2024",
      excerpt: "כל מה שצריך לדעת על זכויות עובדים, חופשות, ימי מחלה ותנאי עבודה...",
      date: "15 בינואר 2024",
      image: documentsImage
    },
    {
      title: "איך לבדוק נכונות תלוש השכר שלכם",
      excerpt: "מדריך מפורט לבדיקת תלוש שכר וזיהוי טעויות נפוצות שעלולות לעלות לכם כסף...",
      date: "8 בינואר 2024",
      image: businessImage
    },
    {
      title: "הסכמי עבודה: מה חובה לדעת לפני החתימה",
      excerpt: "נקודות מפתח שחשוב לבדוק בהסכם העבודה כדי להגן על הזכויות שלכם...",
      date: "2 בינואר 2024",
      image: lawImage
    }
  ];

  return (
    <div className="min-h-screen relative" dir="rtl">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-60 z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white backdrop-blur-sm shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img src={logo} alt="Iris Shani Logo" className="h-12 w-auto" />
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-reverse">
                <a href="#home" className="text-gray-700 hover:text-orange-500 transition-colors ml-8">בית</a>
                <button
                  onClick={() => setIsAboutDialogOpen(true)}
                  className="text-gray-700 hover:text-orange-500 transition-colors ml-8"
                >
                  עלי
                </button>
                <a href="#employee-services" className="text-gray-700 hover:text-orange-500 transition-colors ml-8">שירותים לעובדים</a>
                <a href="#employer-services" className="text-gray-700 hover:text-orange-500 transition-colors ml-8">שירותים למעסיקים</a>
                <a href="#about" className="text-gray-700 hover:text-orange-500 transition-colors ml-8">אודותיי</a>
                <a href="#blog" className="text-gray-700 hover:text-orange-500 transition-colors ml-8">בלוג</a>
                <a href="#contact" className="text-gray-700 hover:text-orange-500 transition-colors ml-12">צור קשר</a>
              </nav>

              {/* WhatsApp CTA */}
              <Button className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                <a href="https://wa.me/972508836955" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  צור קשר עכשיו
                </a>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-20">
          {/* Artboard Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: `url(${artboardImage})`,
              maskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)'
            }}
          ></div>
          {/* White Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-white/20 z-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl text-gray-900 leading-tight text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  איריס שני - ליווי מקצועי לעובדים ולמעסיקים
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  לא תמיד קל להבין מה באמת כתוב בתלוש המשכורת או מה מגיע לכם בזמן העבודה, בעת פיטורין או בפרישה.
                  <br /><br />
                  אני כאן כדי לעזור לכם לבדוק, להבין ולפעול - ייעוץ שכר אישי, בדיקת זכויות, ניכויים והפרשות, וליווי מקצועי שיבטיח שתקבלו את כל מה שמגיע לכם - לאורך כל הדרך.
                </p>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4"
                    asChild
                  >
                    <a href="#contact">בואו נדבר</a>
                  </Button>
                </div>
              </div>
              <div className="lg:order-first animate-fade-in-left" style={{ animationDelay: '0.3s' }}>
                <img
                  src={heroImage}
                  alt="Iris Shani - Professional HR Consultant"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Employee Services */}
        <section id="employee-services" style={{ paddingTop: '10rem', paddingBottom: '10rem', marginTop: '4rem' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontWeight: 500 }}>
                לעובדים - לדעת מה מגיע לכם
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {employeeServices.map((service, index) => (
                <Card
                  key={index}
                  className="h-80 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white cursor-pointer border-0 shadow-2xl group"
                  onClick={() => handleServiceClick(service)}
                >
                  <CardContent className="p-8 text-center space-y-6 h-full flex flex-col justify-center">
                    <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="p-4 rounded-full bg-orange-400 group-hover:bg-orange-100 transition-colors duration-300">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-xl text-gray-900 font-semibold group-hover:text-orange-600 transition-colors duration-300 mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed flex-grow">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Employer Services */}
        <section id="employer-services" style={{ paddingTop: '10rem', paddingBottom: '10rem', marginTop: '4rem' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontWeight: 500 }}>
                עסקים קטנים ובינוניים - שקט וביטחון בניהול עובדים
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Empty column for spacing */}
              <div className='max-md:hidden'></div>

              {/* Centered service card */}
              {employerServices.map((service, index) => (
                <Card
                  key={index}
                  className="h-80 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white cursor-pointer border-0 shadow-2xl group"
                  onClick={() => handleServiceClick(service)}
                >
                  <CardContent className="p-8 text-center space-y-6 h-full flex flex-col justify-center">
                    <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="p-4 rounded-full bg-orange-50 group-hover:bg-orange-100 transition-colors duration-300">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-xl text-gray-900 font-semibold group-hover:text-orange-600 transition-colors duration-300 mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed flex-grow">{service.description}</p>
                  </CardContent>
                </Card>
              ))}

              {/* Empty column for spacing */}
              <div className='max-md:hidden'></div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" style={{ paddingTop: '10rem', paddingBottom: '10rem', marginTop: '4rem' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontWeight: 500 }}>
                נעים להכיר - אני איריס שני
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Profile Image */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl transform rotate-3"></div>
                  <img
                    src={heroImage}
                    alt="איריס שני - מומחית משאבי אנוש"
                    className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-right">הניסיון שלי</h3>
                  <p className="text-gray-700 leading-relaxed text-right text-lg mb-4">
                    עם יותר מ-20 שנות ניסיון בעולם השכר, יחסי העבודה וגיוס עובדים, למדתי דבר אחד חשוב -
                    מאחורי כל תלוש, חוזה או תהליך גיוס עומד אדם.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-right text-lg">
                    וכל אדם הוא עולם בפני עצמו, עם צרכים, חלומות ונסיבות חיים ייחודיות.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-right">המטרה שלי</h3>
                  <p className="text-gray-700 leading-relaxed text-right text-lg">
                    לעשות סדר, להרגיע, ללוות ולהחזיר ביטחון לעובדים ולמעסיקים.
                    אני רואה בעצמי גשר בין אנשים לעולם העבודה - "מתווכת אמון" שמחברת בין מעסיקים הוגנים
                    שאני מאמינה בהם לבין עובדים שאני מזהה אצלם את הפוטנציאל, המחויבות והערך האנושי.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-orange-100">
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-orange-500 rounded-full flex items-center justify-center" style={{ borderRadius: '50%', width: '64px', height: '64px' }}>
                    <Cog className="h-16 w-16 text-white" />
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-500 text-4xl font-bold" style={{ fontWeight: 600 }}>20+</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">שנות ניסיון</h4>
                <p className="text-gray-600">בתחום השכר ויחסי עבודה</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-orange-100">
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-orange-500 rounded-full flex items-center justify-center" style={{ borderRadius: '50%', width: '64px', height: '64px' }}>
                    <BriefcaseBusiness className="h-16 w-16 text-white" />
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-500 text-4xl font-bold" style={{ fontWeight: 600 }}>500+</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">עובדים</h4>
                <p className="text-gray-600">שקיבלו ליווי מקצועי</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-orange-100">
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-orange-500 rounded-full flex items-center justify-center" style={{ borderRadius: '50%', width: '64px', height: '64px' }}>
                    <GitGraph className="h-16 w-16 text-white" />
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-500 text-4xl font-bold" style={{ fontWeight: 600 }}>100%</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">מחויבות</h4>
                <p className="text-gray-600">להצלחת הלקוחות שלי</p>
              </div>
            </div>


            {/* Call to Action */}
            {/* <div className="text-center mt-12">
             <Button 
               size="lg" 
               className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-lg"
               asChild
             >
               <a href="#contact">בואו נדבר ונכיר</a>
             </Button>
           </div> */}
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" style={{ paddingTop: '10rem', paddingBottom: '10rem', marginTop: '4rem' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontWeight: 500 }}>
                עדכונים מהשטח
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {blogPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white border-0 shadow-lg group">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <p className="text-sm text-orange-500 font-medium">{post.date}</p>
                    <h3 className="text-lg text-gray-900 leading-tight font-semibold group-hover:text-orange-600 transition-colors duration-300">{post.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4">
                לקריאת כל הפוסטים
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ paddingTop: '5rem', paddingBottom: '5rem', marginTop: '4rem' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center bg-white/40 backdrop-blur-sm rounded-3xl shadow-lg p-8 relative">
              {/* Artboard Pattern Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl"
                style={{
                  backgroundImage: `url(${artboardImage})`,
                  opacity: 0.08,
                  zIndex: 1
                }}
              ></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl text-gray-900 mb-8">
                  בואו נדבר
                </h2>
                <p className="text-xl text-gray-700 mb-12">
                  אני זמינה לשאלות, ליווי וייעוץ - אל תהססו לפנות
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="space-y-2">
                    <Phone className="h-8 w-8 text-orange-500 mx-auto" />
                    <p className="text-gray-600">טלפון</p>
                    <p className="text-lg">0508836955</p>
                  </div>
                  <div className="space-y-2">
                    <Mail className="h-8 w-8 text-orange-500 mx-auto" />
                    <p className="text-gray-600">מייל</p>
                    <a href="mailto:info@iris-hr.work" className="text-lg hover:text-orange-500 transition-colors">info@iris-hr.work</a>
                  </div>
                  <div className="space-y-2">
                    <MapPin className="h-8 w-8 text-orange-500 mx-auto" />
                    <p className="text-gray-600">מיקום</p>
                    <p className="text-lg">גבעת ברנר</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4"
                  asChild
                >
                  <a href="https://wa.me/972508836955" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    דברו איתי ב-WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Dialog */}
        <Dialog open={isAboutDialogOpen} onOpenChange={setIsAboutDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-right">
                נעים להכיר - אני איריס שני
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 pt-4 text-right">
              <div>
                <p className="text-gray-700 leading-relaxed text-right mb-6">
                  עם יותר מ-20 שנות ניסיון בעולם השכר, יחסי העבודה וגיוס עובדים, למדתי דבר אחד חשוב -
                  מאחורי כל תלוש, חוזה או תהליך גיוס עומד אדם.
                  וכל אדם הוא עולם בפני עצמו, עם צרכים, חלומות ונסיבות חיים ייחודיות.
                </p>

                <p className="text-gray-700 leading-relaxed text-right mb-6">
                  המטרה שלי פשוטה - לעשות סדר, להרגיע, ללוות ולהחזיר ביטחון לעובדים ולמעסיקים.
                </p>

                <p className="text-gray-700 leading-relaxed text-right mb-6">
                  לעובדים - אני עוזרת להבין את תנאי ההעסקה והשכר, לבדוק זכויות, לנתח תלושי שכר ולהתנהל נכון מול ביטוח לאומי ומס הכנסה.
                  למעסיקים - אני מציעה ליווי מקצועי בגיוס והשמה, בבניית חוזי עבודה ובהתנהלות שוטפת עם עובדים - כאילו יש להם מנהלת משאבי אנוש צמודה לעסק.
                </p>

                <p className="text-gray-700 leading-relaxed text-right mb-6">
                  אני רואה בעצמי גשר בין אנשים לעולם העבודה -
                  "מתווכת אמון" שמחברת בין מעסיקים הוגנים שאני מאמינה בהם לבין עובדים שאני מזהה אצלם את הפוטנציאל, המחויבות והערך האנושי.
                </p>

                <p className="text-gray-700 leading-relaxed text-right">
                  הכול נעשה בגישה אישית, באמפתיה מלאה, בשפה פשוטה וברורה -
                  ובמחירים נגישים שמתאימים לעובדים ולעסקים קטנים ובינוניים.
                </p>
              </div>

              <div className="flex justify-center pt-6 border-t">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 mr-4"
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
                  className="px-8"
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

            <div className="space-y-6 pt-4 text-right">
              <div>
                <p className="text-gray-700 leading-relaxed text-right">
                  ברוכים הבאים לאתר של איריס שני - ייעוץ לעובדים ולמעסיקים (להלן: "האתר").
                  השימוש באתר זה כפוף לתנאים המפורטים להלן.
                  אנא קרא אותם בקפידה, שכן השימוש באתר מעיד על הסכמתך להם.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">1. מטרת האתר</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  האתר נועד לספק מידע כללי, טיפים מקצועיים ותוכן כללי בנושאי דיני עבודה, שכר, זכויות עובדים ויחסי עבודה.
                  התכנים באתר ניתנים לצורכי ידע והכוונה בלבד, ואינם מהווים ייעוץ משפטי, חשבונאי או מקצועי מכל סוג.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">2. אין באמור באתר משום תחליף לייעוץ משפטי</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  התכנים באתר אינם מהווים תחליף לייעוץ אישי מקצועי או משפטי.
                  איריס שני אינה אחראית לכל פעולה שתבוצע על סמך מידע המתפרסם באתר, וכל משתמש נושא באחריות המלאה לשימוש שהוא עושה בתוכן.
                  מומלץ לפנות באופן אישי לייעוץ פרטני לפני קבלת החלטות הקשורות לדיני עבודה, שכר או מיסוי.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">3. אחריות מוגבלת</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  האתר והתכנים בו ניתנים כפי שהם ("As-Is") ללא אחריות מכל סוג, מפורשת או משתמעת.
                  איריס שני לא תישא באחריות לכל נזק, ישיר או עקיף, שייגרם עקב שימוש במידע שבאתר או בשירותים חיצוניים המקושרים אליו.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">4. קניין רוחני</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  כל הזכויות בתכנים, בטקסטים, בעיצוב, בלוגו ובכל חומר חזותי באתר שמורות לאיריס שני.
                  אין להעתיק, לשכפל, להפיץ או לעשות שימוש מסחרי בתכני האתר ללא אישור מראש ובכתב.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">5. קישורים חיצוניים</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  האתר עשוי להכיל קישורים לאתרים אחרים לצורך העשרת הידע בלבד.
                  אין לראות בהצגת קישורים אלה כהמלצה או אחריות כלשהי לתוכן באתרים חיצוניים.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">6. יצירת קשר</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  לשאלות, פניות או ייעוץ אישי ניתן ליצור קשר עם איריס שני בכתובת הדוא"ל:
                  info@iris-hr.work
                  או בטלפון: 050-8836955
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">7. שינוי תנאים</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  איריס שני שומרת לעצמה את הזכות לעדכן מעת לעת את תנאי השימוש באתר.
                  הגרסה העדכנית תפורסם תמיד בעמוד זה, והשימוש באתר לאחר עדכון כזה ייחשב כהסכמה לתנאים המעודכנים.
                </p>
              </div>

              <div className="border-t pt-6 text-center">
                <p className="text-gray-600 text-sm text-center">
                  © כל הזכויות שמורות לאיריס שני - ייעוץ לעובדים ולמעסיקים
                </p>
                <p className="text-gray-600 text-sm text-center">www.iris-hr.work</p>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsTermsDialogOpen(false)}
                  className="px-8"
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

            <div className="space-y-6 pt-4 text-right">
              <div>
                <p className="text-gray-700 leading-relaxed text-right">
                  ברוכים הבאים לאתר של איריס שני - ייעוץ לעובדים ולמעסיקים (להלן: "האתר").
                  שמירה על פרטיות המבקרים והלקוחות שלנו חשובה לנו מאוד. מטרת מסמך זה היא להסביר כיצד אנו אוספים, משתמשים ושומרים על המידע האישי הנמסר לנו דרך האתר.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">1. איזה מידע אנו אוספים?</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  המידע שאנו עשויים לאסוף כולל: שם מלא, מספר טלפון, כתובת דוא"ל, ומידע נוסף שתבחרו לשתף עימנו בעת יצירת קשר או קביעת פגישה.
                  בנוסף, אנו עשויים לאסוף מידע טכני כללי כגון כתובת IP וסוג הדפדפן לצורכי שיפור חוויית הגלישה באתר.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">2. כיצד אנו משתמשים במידע?</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  המידע שאנו אוספים משמש אותנו לצורך מתן שירות מקצועי, יצירת קשר עם לקוחות פוטנציאליים, קביעת פגישות וייעוץ.
                  אנו לא נעשה שימוש במידע שלכם למטרות שיווק או פרסום ללא הסכמתכם המפורשת.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">3. שמירה ואבטחת מידע</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  אנו נוקטים אמצעים סבירים לשמירה על המידע שלכם באופן מאובטח, אולם אין באפשרותנו להבטיח אבטחה מוחלטת.
                  המידע שלכם יישמר אצלנו כל עוד הוא נדרש למתן השירות או לפי הוראות החוק.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">4. העברת מידע לצדדים שלישיים</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  אנו לא נמכור, נשכיר או נעביר את המידע האישי שלכם לצדדים שלישיים, אלא במקרים הבאים:
                  כאשר אתם נותנים הסכמה מפורשת לכך, כאשר זה נדרש על פי חוק, או כאשר זה הכרחי למתן השירות המבוקש על ידכם.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">5. זכויותיכם</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  לכם הזכות לגשת למידע שלכם, לבקש לעדכן או למחוק אותו.
                  לבקשות כאלה, אנא פנו אלינו בכתובת: info@iris-hr.work או בטלפון: 050-8836955.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">6. עוגיות (Cookies)</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  האתר עשוי להשתמש בעוגיות טכניות לצורך שיפור חוויית הגלישה.
                  אנו לא משתמשים בעוגיות למעקב או לפרסום ממוקד ללא הסכמתכם.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">7. שינויים במדיניות הפרטיות</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  אנו שומרים לעצמנו את הזכות לעדכן מדיניות פרטיות זו מעת לעת.
                  כל שינוי יפורסם בעמוד זה, והשימוש באתר לאחר עדכון המדיניות ייחשב כהסכמה לתנאים החדשים.
                </p>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-3 text-right">8. יצירת קשר</h4>
                <p className="text-gray-700 leading-relaxed text-right">
                  לשאלות או הבהרות לגבי מדיניות פרטיות זו, ניתן ליצור קשר בכתובת:
                  info@iris-hr.work או בטלפון: 050-8836955.
                </p>
              </div>

              <div className="border-t pt-6 text-center">
                <p className="text-gray-600 text-sm text-center">
                  © כל הזכויות שמורות לאיריס שני - ייעוץ לעובדים ולמעסיקים
                </p>
                <p className="text-gray-600 text-sm text-center">www.iris-hr.work</p>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsPrivacyDialogOpen(false)}
                  className="px-8"
                >
                  סגור
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Service Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl" dir="rtl">
            {selectedService && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl text-right flex items-center justify-end gap-3 flex-row-reverse">
                    {selectedService.icon}
                    <span>{selectedService.title}</span>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 pt-4 text-right max-h-[40vh] overflow-y-auto" style={{ maxHeight: '70vh' }}>
                  {selectedService.subtitle && (
                    <div className="bg-white p-4 rounded text-right">
                      <p className="text-orange-500 text-right">{selectedService.subtitle}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-gray-700 text-sm leading-relaxed text-right">
                      {selectedService.fullDescription}
                    </p>
                  </div>

                  {selectedService.benefits && (
                    <div>
                      <h4 className="text-lg text-gray-900 mb-3 text-right">
                        {selectedService.benefitsTitle || "היתרונות שלכם"}
                      </h4>
                      <ul className="space-y-3">
                        {selectedService.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3 text-right flex-row-reverse">
                            <span className="text-gray-700 leading-relaxed flex-1 text-right text-sm">{benefit}</span>
                            <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedService.additionalBenefits && (
                    <div>
                      <h4 className="text-lg text-gray-900 mb-3 text-right">
                        {selectedService.additionalBenefitsTitle || "יתרונות נוספים"}
                      </h4>
                      <ul className="space-y-3">
                        {selectedService.additionalBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3 text-right flex-row-reverse">
                            <span className="text-gray-700 leading-relaxed flex-1 text-right text-sm">{benefit}</span>
                            <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
                <div className="flex justify-center gap-4 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="px-8"
                  >
                    סגור
                  </Button>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                    asChild
                  >
                    <a href="https://wa.me/972508836955" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <span>{selectedService.buttonText || "צור קשר עכשיו"}</span>
                      <MessageCircle className="h-5 w-5 flex-shrink-0" />
                    </a>
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

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
                  <p>
                    <button
                      onClick={() => setIsAboutDialogOpen(true)}
                      className="text-gray-300 hover:text-orange-500 transition-colors"
                    >
                      עלי
                    </button>
                  </p>
                  <p><a href="#employee-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים לעובדים</a></p>
                  <p><a href="#employer-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים למעסיקים</a></p>
                  <p><a href="#about" className="text-gray-300 hover:text-orange-500 transition-colors">אודותיי</a></p>
                  <p><a href="#blog" className="text-gray-300 hover:text-orange-500 transition-colors">בלוג</a></p>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg mb-4">מידע משפטי</h3>
                <div className="space-y-2">
                  <p>
                    <button
                      onClick={() => setIsPrivacyDialogOpen(true)}
                      className="text-gray-300 hover:text-orange-500 transition-colors"
                    >
                      מדיניות פרטיות
                    </button>
                  </p>
                  <p>
                    <button
                      onClick={() => setIsTermsDialogOpen(true)}
                      className="text-gray-300 hover:text-orange-500 transition-colors"
                    >
                      תנאי שימוש
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center">
              <p className="text-gray-400">© 2024 איריס שני - ייעוץ משאבי אנוש. כל הזכויות שמורות.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

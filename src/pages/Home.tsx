import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, Phone, Mail, MapPin, User, FileText, PiggyBank, LogOut, BriefcaseBusiness, X, GitGraph, Cog, Send, Calendar, Quote, PenLine } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { blogService } from '../services/blogService';
import { testimonialService } from '../services/testimonialService';
import { BlogPost, Testimonial } from '../lib/supabase';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import CookieBanner from '../components/CookieBanner';
// @ts-ignore
import heroImage from 'figma:asset/24970e13ba695a8b5fca661a1de5bf574ad76d59.png';
// @ts-ignore
import backgroundImage from '../assets/background.png';
// @ts-ignore
import artboardImage from '../../Artboard 1.png';

interface Service {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  fullDescription: string;
  benefits?: string[];
  benefitsTitle?: string;
  additionalBenefits?: string[];
  additionalBenefitsTitle?: string;
  buttonText?: string;
}

export default function Home() {
  const location = useLocation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Blog posts state
  const [featuredBlogPosts, setFeaturedBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({ name: '', role: '', content: '' });
  const [testimonialSubmitting, setTestimonialSubmitting] = useState(false);
  const [testimonialStatus, setTestimonialStatus] = useState<'success' | 'error' | null>(null);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const businessImage = "https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTk0MDA3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const documentsImage = "https://images.unsplash.com/photo-1746221331496-a87689fc8eb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBkb2N1bWVudHMlMjBjYWxjdWxhdG9yfGVufDF8fHx8MTc1OTQwMTU5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const lawImage = "https://images.unsplash.com/photo-1583521214690-73421a1829a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrcGxhY2UlMjBsYXclMjBkb2N1bWVudHN8ZW58MXx8fHwxNzU5NDAxNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // Load featured blog posts on component mount
  useEffect(() => {
    loadFeaturedBlogs();
    loadTestimonials();
  }, []);

  // Handle scroll to section when hash changes
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1); // Remove the '#' 
      const element = document.getElementById(elementId);
      if (element) {
        // Add a small delay to ensure the page has rendered
        setTimeout(() => {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location.hash]);

  const loadFeaturedBlogs = async () => {
    setBlogLoading(true);
    try {
      // First, try to fetch featured posts from database
      let featuredPosts = await blogService.getFeaturedBlogPosts(3);
      console.log('Featured posts from DB:', featuredPosts);
      
      // If no featured posts, fetch the 3 most recent posts instead
      if (featuredPosts.length === 0) {
        console.log('No featured posts found, fetching recent posts...');
        const allPosts = await blogService.getBlogPosts();
        featuredPosts = allPosts.slice(0, 3);
        console.log('Recent posts:', featuredPosts);
      }
      
      setFeaturedBlogPosts(featuredPosts);
    } catch (error) {
      console.error('Error loading featured blog posts:', error);
      // Fall back to empty array - will show fallback content
      setFeaturedBlogPosts([]);
    } finally {
      setBlogLoading(false);
    }
  };

  const loadTestimonials = async () => {
    try {
      const approved = await testimonialService.getApprovedTestimonials();
      setTestimonials(approved);
    } catch (error) {
      console.error('Error loading testimonials:', error);
      setTestimonials([]);
    }
  };

  const handleTestimonialInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestimonialForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestimonialSubmitting(true);
    setTestimonialStatus(null);

    try {
      await testimonialService.submitTestimonial({
        name: testimonialForm.name.trim(),
        role: testimonialForm.role.trim() || undefined,
        content: testimonialForm.content.trim(),
      });
      setTestimonialStatus('success');
      setTestimonialForm({ name: '', role: '', content: '' });
    } catch (error) {
      console.error('Testimonial submission error:', error);
      setTestimonialStatus('error');
    } finally {
      setTestimonialSubmitting(false);
    }
  };

  const openTestimonialDialog = () => {
    setTestimonialStatus(null);
    setIsTestimonialDialogOpen(true);
  };

  const formatBlogDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  // Contact form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Use a hidden iframe to submit the form and avoid CORS issues
      const form = e.target;
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = 'web3forms-iframe';
      document.body.appendChild(iframe);

      // Set form target to the iframe
      form.target = 'web3forms-iframe';
      form.action = 'https://api.web3forms.com/submit';
      form.method = 'POST';

      // Add hidden fields for Web3Forms
      const hiddenFields = {
        'access_key': '0ddbf514-10e6-4118-9585-204a4d905960',
        'subject': 'בקשה להצעת מחיר - iris-hr.work',
        'from_name': 'iris-hr.work Contact Form',
        'to': 'info@iris-hr.work',
        'redirect': 'false'
      };

      // Add hidden inputs
      Object.entries(hiddenFields).forEach(([name, value]) => {
        let input = form.querySelector(`input[name="${name}"]`);
        if (!input) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          form.appendChild(input);
        }
        input.value = value;
      });

      // Handle iframe load event
      iframe.onload = () => {
        // Assume success since Web3Forms doesn't return CORS-friendly responses
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });

        // Clean up
        document.body.removeChild(iframe);
        form.target = '';
        form.action = '';
        form.method = '';

        // Remove hidden inputs
        Object.keys(hiddenFields).forEach(name => {
          const input = form.querySelector(`input[name="${name}"]`);
          if (input) {
            form.removeChild(input);
          }
        });

        setIsSubmitting(false);
      };

      // Submit the form
      form.submit();

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
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
      title: "סיום העסקה",
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

  // Fallback static posts in case no featured posts are available
  const fallbackBlogPosts = [
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
      <SEO
        title="איריס שני - יועצת משאבי אנוש | ייעוץ שכר וזכויות עובדים"
        description="יועצת משאבי אנוש מקצועית המתמחה בייעוץ שכר, בדיקת זכויות עובדים, ניכויים והפרשות. שירותים מקצועיים לעובדים ומעסיקים עם ניסיון של שנים בתחום."
        keywords="יועצת משאבי אנוש, ייעוץ שכר, זכויות עובדים, ניכויים והפרשות, בדיקת שכר, תלוש משכורת, פיצויי פיטורים, חופשה, מחלה, פנסיה, קרן השתלמות, איריס שני"
        url="/"
        image="/iris-og.png"
        services={[
          ...employeeServices.map((s) => ({
            name: s.title,
            description: s.fullDescription,
            url: '/#employee-services',
          })),
          ...employerServices.map((s) => ({
            name: s.title,
            description: s.fullDescription,
            url: '/#employer-services',
          })),
        ]}
      />
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-60 z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="relative z-10">
        <Navbar activeSection="home" />

        {/* Hero Section */}
        <section id="home" className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-20" style={{ paddingTop: '8rem' }}>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" >
            <div className="flex justify-center items-center" style={{
            minHeight: '600px'
          }}>
              <div className="space-y-8 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl text-gray-900 leading-tight text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  איריס שני - ליווי מקצועי לעובדים ולמעסיקים
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  לא תמיד קל להבין מה באמת כתוב בתלוש המשכורת או מה מגיע לכם בזמן העבודה, בעת פיטורין או בפרישה.
                  <br /><br />
                  אני כאן כדי לעזור לכם לבדוק, להבין ולפעול - ייעוץ שכר אישי, בדיקת זכויות, ניכויים והפרשות, וליווי מקצועי שיבטיח שתקבלו את כל מה שמגיע לכם - לאורך כל הדרך.
                </p>
                <div className="animate-fade-in-up flex justify-center" style={{ animationDelay: '0.6s' }}>
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4"
                    asChild
                  >
                    <a href="#contact">בואו נדבר</a>
                  </Button>
                </div>
              </div>
              {/* <div className="lg:order-first flex justify-center animate-fade-in-left" style={{ animationDelay: '0.3s' }}>
                <img
                  src="/images/iris-2.jpg"
                  alt="איריס שני - יועצת משאבי אנוש מקצועית"
                  className="rounded-2xl shadow-2xl w-[200px] h-[500px] object-cover"
                />
              </div> */}
            </div>
          </div>
        </section>
        {/* Employee Services */}
        <section id="employee-services" style={{ paddingTop: '8rem', paddingBottom: '8rem', marginTop: '4rem' }}>
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
        <section id="employer-services" style={{ paddingTop: '8rem', paddingBottom: '8rem', marginTop: '4rem' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontWeight: 500 }}>
              למעסיקים  - עסקים קטנים ובינוניים</h2>
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
        <section id="about" style={{ paddingTop: '8rem', paddingBottom: '8rem', marginTop: '4rem' }}>
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
                    alt="איריס שני - יועצת משאבי אנוש מקצועית"
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
                    תנו לי לעזור לכם לעשות סדר, להרגיע, ללוות ולהחזיר את הביטחון העצמי. קהל הלקוחות שלי הוא גם שכירים וגם מעסיקים. ביחד עם הליווי המקצועי נוכל לבנות גשר ביניכם לבין עולם התעסוקה עם אמון, חיבור בין מעסיקים הוגנים שאני מאמינה בהם לבין עובדים שיש להם את הפוטנציאל המתאים והכל תוך אמון, שקיפות, מחויבות וערך אנושי גבוה.
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
                  <span className="text-orange-500 text-4xl font-bold" style={{ fontWeight: 600 }}>1500+</span>
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

        {/* Testimonials Section */}
        <section id="testimonials" style={{ paddingTop: '8rem', paddingBottom: '8rem', marginTop: '4rem' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontWeight: 500 }}>
                לקוחות ממליצים
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                מילים חמות מאנשים שליוויתי בדרך
              </p>
            </div>

            {testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {testimonials.map((testimonial) => (
                  <Card
                    key={testimonial.id}
                    className="bg-white border-0 shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full"
                  >
                    <CardContent className="p-8 flex flex-col h-full text-right">
                      <Quote className="h-8 w-8 text-orange-500 mb-4" aria-hidden="true" />
                      <p className="text-gray-700 leading-relaxed flex-grow" style={{ whiteSpace: 'pre-line' }}>
                        {testimonial.content}
                      </p>
                      <div className="border-t border-orange-100 mt-6 pt-4">
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        {testimonial.role && (
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg mx-auto mb-12" style={{ padding: '3rem 2rem', maxWidth: '42rem' }}>
                <Quote className="h-10 w-10 text-orange-500 mx-auto mb-4" aria-hidden="true" />
                <p className="text-lg text-gray-700 leading-relaxed">
                  ליוויתי אתכם בבדיקת תלוש, בהסכם עבודה או בסיום העסקה?
                  <br />
                  אשמח אם תשתפו כאן במילים שלכם - זה עוזר לאחרים לדעת למה לצפות.
                </p>
              </div>
            )}

            <div className="text-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4"
                onClick={openTestimonialDialog}
              >
                <PenLine className="ml-2 h-5 w-5" />
                כתבו המלצה
              </Button>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" style={{ paddingTop: '8rem', paddingBottom: '8rem', marginTop: '4rem' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontWeight: 500 }}>
                עדכונים מהשטח
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {blogLoading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden bg-white border-0 shadow-lg rounded-xl">
                    <div className="aspect-video bg-gray-200 animate-pulse rounded-t-xl"></div>
                    <CardContent className="p-6 space-y-3">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-24"></div>
                      <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : featuredBlogPosts.length > 0 ? (
                // Display posts from database
                featuredBlogPosts.map((post, index) => {
                  const postId = (post as BlogPost).id;
                  const cardContent = (
                    <Card className="overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white border-0 shadow-lg rounded-xl group h-full flex flex-col cursor-pointer">
                        <div className="aspect-video overflow-hidden relative rounded-t-xl">
                          <img
                            src={post.thumbnail_url || documentsImage}
                            alt={post.title ? `תמונה עבור הפוסט: ${post.title}` : 'תמונת ממוזערת של פוסט בבלוג'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src !== documentsImage && target.src !== businessImage && target.src !== lawImage) {
                                target.src = documentsImage;
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Featured Badge for real blog posts */}
                          {post.featured && (
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-orange-500 text-white shadow-md">
                                מומלץ
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6 space-y-3 flex-1 flex flex-col">
                          <div className="flex items-center gap-2 text-sm text-orange-500 font-medium">
                            <Calendar className="h-4 w-4" />
                            <span>{formatBlogDate(post.created_at)}</span>
                          </div>
                          <h3 className="text-lg text-gray-900 leading-tight font-semibold group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
                            {post.summary || (post.subtitle && post.subtitle.length > 100 ? post.subtitle.substring(0, 100) + '...' : post.subtitle) || ''}
                          </p>

                          {/* Tags for real blog posts */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                              {post.tags.slice(0, 2).map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                  );
                  
                  return postId ? (
                    <Link key={post.id || index} to={`/blogs/${postId}`} className="block">
                      {cardContent}
                    </Link>
                  ) : (
                    <div key={post.id || index} className="block">
                      {cardContent}
                    </div>
                  );
                })
              ) : (
                // Fallback posts only if database is completely empty or failed
                fallbackBlogPosts.map((post, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white border-0 shadow-lg rounded-xl group h-full flex flex-col">
                    <div className="aspect-video overflow-hidden relative rounded-t-xl">
                      <img
                        src={post.image || documentsImage}
                        alt={post.title ? `תמונה עבור הפוסט: ${post.title}` : 'תמונת ממוזערת של פוסט בבלוג'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6 space-y-3 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-sm text-orange-500 font-medium">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-lg text-gray-900 leading-tight font-semibold group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            <div className="text-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4" asChild>
                <Link to="/blogs">
                  לקריאת כל הפוסטים
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ paddingTop: '5rem', paddingBottom: '5rem', marginTop: '4rem' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontWeight: 500 }}>
          השאירו פרטים כבר עכשיו לקבלת הצעת מחיר
              </h2>
            </div>

            {/* Contact Form - Full Width */}
            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-right">קבלו הצעת מחיר</h3>

                <form
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  dir="rtl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-right block mb-2 text-gray-700">שם מלא *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="text-right h-12 text-base"
                        placeholder="הכנס את שמך המלא"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-right block mb-2 text-gray-700">אימייל *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="text-right h-12 text-base"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-right block mb-2 text-gray-700">טלפון *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="text-right h-12 text-base"
                        placeholder="050-1234567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service" className="text-right block mb-2 text-gray-700">שירות מבוקש *</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-right bg-white h-12 text-base"
                      >
                        <option value="">בחר שירות</option>
                        <option value="ניתוח תלוש שכר">ניתוח תלוש שכר</option>
                        <option value="ייעוץ על הסכמי עבודה">ייעוץ על הסכמי עבודה</option>
                        <option value="ליווי מול רשויות">ליווי מול רשויות</option>
                        <option value="פנסיה בתלוש השכר">פנסיה בתלוש השכר</option>
                        <option value="סיומי עבודה">סיומי עבודה</option>
                        <option value="ליווי במציאת עבודה">ליווי במציאת עבודה</option>
                        <option value="גיוס בהתאמה אישית">גיוס בהתאמה אישית</option>
                        <option value="שירות אחר">שירות אחר</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-right block mb-2 text-gray-700">הודעה *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      style={{ minHeight: '100px' }}
                      className="text-right min-h-[100px]"
                      placeholder="ספרו לנו על הצרכים שלכם ומה אתם מחפשים..."
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div
                      className="bg-green-50 border border-green-200 rounded-md p-4 text-right"
                      role="alert"
                      aria-live="polite"
                    >
                      <p className="text-green-800">תודה! ההודעה נשלחה בהצלחה. נחזור אליכם בהקדם.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div
                      className="bg-red-50 border border-red-200 rounded-md p-4 text-right"
                      role="alert"
                      aria-live="assertive"
                    >
                      <p className="text-red-800">אירעה שגיאה. אנא נסו שוב או צרו קשר ישירות.</p>
                    </div>
                  )}


                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        שולח...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="h-5 w-5" />
                        שלח בקשה להצעת מחיר
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Original CTA Section */}
            <div className="mt-16 text-center bg-white/40 backdrop-blur-sm rounded-3xl shadow-lg p-8 relative" style={{ marginTop: '8rem' }}>
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

        {/* Service Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl" dir="rtl">
            {selectedService && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl text-right flex items-center justify-end gap-3 flex-row-reverse">
                    {selectedService?.icon}
                    <span>{selectedService?.title}</span>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 pt-4 text-right max-h-[40vh] overflow-y-auto" style={{ maxHeight: '70vh' }}>
                  {selectedService?.subtitle && (
                    <div className="bg-white p-4 rounded text-right">
                      <p className="text-orange-500 text-right">{selectedService?.subtitle}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-gray-700 text-sm leading-relaxed text-right">
                      {selectedService?.fullDescription}
                    </p>
                  </div>

                  {selectedService?.benefits && (
                    <div>
                      <h4 className="text-lg text-gray-900 mb-3 text-right">
                        {selectedService?.benefitsTitle || "היתרונות שלכם"}
                      </h4>
                      <ul className="space-y-3">
                        {selectedService?.benefits?.map((benefit: string, index: number) => (
                          <li key={index} className="flex items-start gap-3 text-right flex-row-reverse">
                            <span className="text-gray-700 leading-relaxed flex-1 text-right text-sm">{benefit}</span>
                            {/* <span className="text-orange-500 flex-shrink-0">•</span> */}
                            <span style={{ width: '4px', height: '4px', backgroundColor: '#f97316', borderRadius: '50%', marginTop: '10px' }} className="text-orange-500 flex-shrink-0"></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedService?.additionalBenefits && (
                    <div>
                      <h4 className="text-lg text-gray-900 mb-3 text-right">
                        {selectedService?.additionalBenefitsTitle || "יתרונות נוספים"}
                      </h4>
                      <ul className="space-y-3">
                        {selectedService?.additionalBenefits?.map((benefit: string, index: number) => (
                          <li key={index} className="flex items-start gap-3 text-right flex-row-reverse">
                            <span className="text-gray-700 leading-relaxed flex-1 text-right text-sm">{benefit}</span>
                            <span style={{ width: '4px', height: '4px', backgroundColor: '#f97316', borderRadius: '50%', marginTop: '10px' }} className="text-orange-500 flex-shrink-0"></span>
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
                      <span>{selectedService?.buttonText || "צור קשר עכשיו"}</span>
                      <MessageCircle className="h-5 w-5 flex-shrink-0" />
                    </a>
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Testimonial Submission Dialog */}
        <Dialog open={isTestimonialDialogOpen} onOpenChange={setIsTestimonialDialogOpen}>
          <DialogContent dir="rtl" style={{ maxWidth: '36rem' }}>
            <DialogHeader>
              <DialogTitle className="text-2xl text-right">כתבו המלצה</DialogTitle>
            </DialogHeader>

            {testimonialStatus === 'success' ? (
              <div className="space-y-6 pt-4 text-right">
                <div
                  className="bg-green-50 border border-green-200 rounded-md p-4 text-right"
                  role="alert"
                  aria-live="polite"
                >
                  <p className="text-green-800">
                    תודה רבה על המילים החמות! ההמלצה התקבלה ותוצג באתר לאחר אישור.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setIsTestimonialDialogOpen(false)}
                    className="px-8"
                  >
                    סגור
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleTestimonialSubmit} className="space-y-6 pt-4" dir="rtl">
                <div>
                  <Label htmlFor="testimonial-name" className="text-right block mb-2 text-gray-700">שם מלא *</Label>
                  <Input
                    id="testimonial-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={testimonialForm.name}
                    onChange={handleTestimonialInputChange}
                    className="text-right h-12 text-base"
                    placeholder="השם שיוצג לצד ההמלצה"
                  />
                </div>

                <div>
                  <Label htmlFor="testimonial-role" className="text-right block mb-2 text-gray-700">השירות שקיבלתם (לא חובה)</Label>
                  <Input
                    id="testimonial-role"
                    name="role"
                    type="text"
                    maxLength={150}
                    value={testimonialForm.role}
                    onChange={handleTestimonialInputChange}
                    className="text-right h-12 text-base"
                    placeholder="לדוגמה: בדיקת תלוש שכר, ליווי בסיום העסקה"
                  />
                </div>

                <div>
                  <Label htmlFor="testimonial-content" className="text-right block mb-2 text-gray-700">ההמלצה שלכם *</Label>
                  <Textarea
                    id="testimonial-content"
                    name="content"
                    required
                    minLength={10}
                    maxLength={2000}
                    value={testimonialForm.content}
                    onChange={handleTestimonialInputChange}
                    style={{ minHeight: '120px' }}
                    className="text-right min-h-[120px]"
                    placeholder="ספרו במילים שלכם איך היה הליווי ומה הוא נתן לכם..."
                  />
                </div>

                {testimonialStatus === 'error' && (
                  <div
                    className="bg-red-50 border border-red-200 rounded-md p-4 text-right"
                    role="alert"
                    aria-live="assertive"
                  >
                    <p className="text-red-800">אירעה שגיאה בשליחה. אנא נסו שוב מאוחר יותר.</p>
                  </div>
                )}

                <div className="flex justify-center gap-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsTestimonialDialogOpen(false)}
                    className="px-8"
                    disabled={testimonialSubmitting}
                  >
                    ביטול
                  </Button>
                  <Button
                    type="submit"
                    disabled={testimonialSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                  >
                    {testimonialSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        שולח...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="h-5 w-5" />
                        שלחו המלצה
                      </span>
                    )}
                  </Button>
                </div>
              </form>
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
                  <p><a href="#employee-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים לעובדים</a></p>
                  <p><a href="#employer-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים למעסיקים</a></p>
                  <p><a href="#testimonials" className="text-gray-300 hover:text-orange-500 transition-colors">המלצות</a></p>
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
      {/* <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999, backgroundColor: 'white', padding: '10px', borderTop: '1px solid #e0e0e0' }}>Cookies Banner</div> */}
      <CookieBanner />
    </div>
  );
}

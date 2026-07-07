import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, Check, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import CookieBanner from '../components/CookieBanner';
import { getServiceBySlug, services } from '../data/services';
import { WHATSAPP_URL } from '../data/contact';
import { trackWhatsAppClick } from '../utils/analytics';
// @ts-ignore
import backgroundImage from '../assets/background.png';
// @ts-ignore
import artboardImage from '../../Artboard 1.png';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Unknown slug — noindex and offer a way back rather than a blank screen.
  if (!service) {
    return (
      <div className="min-h-screen relative" dir="rtl">
        <SEO title="השירות לא נמצא | איריס שני" url={`/services/${slug || ''}`} noindex />
        <div className="relative z-10">
          <Navbar />
          <section className="max-w-3xl mx-auto text-center" style={{ paddingTop: '10rem', paddingBottom: '8rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">השירות לא נמצא</h1>
            <p className="text-gray-700 mb-8">ייתכן שהקישור שגוי או שהשירות כבר לא זמין.</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
              <Link to="/#employee-services">חזרה לכל השירותים</Link>
            </Button>
          </section>
        </div>
      </div>
    );
  }

  const { Icon } = service;
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const audienceAnchor = service.audience === 'employer' ? '/#employer-services' : '/#employee-services';
  const audienceLabel = service.audience === 'employer' ? 'שירותים למעסיקים' : 'שירותים לעובדים';

  return (
    <div className="min-h-screen relative" dir="rtl">
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        keywords={service.keywords}
        url={`/services/${service.slug}`}
        image="/iris-og.png"
        breadcrumbs={[
          { name: 'דף הבית', url: '/' },
          { name: audienceLabel, url: audienceAnchor },
          { name: service.title, url: `/services/${service.slug}` },
        ]}
        services={[
          { name: service.title, description: service.fullDescription, url: `/services/${service.slug}` },
        ]}
      />

      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-60 z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
        <section
          className="relative bg-gradient-to-br from-orange-50 to-orange-100"
          style={{ paddingTop: '8rem', paddingBottom: '5rem' }}
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
          <div className="max-w-4xl mx-auto relative z-10 text-center" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-white shadow-lg">
                <Icon className="h-10 w-10 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl text-gray-900 leading-tight" style={{ fontWeight: 500, marginBottom: '1rem' }}>
              {service.title}
            </h1>
            {service.subtitle && (
              <p className="text-xl text-orange-600 font-medium">{service.subtitle}</p>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="bg-white" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="max-w-4xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            {/* Breadcrumb (visible) */}
            <nav className="text-sm text-gray-500 mb-8" aria-label="breadcrumb">
              <Link to="/" className="hover:text-orange-500">דף הבית</Link>
              <span className="mx-2">/</span>
              <Link to={audienceAnchor} className="hover:text-orange-500">{audienceLabel}</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{service.title}</span>
            </nav>

            <p className="text-lg text-gray-700 leading-relaxed mb-10">{service.fullDescription}</p>

            {service.benefits && service.benefits.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {service.benefitsTitle || 'היתרונות שלכם'}
                </h2>
                <ul className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" aria-hidden="true" />
                      <span className="text-gray-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.additionalBenefits && service.additionalBenefits.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {service.additionalBenefitsTitle || 'יתרונות נוספים'}
                </h2>
                <ul className="space-y-4">
                  {service.additionalBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" aria-hidden="true" />
                      <span className="text-gray-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl text-center" style={{ padding: '2.5rem 2rem' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{service.buttonText || 'רוצים להתחיל?'}</h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                בואו נדבר - ייעוץ ראשוני והיכרות ללא התחייבות. אשמח לעזור לכם לקבל את כל מה שמגיע לכם.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick(`service-page:${service.slug}`)}
                  >
                    <MessageCircle className="ml-2 h-5 w-5" />
                    דברו איתי בוואטסאפ
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50" asChild>
                  <Link to="/#contact">השאירו פרטים לקבלת הצעת מחיר</Link>
                </Button>
              </div>
            </div>

            {/* Related services (internal linking for SEO) */}
            {otherServices.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">שירותים נוספים</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {otherServices.map((s) => {
                    const OtherIcon = s.Icon;
                    return (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="block bg-white p-6 rounded-2xl shadow-lg border border-orange-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="flex justify-center mb-4">
                          <div className="p-3 rounded-full bg-orange-50">
                            <OtherIcon className="h-7 w-7 text-orange-500" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{s.title}</h3>
                        <p className="text-gray-600 text-sm text-center">{s.shortDescription}</p>
                      </Link>
                    );
                  })}
                </div>
                <div className="text-center mt-8">
                  <Link to={audienceAnchor} className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium">
                    <ArrowLeft className="h-4 w-4" />
                    לכל ה{audienceLabel}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="max-w-7xl mx-auto text-center" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <p className="text-gray-400">© {new Date().getFullYear()} איריס שני - ייעוץ משאבי אנוש. כל הזכויות שמורות.</p>
          </div>
        </footer>
      </div>
      <CookieBanner />
    </div>
  );
}

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  imageWidth?: string;
  imageHeight?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  breadcrumbs?: { name: string; url: string }[];
}

const SEO: React.FC<SEOProps> = ({
  title = "איריס שני - יועצת משאבי אנוש | ייעוץ שכר וזכויות עובדים",
  description = "יועצת משאבי אנוש מקצועית המתמחה בייעוץ שכר, בדיקת זכויות עובדים, ניכויים והפרשות. שירותים מקצועיים לעובדים ומעסיקים עם ניסיון של שנים בתחום.",
  keywords = "יועצת משאבי אנוש, ייעוץ שכר, זכויות עובדים, ניכויים והפרשות, בדיקת שכר, תלוש משכורת, פיצויי פיטורים, חופשה, מחלה, פנסיה, קרן השתלמות",
  image = "/iris-og.png",
  url = "https://iris-hr.work",
  type = "website",
  author = "איריס שני",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  breadcrumbs,
  imageWidth = '1200',
  imageHeight = '630',
}) => {
  const fullTitle = title.includes("איריס שני") ? title : `${title} | איריס שני - יועצת משאבי אנוש`;
  const fullDescription = description.length > 160 ? description.slice(0, 157) + '...' : description;
  const fullImage = image.startsWith('http') ? image : `https://iris-hr.work${image}`;
  const fullUrl = url.startsWith('http') ? url : `https://iris-hr.work${url}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="language" content="he" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:secure_url" content={fullImage} />
      <meta property="og:image:type" content={image.endsWith('.png') ? 'image/png' : image.endsWith('.jpg') || image.endsWith('.jpeg') ? 'image/jpeg' : 'image/png'} />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="איריס שני - יועצת משאבי אנוש" />
      <meta property="og:locale" content="he_IL" />
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:section" content={section} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Favicon and App Icons */}
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "איריס שני - יועצת משאבי אנוש",
          "url": "https://iris-hr.work",
          "logo": fullImage,
          "description": fullDescription,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "גבעת ברנר",
            "addressCountry": "IL"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+972-50-8836955",
            "contactType": "customer service",
            "email": "info@iris-hr.work"
          },
          "sameAs": [
            "https://iris-hr.work"
          ]
        })}
      </script>
      
      {/* Structured Data - Person (for author) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "איריס שני",
          "jobTitle": "יועצת משאבי אנוש",
          "description": "יועצת משאבי אנוש מקצועית המתמחה בייעוץ שכר וזכויות עובדים",
          "email": "info@iris-hr.work",
          "telephone": "+972-50-8836955",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "גבעת ברנר",
            "addressCountry": "IL"
          }
        })}
      </script>

      {/* Structured Data - BreadcrumbList */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": crumb.name,
              "item": crumb.url.startsWith('http') ? crumb.url : `https://iris-hr.work${crumb.url}`
            }))
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { blogService } from '../services/blogService';
import { BlogPost } from '../lib/supabase';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import CookieBanner from '../components/CookieBanner';
// @ts-ignore
import backgroundImage from '../assets/background.png';
// @ts-ignore
import artboardImage from '../../Artboard 1.png';

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadBlogPost();
    }
  }, [id]);

  const loadBlogPost = async () => {
    if (!id) return;
    
    try {
      const post = await blogService.getBlogPost(id);
      setBlogPost(post);
    } catch (error) {
      console.error('Error loading blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleTagClick = (tag: string) => {
    // Navigate to blogs page with the tag as search parameter
    navigate(`/blogs?search=${encodeURIComponent(tag)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen relative" dir="rtl">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-60 z-0"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="relative z-10">
          <Navbar />

          {/* Loading State */}
          <div
            className="flex items-center justify-center"
            style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-orange-500" style={{ marginBottom: '1rem' }} aria-hidden="true" />
              <p className="text-gray-600">טוען פוסט...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen relative" dir="rtl">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-60 z-0"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="relative z-10">
          <Navbar showBackButton backButtonText="חזור לבלוג" backButtonHref="/blogs" />

          {/* Error State */}
          <div
            className="flex items-center justify-center"
            style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
            role="alert"
            aria-live="assertive"
          >
            <div className="text-center bg-white rounded-2xl shadow-lg max-w-md mx-auto" style={{ padding: '3rem' }}>
              <h3 className="text-xl font-medium text-gray-900" style={{ marginBottom: '0.5rem' }}>
                פוסט לא נמצא
              </h3>
              <p className="text-gray-600" style={{ marginBottom: '1.5rem' }}>
                הפוסט שחיפשת לא קיים או הוסר
              </p>
              <Button asChild>
                <Link to="/blogs">חזור לבלוג</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" dir="rtl">
      <SEO
        title={blogPost?.title || "מאמר - איריס שני יועצת משאבי אנוש"}
        description={blogPost?.summary || blogPost?.subtitle || "מאמר מקצועי על זכויות עובדים וייעוץ שכר מאת איריס שני יועצת משאבי אנוש"}
        keywords={`${blogPost?.tags?.join(', ') || ''}, משאבי אנוש, זכויות עובדים, ייעוץ שכר, איריס שני`}
        url={`/blogs/${id}`}
        image={blogPost?.thumbnail_url || "/iris-og.png"}
        type="article"
        author="איריס שני"
        publishedTime={blogPost?.created_at}
        modifiedTime={blogPost?.updated_at}
        section="משאבי אנוש"
        tags={blogPost?.tags || []}
        breadcrumbs={[
          { name: 'דף הבית', url: '/' },
          { name: 'בלוג', url: '/blogs' },
          { name: blogPost?.title || 'מאמר', url: `/blogs/${id}` },
        ]}
      />
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-60 z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
        <div className="relative z-10">
        <Navbar />

        {/* Hero Section with Blog Title and Thumbnail */}
        <section className="relative bg-gradient-to-br from-orange-50 to-orange-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
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
          <div className="max-w-7xl mx-auto relative z-10" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Link to="/blogs" className="hover:text-orange-500 transition-colors">בלוג</Link>
                  <span>/</span>
                  <span>פוסט</span>
                </div>

                {/* Featured Badge */}
                {blogPost.featured && (
                  <Badge className="bg-orange-500 text-white">
                    מומלץ
                  </Badge>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl text-gray-900 leading-tight animate-fade-in-up" style={{ fontWeight: 500 }}>
                  {blogPost.title}
                </h1>

                {/* Subtitle */}
                {blogPost.subtitle && (
                  <h2 className="text-xl md:text-2xl text-gray-700 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {blogPost.subtitle}
                  </h2>
                )}

                {/* Meta Information */}
                <div className="flex items-center gap-4 text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(blogPost.created_at)}</span>
                  </div>
                </div>

                {/* Tags */}
                {blogPost.tags && blogPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    {blogPost.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-sm cursor-pointer hover:bg-orange-100 hover:border-orange-300 transition-colors duration-200" 
                        style={{ paddingTop: '0.25rem', paddingBottom: '0.25rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail */}
              {blogPost.thumbnail_url && (
                <div className="order-first lg:order-last animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
                  <img
                    src={blogPost.thumbnail_url}
                    alt={blogPost.title ? `תמונה ראשית עבור הפוסט: ${blogPost.title}` : 'תמונה ראשית של פוסט בבלוג'}
                    className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <main className="max-w-4xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '4rem', paddingBottom: '4rem' }}>
          <article className="bg-white rounded-2xl shadow-lg" style={{ padding: '3rem' }}>
            {/* Content */}
            <div 
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              style={{ lineHeight: '1.8' }}
              dir="rtl"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Back to Blog */}
            <div className="border-t" style={{ paddingTop: '2rem', marginTop: '3rem' }}>
              <Button variant="outline" asChild>
                <Link to="/blogs" className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  חזור לבלוג
                </Link>
              </Button>
            </div>
          </article>

          {/* Call to Action */}
          <div className="text-center bg-white rounded-2xl shadow-lg" style={{ marginTop: '4rem', padding: '2rem' }}>
            <h2 className="text-2xl font-bold text-gray-900" style={{ marginBottom: '1rem' }}>
              רוצים ייעוץ אישי?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" style={{ marginBottom: '1.5rem' }}>
              הפוסט נותן מידע כללי, אבל המצב שלכם ייחודי. 
              בואו נדבר על הנושא הספציפי שלכם
            </p>
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '1rem', paddingBottom: '1rem' }}
              asChild
            >
              <a href="https://wa.me/972508836955" target="_blank" rel="noopener noreferrer">
                צרו קשר לייעוץ אישי
              </a>
            </Button>
          </div>
        </main>


        {/* Footer */}
        <footer className="bg-gray-900 text-white" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="max-w-7xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginBottom: '2rem' }}>
              <div className="text-center md:text-right">
                <h3 className="text-lg" style={{ marginBottom: '1rem' }}>צור קשר</h3>
                <p className="text-gray-300">טלפון: 0508836955</p>
                <p className="text-gray-300">מייל: info@iris-hr.work</p>
                <p className="text-gray-300">מיקום: גבעת ברנר</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg" style={{ marginBottom: '1rem' }}>קישורים</h3>
                <div className="space-y-2">
                  <p><Link to="/#employee-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים לעובדים</Link></p>
                  <p><Link to="/#employer-services" className="text-gray-300 hover:text-orange-500 transition-colors">שירותים למעסיקים</Link></p>
                  <p><Link to="/#about" className="text-gray-300 hover:text-orange-500 transition-colors">אודותיי</Link></p>
                  <p><Link to="/blogs" className="text-gray-300 hover:text-orange-500 transition-colors">בלוג</Link></p>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg" style={{ marginBottom: '1rem' }}>מידע משפטי</h3>
                <div className="space-y-2">
                  <p className="text-gray-300">מדיניות פרטיות</p>
                  <p className="text-gray-300">תנאי שימוש</p>
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

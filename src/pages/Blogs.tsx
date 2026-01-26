import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Calendar,
  ArrowRight,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { blogService } from "../services/blogService";
import { BlogPost } from "../lib/supabase";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import CookieBanner from "../components/CookieBanner";
// @ts-ignore
import backgroundImage from "../assets/background.png";
// @ts-ignore
import artboardImage from "../../Artboard 1.png";

export default function Blogs() {
  const [searchParams] = useSearchParams();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 6;

  useEffect(() => {
    loadBlogPosts();
  }, []);

  // Set initial search from URL parameter
  useEffect(() => {
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  const loadBlogPosts = async () => {
    try {
      const posts = await blogService.getBlogPosts();
      setBlogPosts(posts);
      setFilteredPosts(posts);
    } catch (error) {
      console.error("Error loading blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter posts based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(blogPosts);
    } else {
      const filtered = blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setFilteredPosts(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  }, [searchQuery, blogPosts]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of posts section
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setCurrentPage(1);
    // Scroll to top of posts section
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
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
          <Navbar activeSection="blogs" />

          {/* Loading State */}
          <div
            className="flex items-center justify-center"
            style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="text-center">
              <Loader2
                className="h-8 w-8 animate-spin mx-auto text-orange-500"
                style={{ marginBottom: "1rem" }}
                aria-hidden="true"
              />
              <p className="text-gray-600">טוען פוסטים...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" dir="rtl">
      <SEO
        title="בלוג - איריס שני יועצת משאבי אנוש"
        description="מאמרים מקצועיים על זכויות עובדים, ייעוץ שכר, ניכויים והפרשות, פיצויי פיטורים ועוד. מידע עדכני ומקצועי מעולם משאבי האנוש."
        keywords="בלוג משאבי אנוש, זכויות עובדים, ייעוץ שכר, פיצויי פיטורים, ניכויים והפרשות, חוקי עבודה, תלוש משכורת, איריס שני"
        url="/blogs"
        image="/iris-og.png"
      />
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-60 z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="relative z-10">
        <Navbar activeSection="blogs" />

        {/* Hero Section */}
        <section
          className="relative bg-gradient-to-br from-orange-50 to-orange-100"
          style={{ paddingTop: "10rem", paddingBottom: "8rem" }}
        >
          {/* Artboard Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: `url(${artboardImage})`,
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)",
            }}
          ></div>
          {/* White Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-white/20 z-5"></div>
          <div
            className="max-w-7xl mx-auto relative z-10"
            style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
          >
            <div className="text-center">
              <h1
                className="text-4xl md:text-5xl text-gray-900 leading-tight animate-fade-in-up"
                style={{ fontWeight: 500, marginBottom: "1.5rem" }}
              >
                פוסטי בלוג
              </h1>
              <p
                className="text-xl text-gray-700 max-w-2xl mx-auto animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                טיפים, עדכונים וכל מה שצריך לדעת על זכויות עובדים ויחסי עבודה
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main
          className="max-w-7xl mx-auto"
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "4rem",
            paddingBottom: "4rem",
          }}
        >
          {/* Search Bar */}
          <div className="max-w-md mx-auto" style={{ marginBottom: "3rem" }}>
            <div className="relative">
              <div
                className="absolute inset-y-0 top-[50%] translate-y-[-50%] right-0 flex items-center"
                style={{ paddingRight: "0.75rem" }}
              >
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="חפש בבלוג..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-right bg-white border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                style={{ paddingRight: "2.5rem", paddingLeft: "1rem" }}
              />
            </div>
          </div>

          {/* Results Summary */}
          {!loading && (
            <div
              className="text-center text-white"
              style={{ marginBottom: "2rem" }}
            >
              {searchQuery ? (
                <div>
                  <p>
                    נמצאו {filteredPosts.length} תוצאות עבור "{searchQuery}"
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-orange-500 hover:text-orange-600 underline text-sm mt-1"
                  >
                    נקה חיפוש
                  </button>
                </div>
              ) : (
                <p>סה"כ {blogPosts.length} פוסטים בבלוג</p>
              )}
            </div>
          )}

          {filteredPosts.length === 0 && !loading ? (
            /* Empty State */
            <div
              className="text-center"
              style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
            >
              <div
                className="bg-white rounded-2xl shadow-lg max-w-md mx-auto"
                style={{ padding: "3rem" }}
              >
                <div className="text-gray-400" style={{ marginBottom: "1rem" }}>
                  <Calendar className="h-16 w-16 mx-auto opacity-50" />
                </div>
                <h3
                  className="text-xl font-medium text-gray-900"
                  style={{ marginBottom: "0.5rem" }}
                >
                  {searchQuery ? "לא נמצאו תוצאות" : "אין פוסטים עדיין"}
                </h3>
                <p className="text-gray-600">
                  {searchQuery
                    ? "נסה לחפש במילים אחרות"
                    : "הפוסטים הראשונים יפורסמו בקרוב"}
                </p>
              </div>
            </div>
          ) : (
            /* Blog Posts Grid */
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white border-0 shadow-lg group h-full"
                  >
                    {/* Thumbnail */}
                    {post.thumbnail_url && (
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={post.thumbnail_url}
                          alt={
                            post.title
                              ? `תמונת ממוזערת עבור הפוסט: ${post.title}`
                              : "תמונת ממוזערת של פוסט בבלוג"
                          }
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Featured Badge */}
                        {post.featured && (
                          <div
                            className="absolute"
                            style={{ top: "0.75rem", right: "0.75rem" }}
                          >
                            <Badge className="bg-orange-500 text-white">
                              מומלץ
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}

                    <CardContent
                      className="space-y-4 flex flex-col justify-between h-full"
                      style={{ padding: "1.5rem" }}
                    >
                      <div>
                        {/* Date */}
                        <div className="flex items-center gap-2 text-sm text-orange-500">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.created_at)}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors duration-300">
                          {post.title}
                        </h3>

                        {/* Subtitle */}
                        {post.subtitle && (
                          <p className="text-gray-600 font-medium">
                            {truncateText(post.subtitle, 100)}
                          </p>
                        )}

                        {/* Summary */}
                        {post.summary && (
                          <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                            {truncateText(post.summary, 150)}
                          </p>
                        )}
                      </div>
                      <div>
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div
                            className="flex flex-wrap gap-2 border-t"
                            style={{ paddingTop: "1rem" }}
                          >
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs cursor-pointer hover:bg-orange-100 hover:border-orange-300 transition-colors duration-200"
                                style={{
                                  paddingTop: "0.25rem",
                                  paddingBottom: "0.25rem",
                                  paddingLeft: "0.5rem",
                                  paddingRight: "0.5rem",
                                }}
                                onClick={() => handleTagClick(tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge
                                variant="outline"
                                className="text-xs text-gray-500"
                              >
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Read More Button */}
                        <div className="mt-auto" style={{ paddingTop: "1rem" }}>
                          <Button
                            variant="outline"
                            className="w-full group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300"
                            asChild
                          >
                            <Link to={`/blogs/${post.id}`}>קרא עוד</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div
                  className="flex justify-center items-center space-x-reverse gap-2"
                  style={{ marginTop: "3rem" }}
                >
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                    הקודם
                  </Button>

                  <div className="flex items-center space-x-reverse gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={
                            currentPage === page
                              ? "bg-orange-500 hover:bg-orange-600 text-white"
                              : ""
                          }
                          style={{ minWidth: "2.5rem" }}
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2"
                  >
                    הבא
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Page Info */}
              {totalPages > 1 && (
                <div
                  className="text-center text-sm text-gray-500"
                  style={{ marginTop: "1rem" }}
                >
                  מציג {startIndex + 1}-
                  {Math.min(endIndex, filteredPosts.length)} מתוך{" "}
                  {filteredPosts.length} פוסטים
                </div>
              )}
            </div>
          )}

          {/* Call to Action */}
          {filteredPosts.length > 0 && (
            <div
              className="text-center bg-white rounded-2xl shadow-lg"
              style={{ marginTop: "4rem", padding: "2rem" }}
            >
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ marginBottom: "1rem" }}
              >
                רוצים ליווי אישי?
              </h2>
              <p
                className="text-gray-600 max-w-2xl mx-auto"
                style={{ marginBottom: "1.5rem" }}
              >
                הפוסטים נותנים מידע כללי, אבל כל מקרה הוא ייחודי. בואו נדבר על
                המצב הספציפי שלכם
              </p>
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                style={{
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                }}
                asChild
              >
                <a
                  href="https://wa.me/972508836955"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  צרו קשר לייעוץ אישי
                </a>
              </Button>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer
          className="bg-gray-900 text-white"
          style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
        >
          <div
            className="max-w-7xl mx-auto"
            style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              style={{ marginBottom: "2rem" }}
            >
              <div className="text-center md:text-right">
                <h3 className="text-lg" style={{ marginBottom: "1rem" }}>
                  צור קשר
                </h3>
                <p className="text-gray-300">טלפון: 0508836955</p>
                <p className="text-gray-300">מייל: info@iris-hr.work</p>
                <p className="text-gray-300">מיקום: גבעת ברנר</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg" style={{ marginBottom: "1rem" }}>
                  קישורים
                </h3>
                <div className="space-y-2">
                  <p>
                    <Link
                      to="/#employee-services"
                      className="text-gray-300 hover:text-orange-500 transition-colors"
                    >
                      שירותים לעובדים
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/#employer-services"
                      className="text-gray-300 hover:text-orange-500 transition-colors"
                    >
                      שירותים למעסיקים
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/#about"
                      className="text-gray-300 hover:text-orange-500 transition-colors"
                    >
                      אודותיי
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/blogs"
                      className="text-gray-300 hover:text-orange-500 transition-colors"
                    >
                      בלוג
                    </Link>
                  </p>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg" style={{ marginBottom: "1rem" }}>
                  מידע משפטי
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-300">מדיניות פרטיות</p>
                  <p className="text-gray-300">תנאי שימוש</p>
                </div>
              </div>
            </div>
            <div
              className="border-t border-gray-700 text-center"
              style={{ paddingTop: "2rem" }}
            >
              <p className="text-gray-400">
                © {new Date().getFullYear()} איריס שני - ייעוץ משאבי אנוש. כל
                הזכויות שמורות.
              </p>
            </div>
          </div>
        </footer>
      </div>
      <CookieBanner />
    </div>
  );
}

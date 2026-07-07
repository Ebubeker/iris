import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Plus, X, Save, List, Edit, Trash2, Eye, LogOut, Loader2, Star, Search, Tag, Quote, Check, Inbox, Phone, Mail } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';
import { useAuth } from '../contexts/AuthContext';
import { blogService } from '../services/blogService';
import { testimonialService } from '../services/testimonialService';
import { leadService } from '../services/leadService';
import { BlogPost, Testimonial, Lead } from '../lib/supabase';
import LoginForm from '../components/LoginForm';
import ImageUpload from '../components/ImageUpload';
import SEO from '../components/SEO';
import CookieBanner from '../components/CookieBanner';
import { useNavigate } from 'react-router-dom';


export default function Admin() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<'list' | 'create' | 'testimonials' | 'leads'>('list');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', content: '' });
  const [savingTestimonial, setSavingTestimonial] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [thumbnailPath, setThumbnailPath] = useState('');
  const [featured, setFeatured] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [saving, setSaving] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
  }>({});

  // Get all unique tags from all posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [blogPosts]);

  // Filter function
  const filterPosts = (posts: BlogPost[]) => {
    return posts.filter(post => {
      // Search filter
      const matchesSearch = 
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Tag filter
      const matchesTag = 
        !selectedTag ||
        post.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  };

  // Separate featured and non-featured posts with filters applied
  const featuredPosts = useMemo(() => {
    const featured = blogPosts.filter(post => post.featured);
    return filterPosts(featured);
  }, [blogPosts, searchQuery, selectedTag]);

  const nonFeaturedPosts = useMemo(() => {
    const nonFeatured = blogPosts.filter(post => !post.featured);
    return filterPosts(nonFeatured);
  }, [blogPosts, searchQuery, selectedTag]);

  // Load blog posts on component mount
  useEffect(() => {
    if (user) {
      loadBlogPosts();
      loadTestimonials();
      loadLeads();
    }
  }, [user]);

  const loadLeads = async () => {
    setLoadingLeads(true);
    try {
      const items = await leadService.getLeads();
      setLeads(items);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoadingLeads(false);
    }
  };

  const updateLeadStatus = async (lead: Lead, status: Lead['status']) => {
    try {
      const updated = await leadService.setStatus(lead.id, status);
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? updated : l)));
    } catch (error) {
      console.error('Error updating lead status:', error);
      alert('שגיאה בעדכון סטטוס הפנייה');
    }
  };

  const removeLead = async (id: string) => {
    if (confirm('האם למחוק את הפנייה?')) {
      try {
        await leadService.deleteLead(id);
        setLeads((prev) => prev.filter((l) => l.id !== id));
      } catch (error) {
        console.error('Error deleting lead:', error);
        alert('שגיאה במחיקת הפנייה');
      }
    }
  };

  const loadTestimonials = async () => {
    setLoadingTestimonials(true);
    try {
      const items = await testimonialService.getAllTestimonials();
      setTestimonials(items);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoadingTestimonials(false);
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name.trim() || !newTestimonial.content.trim()) {
      alert('שם ותוכן ההמלצה הם שדות חובה');
      return;
    }
    setSavingTestimonial(true);
    try {
      const created = await testimonialService.createTestimonial({
        name: newTestimonial.name.trim(),
        role: newTestimonial.role.trim() || undefined,
        content: newTestimonial.content.trim(),
      });
      setTestimonials([created, ...testimonials]);
      setNewTestimonial({ name: '', role: '', content: '' });
      alert('ההמלצה נוספה ופורסמה באתר!');
    } catch (error) {
      console.error('Error adding testimonial:', error);
      alert('שגיאה בהוספת ההמלצה');
    } finally {
      setSavingTestimonial(false);
    }
  };

  const toggleTestimonialApproved = async (testimonial: Testimonial) => {
    try {
      const updated = await testimonialService.setApproved(testimonial.id, !testimonial.approved);
      setTestimonials(testimonials.map(t => t.id === testimonial.id ? updated : t));
    } catch (error) {
      console.error('Error updating testimonial:', error);
      alert('שגיאה בעדכון ההמלצה');
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את ההמלצה?')) {
      try {
        await testimonialService.deleteTestimonial(id);
        setTestimonials(testimonials.filter(t => t.id !== id));
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('שגיאה במחיקת ההמלצה');
      }
    }
  };

  const loadBlogPosts = async () => {
    setLoadingPosts(true);
    try {
      const posts = await blogService.getBlogPosts();
      setBlogPosts(posts);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      alert('שגיאה בטעינת הבלוג פוסטים');
    } finally {
      setLoadingPosts(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Helper function to check if HTML content is empty
  const isContentEmpty = (html: string): boolean => {
    if (!html || !html.trim()) return true;
    // Remove HTML tags and check if there's actual text content
    const textContent = html.replace(/<[^>]*>/g, '').trim();
    // Also check for common empty HTML patterns
    return textContent === '' || 
           html === '<p></p>' || 
           html === '<p><br></p>' ||
           html === '<p><br/></p>';
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: { title?: string; content?: string } = {};
    
    // Validate title
    if (!title || !title.trim()) {
      newErrors.title = 'כותרת היא שדה חובה';
    }
    
    // Validate content
    if (isContentEmpty(content)) {
      newErrors.content = 'תוכן הבלוג פוסט הוא שדה חובה';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('אינך מחובר למערכת');
      return;
    }

    // Validate form before submitting
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('[data-error-field]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setSaving(true);
    
    try {
      const blogPostData = {
        title,
        subtitle,
        summary,
        content,
        thumbnail_url: thumbnailUrl,
        thumbnail_path: thumbnailPath,
        featured,
        tags,
        author_id: user.id
      };

      if (editingPostId) {
        // Update existing post
        const updatedPost = await blogService.updateBlogPost(editingPostId, blogPostData);
        setBlogPosts(blogPosts.map(post => post.id === editingPostId ? updatedPost : post));
        alert('בלוג פוסט עודכן בהצלחה!');
        setEditingPostId(null);
      } else {
        // Create new post
      const newPost = await blogService.createBlogPost(blogPostData);
      setBlogPosts([newPost, ...blogPosts]);
        alert('בלוג פוסט נוצר בהצלחה!');
      }
      
      // Reset form and switch to list view
      resetForm();
      setCurrentPage('list');
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('שגיאה בשמירת הבלוג פוסט');
    } finally {
      setSaving(false);
    }
  };

  const deleteBlogPost = async (id: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את הבלוג פוסט?')) {
      try {
        await blogService.deleteBlogPost(id);
        setBlogPosts(blogPosts.filter(post => post.id !== id));
        alert('בלוג פוסט נמחק בהצלחה!');
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('שגיאה במחיקת הבלוג פוסט');
      }
    }
  };

  const resetForm = () => {
    setEditingPostId(null);
    setTitle('');
    setSubtitle('');
    setSummary('');
    setContent('');
    setThumbnailUrl('');
    setThumbnailPath('');
    setFeatured(false);
    setTags([]);
    setErrors({});
  };

  const startNewPost = () => {
    resetForm();
    setCurrentPage('create');
  };

  const editBlogPost = (post: BlogPost) => {
    setEditingPostId(post.id);
    setTitle(post.title ?? '');
    setSubtitle(post.subtitle ?? '');
    setSummary(post.summary ?? '');
    setContent(post.content ?? '');
    setThumbnailUrl(post.thumbnail_url ?? '');
    setThumbnailPath(post.thumbnail_path ?? '');
    setFeatured(post.featured ?? false);
    setTags(post.tags ?? []);
    setErrors({});
    setCurrentPage('create');
  };

  const viewBlogPost = (id: string) => {
    navigate(`/blogs/${id}`);
  };

  const toggleFeatured = async (post: BlogPost) => {
    try {
      const newFeaturedStatus = !post.featured;
      
      // Check if trying to feature a post
      if (newFeaturedStatus) {
        const featuredCount = blogPosts.filter(p => p.featured && p.id !== post.id).length;
        if (featuredCount >= 3) {
          alert('ניתן להציג עד 3 פוסטים מומלצים בלבד. בטל את המלצת פוסט אחר כדי להוסיף חדש.');
          return;
        }
      }

      // Update the post
      const updatedPost = await blogService.updateBlogPost(post.id, {
        ...post,
        featured: newFeaturedStatus
      });

      // Update local state
      setBlogPosts(blogPosts.map(p => p.id === post.id ? updatedPost : p));
      
    } catch (error) {
      console.error('Error updating featured status:', error);
      alert('שגיאה בעדכון הסטטוס מומלץ');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <>
        <SEO
          title="ניהול בלוג - איריס שני יועצת משאבי אנוש"
          description="ניהול תוכן הבלוג - יצירה ועריכה של מאמרים מקצועיים על משאבי אנוש"
          url="/admin"
          noindex={true}
        />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
            <p className="text-gray-600">טוען...</p>
          </div>
        </div>
      </>
    );
  }

  // Show login form if not authenticated
  if (!user) {
    return (
      <>
        <SEO
          title="התחברות - ניהול איריס שני"
          description="התחברות למערכת הניהול"
          url="/admin"
          noindex={true}
        />
        <LoginForm />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <SEO 
        title="ניהול בלוג - איריס שני יועצת משאבי אנוש"
        description="ניהול תוכן הבלוג - יצירה ועריכה של מאמרים מקצועיים על משאבי אנוש"
        keywords="ניהול בלוג, משאבי אנוש, איריס שני, ניהול תוכן"
        url="/admin"
        noindex={true}
      />
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentPage === 'list' ? 'ניהול בלוג פוסטים' : currentPage === 'create' ? 'יצירת בלוג פוסט' : currentPage === 'testimonials' ? 'ניהול המלצות' : 'פניות מהאתר'}
            </h1>
            <div className="flex items-center gap-6">
              <nav className="flex items-center space-x-reverse gap-2">
                <button
                  onClick={() => setCurrentPage('leads')}
                  className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    currentPage === 'leads'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                >
                  <Inbox className="h-4 w-4 ml-2" />
                  פניות
                  {leads.filter((l) => l.status === 'new').length > 0 && (
                    <Badge className="bg-orange-500 text-white text-xs mr-2">
                      {leads.filter((l) => l.status === 'new').length}
                    </Badge>
                  )}
                </button>
                <button
                  onClick={() => setCurrentPage('list')}
                  className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    currentPage === 'list'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                >
                  <List className="h-4 w-4 ml-2" />
                  רשימת פוסטים
                </button>
                <button
                  onClick={() => setCurrentPage('create')}
                  className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    currentPage === 'create'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                >
                  <Plus className="h-4 w-4 ml-2" />
                  פוסט חדש
                </button>
                <button
                  onClick={() => setCurrentPage('testimonials')}
                  className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    currentPage === 'testimonials'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                >
                  <Quote className="h-4 w-4 ml-2" />
                  המלצות
                  {testimonials.filter(t => !t.approved).length > 0 && (
                    <Badge className="bg-orange-500 text-white text-xs mr-2">
                      {testimonials.filter(t => !t.approved).length}
                    </Badge>
                  )}
                </button>
              </nav>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                  איריס שני - ניהול תוכן
                </div>
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className="text-gray-600 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4 ml-2" />
                  התנתק
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'list' ? (
          /* Blog Posts List */
          <div className="space-y-8">
            {/* Header with Create Button */}
            <div className="flex justify-between items-center" style={{marginTop: '20px'}}>
              <h2 className="text-xl font-semibold text-gray-900">
                ניהול בלוג פוסטים ({blogPosts.length})
              </h2>
              <Button 
                onClick={startNewPost}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Plus className="h-4 w-4 ml-2" />
                פוסט חדש
              </Button>
            </div>

            {/* Search and Filter Section */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="חפש בפוסטים (כותרת, תת-כותרת, תוכן)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10 bg-gray-50 border-gray-300 focus:bg-white"
                      style={{ direction: 'rtl' }}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Tag Filters */}
                  {allTags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag className="h-4 w-4 text-gray-500 ml-2" />
                      <span className="text-sm text-gray-600 font-medium">סינון לפי תגיות:</span>
                      <Button
                        variant={selectedTag === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTag(null)}
                        className={
                          selectedTag === null
                            ? "bg-orange-500 hover:bg-orange-600 text-white"
                            : "hover:bg-gray-50"
                        }
                      >
                        הכל
                      </Button>
                      {allTags.map((tag) => (
                        <Button
                          key={tag}
                          variant={selectedTag === tag ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                          className={
                            selectedTag === tag
                              ? "bg-orange-500 hover:bg-orange-600 text-white"
                              : "hover:bg-gray-50"
                          }
                        >
                          {tag}
                        </Button>
                      ))}
                      {selectedTag && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTag(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3 ml-1" />
                          נקה סינון
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Loading State */}
              {loadingPosts ? (
                <Card className="bg-white shadow-md">
                  <CardContent className="p-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
                    <p className="text-gray-600">טוען בלוג פוסטים...</p>
                  </CardContent>
                </Card>
              ) : (
              <>
                {/* Featured Posts Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b pb-2">
                    <Star className="h-5 w-5 text-orange-500 fill-orange-500" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      פוסטים מומלצים ({featuredPosts.length}/3)
                    </h3>
                  </div>

                  <div className="grid gap-6">
                    {featuredPosts.length > 0 ? (
                      featuredPosts.map((post) => (
                <Card key={post.id} className="bg-white shadow-md">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      {post.thumbnail_url && (
                        <div className="flex-shrink-0">
                          <img
                            src={post.thumbnail_url}
                            alt={post.title ? `תמונת ממוזערת עבור: ${post.title}` : 'תמונת ממוזערת של פוסט'}
                            className="w-24 h-16 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {post.title}
                              </h3>
                              {post.featured && (
                                <Badge className="bg-orange-500 text-white text-xs">
                                  מומלץ
                                </Badge>
                              )}
                            </div>
                            
                            {post.subtitle && (
                              <p className="text-gray-600 mb-2">{post.subtitle}</p>
                            )}
                            
                            {post.summary && (
                              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                                {post.summary}
                              </p>
                            )}
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.tags.map((tag, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline" 
                                  className={`text-xs px-3 cursor-pointer transition-colors ${
                                    selectedTag === tag 
                                      ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600' 
                                      : 'hover:bg-orange-50 hover:border-orange-300'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTag(selectedTag === tag ? null : tag);
                                  }}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <p className="text-sm text-gray-500">
                              נוצר ב: {formatDate(post.created_at)}
                            </p>
                            
                            {/* Featured Toggle */}
                            <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{paddingTop: '10px'}}>
                              <Label htmlFor={`featured-${post.id}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                                פוסט מומלץ
                              </Label>
                              <Switch
                                id={`featured-${post.id}`}
                                checked={post.featured}
                                onCheckedChange={() => toggleFeatured(post)}
                              />
                            </div>
                          </div>
                      
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => viewBlogPost(post.id)}
                              title="צפה בפוסט"
                              className="hover:bg-blue-50 cursor-pointer"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => editBlogPost(post)}
                              title="ערוך פוסט"
                              className="hover:bg-orange-50 cursor-pointer"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => deleteBlogPost(post.id)}
                              title="מחק פוסט"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                ))
                    ) : (
                      <Card className="bg-orange-50 border-orange-200">
                        <CardContent className="p-8 text-center">
                          <Star className="h-10 w-10 mx-auto mb-3 text-orange-400" />
                          <p className="text-gray-600 text-sm">
                            {(searchQuery || selectedTag) 
                              ? 'לא נמצאו פוסטים מומלצים התואמים לחיפוש שלך.' 
                              : 'אין פוסטים מומלצים כרגע. השתמש במתג למטה בכל פוסט כדי להציג אותו כמומלץ.'}
                          </p>
                          {(searchQuery || selectedTag) && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSearchQuery('');
                                setSelectedTag(null);
                              }}
                              className="mt-3"
                            >
                              <X className="h-3 w-3 ml-1" />
                              נקה סינון
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                {/* Other Posts Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b pb-2">
                    <List className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      כל הפוסטים ({nonFeaturedPosts.length})
                    </h3>
                  </div>

                  <div className="grid gap-6">
                    {nonFeaturedPosts.length > 0 ? (
                      nonFeaturedPosts.map((post) => (
                <Card key={post.id} className="bg-white shadow-md">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      {post.thumbnail_url && (
                        <div className="flex-shrink-0">
                          <img
                            src={post.thumbnail_url}
                            alt={post.title ? `תמונת ממוזערת עבור: ${post.title}` : 'תמונת ממוזערת של פוסט'}
                            className="w-24 h-16 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {post.title}
                              </h3>
                            </div>
                            
                            {post.subtitle && (
                              <p className="text-gray-600 mb-2">{post.subtitle}</p>
                            )}
                            
                            {post.summary && (
                              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                                {post.summary}
                              </p>
                            )}
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.tags.map((tag, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline" 
                                  className={`text-xs px-3 cursor-pointer transition-colors ${
                                    selectedTag === tag 
                                      ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600' 
                                      : 'hover:bg-orange-50 hover:border-orange-300'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTag(selectedTag === tag ? null : tag);
                                  }}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <p className="text-sm text-gray-500">
                              נוצר ב: {formatDate(post.created_at)}
                            </p>
                            
                            {/* Featured Toggle */}
                            <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{paddingTop: '10px'}}>
                              <Label htmlFor={`featured-${post.id}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                                פוסט מומלץ
                              </Label>
                              <Switch
                                id={`featured-${post.id}`}
                                checked={post.featured}
                                onCheckedChange={() => toggleFeatured(post)}
                              />
                            </div>
                          </div>
                      
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => viewBlogPost(post.id)}
                              title="צפה בפוסט"
                              className="hover:bg-blue-50 cursor-pointer"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => editBlogPost(post)}
                              title="ערוך פוסט"
                              className="hover:bg-orange-50 cursor-pointer"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                      <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => deleteBlogPost(post.id)}
                              title="מחק פוסט"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                      </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                      ))
                    ) : (
                      <Card className="bg-gray-50 border-gray-200">
                        <CardContent className="p-8 text-center">
                          <List className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                          <p className="text-gray-600 text-sm">
                            {blogPosts.length === 0 
                              ? 'אין בלוג פוסטים עדיין. התחל ליצור את הפוסט הראשון שלך!' 
                              : (searchQuery || selectedTag)
                                ? 'לא נמצאו פוסטים התואמים לחיפוש שלך.'
                                : 'כל הפוסטים שלך מוגדרים כמומלצים.'}
                          </p>
                          {blogPosts.length === 0 ? (
                      <Button 
                              onClick={startNewPost}
                              className="bg-orange-500 hover:bg-orange-600 text-white mt-4"
                      >
                        <Plus className="h-4 w-4 ml-2" />
                        צור פוסט חדש
                      </Button>
                          ) : (searchQuery || selectedTag) ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSearchQuery('');
                                setSelectedTag(null);
                              }}
                              className="mt-3"
                            >
                              <X className="h-3 w-3 ml-1" />
                              נקה סינון
                            </Button>
                          ) : null}
                  </CardContent>
                </Card>
              )}
            </div>
                </div>
              </>
            )}
          </div>
        ) : currentPage === 'create' ? (
          /* Create/Edit Blog Post */
          <div className="space-y-8 mb-8">
            <Card className="bg-white shadow-md" style={{marginTop: '40px'}}>
              <CardHeader>
                <CardTitle className="text-xl">
                  {editingPostId ? 'עריכת בלוג פוסט' : 'פרטי הבלוג פוסט'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2" data-error-field={errors.title ? 'true' : undefined}>
                    <Label htmlFor="title" className="text-base font-medium">
                      כותרת ראשית *
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (errors.title) {
                          setErrors({ ...errors, title: undefined });
                        }
                      }}
                      placeholder="הכנס כותרת לבלוג פוסט"
                      className={`text-right ${errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      required
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <span className="text-red-500">⚠</span>
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Subtitle */}
                  <div className="space-y-2">
                    <Label htmlFor="subtitle" className="text-base font-medium">
                      כותרת משנה
                    </Label>
                    <Input
                      id="subtitle"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="הכנס כותרת משנה (אופציונלי)"
                      className="text-right"
                    />
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <Label htmlFor="summary" className="text-base font-medium">
                      סיכום
                    </Label>
                    <textarea
                      id="summary"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="הכנס סיכום קצר של הבלוג פוסט (יוצג ברשימת הבלוגים)"
                      className="w-full px-3 py-2 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 min-h-[100px] resize-vertical"
                      rows={4}
                    />
                    <p className="text-sm text-gray-500">
                      הסיכום יוצג ברשימת הבלוגים ויעזור לקוראים להבין על מה הבלוג פוסט
                    </p>
                  </div>

                  {/* Thumbnail */}
                  <ImageUpload
                    label="תמונת ממוזערת"
                    value={thumbnailUrl}
                    onChange={(url, path) => {
                      setThumbnailUrl(url);
                      setThumbnailPath(path || '');
                    }}
                    placeholder="הכנס URL של תמונת הממוזערת או העלה מהמחשב"
                    description="תמונת הממוזערת תוצג ברשימת הבלוגים ובתצוגה המקדימה"
                    showPreview={true}
                    previewClassName="w-32 h-20 object-cover rounded-lg border border-gray-200"
                  />

                  {/* Content */}
                  <div className="space-y-2" data-error-field={errors.content ? 'true' : undefined}>
                    <Label htmlFor="content" className="text-base font-medium">
                      תוכן הבלוג פוסט *
                    </Label>
                    <div className={errors.content ? 'ring-2 ring-red-500 rounded-md' : ''}>
                    <RichTextEditor
                      content={content}
                        onChange={(newContent) => {
                          setContent(newContent);
                          if (errors.content && !isContentEmpty(newContent)) {
                            setErrors({ ...errors, content: undefined });
                          }
                        }}
                      placeholder="הכנס את תוכן הבלוג פוסט כאן..."
                    />
                    </div>
                    {errors.content && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <span className="text-red-500">⚠</span>
                        {errors.content}
                      </p>
                    )}
                    {!errors.content && (
                    <p className="text-sm text-gray-500">
                      השתמש בסרגל הכלים לעיצוב הטקסט, הוספת כותרות, רשימות וקישורים
                    </p>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium">
                      תגיות
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="הוסף תגית חדשה"
                        className="text-right"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Display Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-3 pt-6 border-t">
                    {editingPostId && (
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => {
                          resetForm();
                          setCurrentPage('list');
                        }}
                        disabled={saving}
                      >
                        ביטול
                      </Button>
                    )}
                    <Button 
                      type="submit" 
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                          {editingPostId ? 'מעדכן...' : 'שומר...'}
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 ml-2" />
                          {editingPostId ? 'עדכן פוסט' : 'שמור בלוג פוסט'}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Preview Section
            {(title || subtitle || summary || content || thumbnailUrl) && (
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">תצוגה מקדימה</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {thumbnailUrl && (
                      <div className="w-full">
                        <img
                          src={thumbnailUrl}
                          alt={title ? `תצוגה מקדימה של תמונת הממוזערת עבור: ${title}` : 'תצוגה מקדימה של תמונת הממוזערת'}
                          className="w-full h-48 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    {title && (
                      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    )}
                    {subtitle && (
                      <h3 className="text-lg text-gray-600">{subtitle}</h3>
                    )}
                    {summary && (
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-r-4 border-orange-500">
                        {summary}
                      </p>
                    )}
                    {featured && (
                      <Badge className="bg-orange-500 text-white">מומלץ</Badge>
                    )}
                    {content && (
                      <div 
                        className="prose prose-sm max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    )}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t">
                        {tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )} */}
          </div>
        ) : currentPage === 'testimonials' ? (
          /* Testimonials Management */
          <div className="space-y-8">
            <div className="flex justify-between items-center" style={{ marginTop: '20px' }}>
              <h2 className="text-xl font-semibold text-gray-900">
                ניהול המלצות ({testimonials.length})
              </h2>
            </div>

            {/* Add Testimonial Manually */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">הוספת המלצה ידנית</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddTestimonial} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-testimonial-name" className="text-base font-medium">
                        שם הלקוח *
                      </Label>
                      <Input
                        id="new-testimonial-name"
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                        placeholder="השם שיוצג באתר"
                        className="text-right"
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-testimonial-role" className="text-base font-medium">
                        השירות שניתן (אופציונלי)
                      </Label>
                      <Input
                        id="new-testimonial-role"
                        value={newTestimonial.role}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                        placeholder="לדוגמה: בדיקת תלוש שכר"
                        className="text-right"
                        maxLength={150}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-testimonial-content" className="text-base font-medium">
                      תוכן ההמלצה *
                    </Label>
                    <textarea
                      id="new-testimonial-content"
                      value={newTestimonial.content}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                      placeholder="הדביקי כאן המלצה שקיבלת מלקוח (למשל בוואטסאפ)"
                      className="w-full px-3 py-2 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 min-h-[100px] resize-vertical"
                      rows={4}
                      maxLength={2000}
                      required
                    />
                    <p className="text-sm text-gray-500">
                      המלצה שמתווספת כאן מתפרסמת באתר מיד, ללא צורך באישור נוסף
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                      disabled={savingTestimonial}
                    >
                      {savingTestimonial ? (
                        <>
                          <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                          שומר...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 ml-2" />
                          הוסף המלצה
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {loadingTestimonials ? (
              <Card className="bg-white shadow-md">
                <CardContent className="p-12 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
                  <p className="text-gray-600">טוען המלצות...</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Pending Testimonials */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b pb-2">
                    <Quote className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      ממתינות לאישור ({testimonials.filter(t => !t.approved).length})
                    </h3>
                  </div>
                  <div className="grid gap-4">
                    {testimonials.filter(t => !t.approved).length > 0 ? (
                      testimonials.filter(t => !t.approved).map((testimonial) => (
                        <Card key={testimonial.id} className="bg-orange-50 border-orange-200 shadow-sm">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <p className="text-gray-800 leading-relaxed mb-3" style={{ whiteSpace: 'pre-line' }}>
                                  {testimonial.content}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-semibold">{testimonial.name}</span>
                                  {testimonial.role && <span> · {testimonial.role}</span>}
                                  <span> · התקבלה ב: {formatDate(testimonial.created_at)}</span>
                                </p>
                              </div>
                              <div className="flex gap-2 flex-shrink-0">
                                <Button
                                  size="sm"
                                  onClick={() => toggleTestimonialApproved(testimonial)}
                                  className="bg-orange-500 hover:bg-orange-600 text-white"
                                  title="אשר ופרסם באתר"
                                >
                                  <Check className="h-4 w-4 ml-1" />
                                  אשר ופרסם
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => deleteTestimonial(testimonial.id)}
                                  title="מחק המלצה"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card className="bg-gray-50 border-gray-200">
                        <CardContent className="p-8 text-center">
                          <Quote className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                          <p className="text-gray-600 text-sm">
                            אין המלצות שממתינות לאישור. המלצות שלקוחות ישלחו מהאתר יופיעו כאן.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                {/* Approved Testimonials */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b pb-2">
                    <Check className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      מפורסמות באתר ({testimonials.filter(t => t.approved).length})
                    </h3>
                  </div>
                  <div className="grid gap-4">
                    {testimonials.filter(t => t.approved).length > 0 ? (
                      testimonials.filter(t => t.approved).map((testimonial) => (
                        <Card key={testimonial.id} className="bg-white shadow-sm">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <p className="text-gray-800 leading-relaxed mb-3" style={{ whiteSpace: 'pre-line' }}>
                                  {testimonial.content}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-semibold">{testimonial.name}</span>
                                  {testimonial.role && <span> · {testimonial.role}</span>}
                                  <span> · התקבלה ב: {formatDate(testimonial.created_at)}</span>
                                </p>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ paddingTop: '10px' }}>
                                  <Label htmlFor={`approved-${testimonial.id}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                                    מוצגת באתר
                                  </Label>
                                  <Switch
                                    id={`approved-${testimonial.id}`}
                                    checked={testimonial.approved}
                                    onCheckedChange={() => toggleTestimonialApproved(testimonial)}
                                  />
                                </div>
                              </div>
                              <div className="flex gap-2 flex-shrink-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => deleteTestimonial(testimonial.id)}
                                  title="מחק המלצה"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card className="bg-gray-50 border-gray-200">
                        <CardContent className="p-8 text-center">
                          <Quote className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                          <p className="text-gray-600 text-sm">
                            אין עדיין המלצות מפורסמות. אפשר להוסיף המלצה ידנית למעלה או לאשר המלצות שיתקבלו מהאתר.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Leads Management */
          <div className="space-y-8">
            <div className="flex justify-between items-center" style={{ marginTop: '20px' }}>
              <h2 className="text-xl font-semibold text-gray-900">
                פניות מהאתר ({leads.length})
              </h2>
              <Button onClick={loadLeads} variant="outline" size="sm" disabled={loadingLeads}>
                <Loader2 className={`h-4 w-4 ml-2 ${loadingLeads ? 'animate-spin' : 'hidden'}`} />
                רענן
              </Button>
            </div>

            {loadingLeads ? (
              <Card className="bg-white shadow-md">
                <CardContent className="p-12 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
                  <p className="text-gray-600">טוען פניות...</p>
                </CardContent>
              </Card>
            ) : leads.length === 0 ? (
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-8 text-center">
                  <Inbox className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600 text-sm">
                    אין עדיין פניות. כל פנייה שתישלח מטופס "קבלו הצעת מחיר" באתר תופיע כאן.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {leads.map((lead) => {
                  const statusLabel =
                    lead.status === 'new' ? 'חדשה' : lead.status === 'contacted' ? 'טופלה' : 'סגורה';
                  const statusColor =
                    lead.status === 'new'
                      ? 'bg-orange-500 text-white'
                      : lead.status === 'contacted'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-400 text-white';
                  return (
                    <Card
                      key={lead.id}
                      className={`shadow-sm ${lead.status === 'new' ? 'bg-orange-50 border-orange-200' : 'bg-white'}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start gap-4 flex-wrap">
                          <div className="flex-1 min-w-[240px]">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                              <Badge className={`text-xs ${statusColor}`}>{statusLabel}</Badge>
                              {lead.service && (
                                <Badge variant="outline" className="text-xs">{lead.service}</Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-3">
                              <a href={`tel:${lead.phone || ''}`} className="flex items-center gap-1 hover:text-orange-500" dir="ltr">
                                <Phone className="h-4 w-4" /> {lead.phone || '—'}
                              </a>
                              <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-orange-500" dir="ltr">
                                <Mail className="h-4 w-4" /> {lead.email}
                              </a>
                            </div>
                            {lead.message && (
                              <p className="text-gray-700 text-sm bg-white/70 rounded-md p-3 border border-gray-100 mb-2" style={{ whiteSpace: 'pre-line' }}>
                                {lead.message}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">התקבלה ב: {formatDate(lead.created_at)}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            {lead.status !== 'contacted' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateLeadStatus(lead, 'contacted')}
                                title="סמן כטופלה"
                                className="hover:bg-blue-50"
                              >
                                <Check className="h-4 w-4 ml-1" />
                                טופלה
                              </Button>
                            )}
                            {lead.status !== 'closed' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateLeadStatus(lead, 'closed')}
                                title="סגור פנייה"
                                className="hover:bg-gray-100"
                              >
                                סגור
                              </Button>
                            )}
                            {lead.status !== 'new' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateLeadStatus(lead, 'new')}
                                title="החזר לחדשה"
                                className="hover:bg-orange-50"
                              >
                                חדשה
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeLead(lead.id)}
                              title="מחק פנייה"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
      <CookieBanner />
    </div>
  );
}
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Plus, X, Save, List, Edit, Trash2, Eye, LogOut, Loader2, Star, Search, Tag } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';
import { useAuth } from '../contexts/AuthContext';
import { blogService } from '../services/blogService';
import { BlogPost } from '../lib/supabase';
import LoginForm from '../components/LoginForm';
import ImageUpload from '../components/ImageUpload';
import SEO from '../components/SEO';
import CookieBanner from '../components/CookieBanner';
import { useNavigate } from 'react-router-dom';


export default function Admin() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<'list' | 'create'>('list');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
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
    }
  }, [user]);

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!user) {
    return <LoginForm />;
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
              {currentPage === 'list' ? 'ניהול בלוג פוסטים' : 'יצירת בלוג פוסט'}
            </h1>
            <div className="flex items-center gap-6">
              <nav className="flex items-center space-x-reverse gap-2">
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
        ) : (
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
        )}
      </main>
      <CookieBanner />
    </div>
  );
}
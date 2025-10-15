import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Plus, X, Save, List, Edit, Trash2, Eye } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';

// Mock blog posts data
const mockBlogPosts = [
  {
    id: '1',
    title: 'זכויות עובדים בישראל: מדריך מקיף לשנת 2024',
    subtitle: 'כל מה שצריך לדעת על זכויות עובדים, חופשות, ימי מחלה ותנאי עבודה',
    content: 'תוכן הבלוג פוסט הראשון...',
    featured: true,
    tags: ['זכויות עובדים', 'חוקי עבודה', 'מדריך'],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'איך לבדוק נכונות תלוש השכר שלכם',
    subtitle: 'מדריך מפורט לבדיקת תלוש שכר וזיהוי טעויות נפוצות',
    content: 'תוכן הבלוג פוסט השני...',
    featured: false,
    tags: ['תלוש שכר', 'בדיקות', 'טעויות'],
    createdAt: '2024-01-08T14:30:00Z'
  },
  {
    id: '3',
    title: 'הסכמי עבודה: מה חובה לדעת לפני החתימה',
    subtitle: 'נקודות מפתח שחשוב לבדוק בהסכם העבודה',
    content: 'תוכן הבלוג פוסט השלישי...',
    featured: false,
    tags: ['הסכמי עבודה', 'חוזים', 'הגנה'],
    createdAt: '2024-01-02T09:15:00Z'
  }
];

export default function Admin() {
  const [currentPage, setCurrentPage] = useState<'list' | 'create'>('list');
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [featured, setFeatured] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const blogPost = {
      title,
      subtitle,
      content,
      featured,
      tags,
      createdAt: new Date().toISOString(),
      id: Date.now().toString()
    };

    // Add to blog posts list
    setBlogPosts([blogPost, ...blogPosts]);
    
    // Reset form
    setTitle('');
    setSubtitle('');
    setContent('');
    setFeatured(false);
    setTags([]);
    
    // Switch to list view
    setCurrentPage('list');
    
    alert('בלוג פוסט נוצר בהצלחה!');
  };

  const deleteBlogPost = (id: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את הבלוג פוסט?')) {
      setBlogPosts(blogPosts.filter(post => post.id !== id));
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

  return (
    <div className="min-h-screen bg-white" dir="rtl">
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
              <div className="text-sm text-gray-500">
                איריס שני - ניהול תוכן
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'list' ? (
          /* Blog Posts List */
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                כל הבלוג פוסטים ({blogPosts.length})
              </h2>
              <Button 
                onClick={() => setCurrentPage('create')}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Plus className="h-4 w-4 ml-2" />
                פוסט חדש
              </Button>
            </div>

            <div className="grid gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="bg-white shadow-md">
                  <CardContent className="p-6">
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
                          <p className="text-gray-600 mb-3">{post.subtitle}</p>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <p className="text-sm text-gray-500">
                          נוצר ב: {formatDate(post.createdAt)}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteBlogPost(post.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {blogPosts.length === 0 && (
                <Card className="bg-white shadow-md">
                  <CardContent className="p-12 text-center">
                    <div className="text-gray-500">
                      <List className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">אין בלוג פוסטים עדיין</h3>
                      <p className="mb-4">התחל ליצור את הבלוג פוסט הראשון שלך</p>
                      <Button 
                        onClick={() => setCurrentPage('create')}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        <Plus className="h-4 w-4 ml-2" />
                        צור פוסט חדש
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          /* Create Blog Post */
          <div className="space-y-8">
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">פרטי הבלוג פוסט</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-base font-medium">
                      כותרת ראשית *
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="הכנס כותרת לבלוג פוסט"
                      className="text-right"
                      required
                    />
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

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-base font-medium">
                      תוכן הבלוג פוסט *
                    </Label>
                    <RichTextEditor
                      content={content}
                      onChange={setContent}
                      placeholder="הכנס את תוכן הבלוג פוסט כאן..."
                    />
                    <p className="text-sm text-gray-500">
                      השתמש בסרגל הכלים לעיצוב הטקסט, הוספת כותרות, רשימות וקישורים
                    </p>
                  </div>

                  {/* Featured */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="featured" className="text-base font-medium">
                        פוסט מומלץ
                      </Label>
                      <p className="text-sm text-gray-500">
                        האם להציג את הפוסט כמומלץ בעמוד הבית
                      </p>
                    </div>
                    <Switch
                      id="featured"
                      checked={featured}
                      onCheckedChange={setFeatured}
                    />
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
                  <div className="flex justify-end pt-6 border-t">
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                      <Save className="h-4 w-4 ml-2" />
                      שמור בלוג פוסט
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Preview Section */}
            {(title || subtitle || content) && (
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">תצוגה מקדימה</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {title && (
                      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    )}
                    {subtitle && (
                      <h3 className="text-lg text-gray-600">{subtitle}</h3>
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
            )}
          </div>
        )}
      </main>
    </div>
  );
}
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { ListItem } from '@tiptap/extension-list-item';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Link as LinkIcon,
  Unlink,
  Undo,
  Redo,
  Eye,
  Image as ImageIcon,
  Upload,
  Loader2,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import React, { useState, useRef } from 'react';
import { imageUploadService } from '../services/imageUploadService';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // @ts-ignore
  const backgroundImage = '../assets/background.png';

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-orange-500 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-sm',
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc list-inside',
          dir: 'rtl',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal list-inside',
          dir: 'rtl',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          dir: 'rtl',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none min-h-[600px] p-6 focus:outline-none text-gray-800 leading-relaxed',
        minHeight: '600px',
        dir: 'rtl',
      },
    },
  });

  const addLink = () => {
    if (linkUrl) {
      editor?.chain().focus(undefined, { scrollIntoView: false }).setLink({ href: linkUrl }).run();
      setLinkUrl('');
    }
  };

  const removeLink = () => {
    editor?.chain().focus(undefined, { scrollIntoView: false }).unsetLink().run();
  };

  const addImage = () => {
    if (imageUrl) {
      editor?.chain().focus(undefined, { scrollIntoView: false }).setImage({ src: imageUrl }).run();
      setImageUrl('');
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadError('');
    setUploading(true);

    // Validate file
    const validation = imageUploadService.validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file');
      setUploading(false);
      return;
    }

    try {
      // Upload file
      const result = await imageUploadService.uploadImage(file, 'content-images');
      
      if (result.error) {
        setUploadError(result.error);
      } else {
        editor?.chain().focus(undefined, { scrollIntoView: false }).setImage({ src: result.url }).run();
      }
    } catch (error) {
      setUploadError('Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
      {/* Error Display */}
      {uploadError && (
        <div className="bg-red-50 border-b border-red-200 p-2">
          <Alert variant="destructive" className="py-1">
            <AlertDescription className="text-sm">{uploadError}</AlertDescription>
          </Alert>
        </div>
      )}
      
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4 flex flex-wrap items-center gap-3">
        {/* Text Formatting */}
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).toggleBold().run();
            }}
            className={editor.isActive('bold') ? 'bg-orange-100 text-orange-700' : ''}
            type="button"
            aria-label="מודגש"
            aria-pressed={editor.isActive('bold')}
          >
            <Bold className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).toggleItalic().run();
            }}
            className={editor.isActive('italic') ? 'bg-orange-100 text-orange-700' : ''}
            type="button"
            aria-label="נטוי"
            aria-pressed={editor.isActive('italic')}
          >
            <Italic className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).toggleUnderline().run();
            }}
            className={editor.isActive('underline') ? 'bg-orange-100 text-orange-700' : ''}
            type="button"
            aria-label="קו תחתון"
            aria-pressed={editor.isActive('underline')}
          >
            <UnderlineIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).setParagraph().run();
            }}
            className={editor.isActive('paragraph') ? 'bg-orange-100 text-orange-700' : ''}
            type="button"
            aria-label="פסקה רגילה"
            aria-pressed={editor.isActive('paragraph')}
          >
            P
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).toggleHeading({ level: 1 }).run();
            }}
            className={editor.isActive('heading', { level: 1 }) ? 'bg-orange-100 text-orange-700' : ''}
            type="button"
            aria-label="כותרת ראשית"
            aria-pressed={editor.isActive('heading', { level: 1 })}
          >
            H1
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).toggleHeading({ level: 2 }).run();
            }}
            className={editor.isActive('heading', { level: 2 }) ? 'bg-orange-100 text-orange-700' : ''}
            type="button"
            aria-label="כותרת משנית"
            aria-pressed={editor.isActive('heading', { level: 2 })}
          >
            H2
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).toggleHeading({ level: 3 }).run();
            }}
            className={editor.isActive('heading', { level: 3 }) ? 'bg-orange-100 text-orange-700' : ''}
            type="button"
            aria-label="כותרת משנה"
            aria-pressed={editor.isActive('heading', { level: 3 })}
          >
            H3
          </Button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).toggleBulletList().run();
            }}
            className={editor.isActive('bulletList') ? 'bg-orange-100 text-orange-700' : ''}
            type="button"
            aria-label="רשימת תבליטים"
            aria-pressed={editor.isActive('bulletList')}
          >
            <List className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).toggleOrderedList().run();
            }}
            className={editor.isActive('orderedList') ? 'bg-orange-100 text-orange-700' : ''}
            type="button"
            aria-label="רשימה ממוספרת"
            aria-pressed={editor.isActive('orderedList')}
          >
            <ListOrdered className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).setTextAlign('right').run();
            }}
            className={editor.isActive({ textAlign: 'right' }) ? 'bg-orange-100 text-orange-700' : ''}
            type="button"
            aria-label="יישור לימין"
            aria-pressed={editor.isActive({ textAlign: 'right' })}
          >
            <AlignRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).setTextAlign('center').run();
            }}
            className={editor.isActive({ textAlign: 'center' }) ? 'bg-orange-100 text-orange-700' : ''}
            type="button"
            aria-label="יישור למרכז"
            aria-pressed={editor.isActive({ textAlign: 'center' })}
          >
            <AlignCenter className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).setTextAlign('left').run();
            }}
            className={editor.isActive({ textAlign: 'left' }) ? 'bg-orange-100 text-orange-700' : ''}
            type="button"
            aria-label="יישור לשמאל"
            aria-pressed={editor.isActive({ textAlign: 'left' })}
          >
            <AlignLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <input
            type="url"
            placeholder="הוסף קישור"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
            dir="ltr"
            aria-label="כתובת קישור"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addLink();
            }}
            disabled={!linkUrl}
            type="button"
            aria-label="הוסף קישור"
          >
            <LinkIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              removeLink();
            }}
            disabled={!editor.isActive('link')}
            type="button"
            aria-label="הסר קישור"
          >
            <Unlink className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Images */}
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <input
            type="url"
            placeholder="הוסף תמונה (URL)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
            dir="ltr"
            aria-label="כתובת תמונה"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addImage();
            }}
            disabled={!imageUrl}
            type="button"
            aria-label="הוסף תמונה מכתובת"
          >
            <ImageIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="העלה תמונה מהמחשב"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              fileInputRef.current?.click();
            }}
            disabled={uploading}
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            type="button"
            aria-label="העלה תמונה מהמחשב"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Upload className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).undo().run();
            }}
            disabled={!editor.can().undo()}
            type="button"
            aria-label="בטל פעולה אחרונה"
          >
            <Undo className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus(undefined, { scrollIntoView: false }).redo().run();
            }}
            disabled={!editor.can().redo()}
            type="button"
            aria-label="בצע שוב"
          >
            <Redo className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Preview Button */}
        <div className="flex items-center gap-2">
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                type="button"
                onClick={() => setIsPreviewOpen(true)}
              >
                <Eye className="h-4 w-4 mr-2" aria-hidden="true" />
                תצוגה מקדימה
              </Button>
            </DialogTrigger>
            <DialogContent 
              className="!max-w-none !w-screen !h-screen !max-h-screen overflow-y-auto p-0 m-0 rounded-none"
              style={{ width: '100vw', height: '100vh', maxWidth: '100vw', maxHeight: '100vh' }}
            >
              <div className="sticky top-0 bg-white border-b z-50 px-6 py-4 shadow-sm flex items-center justify-between">
                <div></div>
                <DialogHeader className="p-0">
                  <DialogTitle className="text-center text-lg font-bold text-orange-600">תצוגה מקדימה</DialogTitle>
                </DialogHeader>
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
                  aria-label="Close"
                  type="button"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Mimicking BlogDetail page layout with background */}
              <div className="min-h-screen relative" dir="rtl">
                {/* Background Image */}
                <div
                  className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-60 z-0"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                ></div>
                
                <div className="relative z-10">
                  {/* Hero Section - like BlogDetail */}
                  <section className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="grid grid-cols-1 gap-12 items-start">
                        <div className="space-y-6">
                          <h1 className="text-4xl md:text-5xl text-gray-900 leading-tight" style={{ fontWeight: 500 }}>
                            תצוגה מקדימה של הפוסט
                          </h1>
                          <p className="text-xl text-gray-700">
                            כך הפוסט שלך ייראה בעמוד הבלוג הציבורי
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Blog Content - like BlogDetail */}
                  <main className="max-w-4xl mx-auto" style={{ paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '4rem', paddingBottom: '4rem' }}>
                    <article className="bg-white rounded-2xl shadow-lg" style={{ padding: '3rem' }}>
                      <div 
                        className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                        style={{ lineHeight: '1.8' }}
                        dir="rtl"
                        dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-500 text-center" style="text-align: center;">אין תוכן לתצוגה - התחל לכתוב כדי לראות את התצוגה המקדימה</p>' }}
                      />
                    </article>
                  </main>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Editor Content */}
      <div className="bg-white relative">
        <EditorContent editor={editor} style={{ minHeight: '600px' }}/>
        {placeholder && !editor.getText() && (
          <div className="absolute top-6 right-6 text-gray-400 pointer-events-none text-lg" >
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}

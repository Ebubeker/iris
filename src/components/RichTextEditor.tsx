import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
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
  Loader2
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
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
      editor?.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
    }
  };

  const removeLink = () => {
    editor?.chain().focus().unsetLink().run();
  };

  const addImage = () => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
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
        editor?.chain().focus().setImage({ src: result.url }).run();
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
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'bg-orange-100 text-orange-700' : ''}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'bg-orange-100 text-orange-700' : ''}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'bg-orange-100 text-orange-700' : ''}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'bg-orange-100 text-orange-700' : ''}
          >
            P
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'bg-orange-100 text-orange-700' : ''}
          >
            H1
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'bg-orange-100 text-orange-700' : ''}
          >
            H2
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'bg-orange-100 text-orange-700' : ''}
          >
            H3
          </Button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'bg-orange-100 text-orange-700' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'bg-orange-100 text-orange-700' : ''}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'bg-orange-100 text-orange-700' : ''}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'bg-orange-100 text-orange-700' : ''}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'bg-orange-100 text-orange-700' : ''}
          >
            <AlignLeft className="h-4 w-4" />
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
          />
          <Button
            variant="outline"
            size="sm"
            onClick={addLink}
            disabled={!linkUrl}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={removeLink}
            disabled={!editor.isActive('link')}
          >
            <Unlink className="h-4 w-4" />
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
          />
          <Button
            variant="outline"
            size="sm"
            onClick={addImage}
            disabled={!imageUrl}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        {/* Preview Button */}
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
              >
                <Eye className="h-4 w-4 mr-2" />
                תצוגה מקדימה
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-right">תצוגה מקדימה של הפוסט</DialogTitle>
              </DialogHeader>
              <div 
                className="prose prose-lg max-w-none p-6 bg-white rounded-lg border"
                dir="rtl"
                dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-500">אין תוכן לתצוגה</p>' }}
              />
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

import React, { useState, useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Alert, AlertDescription } from './ui/alert'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { imageUploadService, UploadResult } from '../services/imageUploadService'

interface ImageUploadProps {
  label: string
  value: string
  onChange: (url: string, path?: string) => void
  placeholder?: string
  description?: string
  showPreview?: boolean
  previewClassName?: string
}

export default function ImageUpload({
  label,
  value,
  onChange,
  placeholder = "Enter image URL or upload from PC",
  description,
  showPreview = true,
  previewClassName = "w-32 h-20 object-cover rounded-lg border border-gray-200"
}: ImageUploadProps) {
  const [urlInput, setUrlInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    setError('')
    setUploading(true)

    // Validate file
    const validation = imageUploadService.validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error || 'Invalid file')
      setUploading(false)
      return
    }

    try {
      // Get preview
      const previewUrl = await imageUploadService.getImagePreview(file)
      setPreview(previewUrl)

      // Upload file
      const result: UploadResult = await imageUploadService.uploadImage(file, 'thumbnails')
      
      if (result.error) {
        setError(result.error)
      } else {
        onChange(result.url, result.path)
        setPreview('')
      }
    } catch (error) {
      setError('Failed to upload image')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setUrlInput('')
      setError('')
    }
  }

  const handleRemove = () => {
    onChange('')
    setPreview('')
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const displayImage = preview || value

  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">{label}</Label>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* URL Input */}
      <div className="flex gap-2">
        <Input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter image URL"
          className="text-right"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleUrlSubmit()
            }
          }}
        />
        <Button
          type="button"
          onClick={handleUrlSubmit}
          disabled={!urlInput.trim()}
          variant="outline"
        >
          Add URL
        </Button>
      </div>

      {/* File Upload */}
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          variant="outline"
          className="flex items-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload from PC
            </>
          )}
        </Button>
        
        {displayImage && (
          <Button
            type="button"
            onClick={handleRemove}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}

      {/* Preview */}
      {showPreview && displayImage && (
        <div className="mt-2">
          <img
            src={displayImage}
            alt="Preview"
            className={previewClassName}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}
    </div>
  )
}

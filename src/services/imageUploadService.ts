import { supabase } from '../lib/supabase'

export interface UploadResult {
  url: string
  path: string
  error?: string
}

export const imageUploadService = {
  // Upload image to Supabase storage
  async uploadImage(file: File, folder: string = 'iris'): Promise<UploadResult> {
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from('iris')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Error uploading image:', error)
        return { url: '', path: '', error: error.message }
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('iris')
        .getPublicUrl(filePath)

      return {
        url: urlData.publicUrl,
        path: filePath
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      return { 
        url: '', 
        path: '', 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }
    }
  },

  // Delete image from Supabase storage
  async deleteImage(path: string): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.storage
        .from('iris')
        .remove([path])

      if (error) {
        console.error('Error deleting image:', error)
        return { error: error.message }
      }

      return {}
    } catch (error) {
      console.error('Error deleting image:', error)
      return { 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }
    }
  },

  // Validate image file
  validateImageFile(file: File): { valid: boolean; error?: string } {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Please select a valid image file (JPEG, PNG, GIF, or WebP)'
      }
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'Image size must be less than 5MB'
      }
    }

    return { valid: true }
  },

  // Get image preview URL
  getImagePreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string)
        } else {
          reject(new Error('Failed to read file'))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }
}

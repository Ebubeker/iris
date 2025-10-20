import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface BlogPost {
  id: string
  title: string
  subtitle?: string
  summary?: string
  content: string
  thumbnail_url?: string
  thumbnail_path?: string
  featured: boolean
  tags: string[]
  created_at: string
  updated_at: string
  author_id: string
}

export interface User {
  id: string
  email: string
  created_at: string
}

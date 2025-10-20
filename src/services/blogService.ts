import { supabase, BlogPost } from '../lib/supabase'

export const blogService = {
  // Get all blog posts
  async getBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching blog posts:', error)
      throw error
    }

    return data || []
  },

  // Get a single blog post by ID
  async getBlogPost(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      throw error
    }

    return data
  },

  // Create a new blog post
  async createBlogPost(blogPost: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([blogPost])
      .select()
      .single()

    if (error) {
      console.error('Error creating blog post:', error)
      throw error
    }

    return data
  },

  // Update a blog post
  async updateBlogPost(id: string, updates: Partial<Omit<BlogPost, 'id' | 'created_at' | 'author_id'>>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating blog post:', error)
      throw error
    }

    return data
  },

  // Delete a blog post
  async deleteBlogPost(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting blog post:', error)
      throw error
    }
  },

  // Get featured blog posts
  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching featured blog posts:', error)
      throw error
    }

    return data || []
  }
}

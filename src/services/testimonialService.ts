import { supabase, Testimonial } from '../lib/supabase'

export const testimonialService = {
  // Get approved testimonials (public)
  async getApprovedTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching testimonials:', error)
      throw error
    }

    return data || []
  },

  // Get all testimonials including pending ones (admin)
  async getAllTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all testimonials:', error)
      throw error
    }

    return data || []
  },

  // Public submission - always pending until approved in the admin.
  // No .select() here: anonymous users can't read back unapproved rows (RLS).
  async submitTestimonial(testimonial: { name: string; role?: string; content: string }): Promise<void> {
    const { error } = await supabase
      .from('testimonials')
      .insert([{ ...testimonial, approved: false }])

    if (error) {
      console.error('Error submitting testimonial:', error)
      throw error
    }
  },

  // Admin adds a testimonial directly (e.g. received via WhatsApp) - approved immediately
  async createTestimonial(testimonial: { name: string; role?: string; content: string }): Promise<Testimonial> {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([{ ...testimonial, approved: true }])
      .select()
      .single()

    if (error) {
      console.error('Error creating testimonial:', error)
      throw error
    }

    return data
  },

  // Approve / unapprove (admin)
  async setApproved(id: string, approved: boolean): Promise<Testimonial> {
    const { data, error } = await supabase
      .from('testimonials')
      .update({ approved })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating testimonial:', error)
      throw error
    }

    return data
  },

  // Delete a testimonial (admin)
  async deleteTestimonial(id: string): Promise<void> {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting testimonial:', error)
      throw error
    }
  }
}

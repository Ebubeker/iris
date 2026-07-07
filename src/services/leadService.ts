import { supabase, Lead } from '../lib/supabase'

export interface LeadInput {
  name: string
  email: string
  phone?: string
  service?: string
  message?: string
}

export const leadService = {
  // Public submission. Stored immediately so a lead is never lost even if the
  // email notification later fails. No .select() — anon has no read access (RLS).
  async submitLead(lead: LeadInput): Promise<void> {
    const { error } = await supabase
      .from('leads')
      .insert([{ ...lead, status: 'new', source: 'website-contact-form' }])

    if (error) {
      console.error('Error submitting lead:', error)
      throw error
    }
  },

  // Admin: list every lead, newest first.
  async getLeads(): Promise<Lead[]> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching leads:', error)
      throw error
    }

    return data || []
  },

  // Admin: move a lead through its follow-up lifecycle.
  async setStatus(id: string, status: Lead['status']): Promise<Lead> {
    const { data, error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating lead:', error)
      throw error
    }

    return data
  },

  // Admin: delete a lead.
  async deleteLead(id: string): Promise<void> {
    const { error } = await supabase.from('leads').delete().eq('id', id)

    if (error) {
      console.error('Error deleting lead:', error)
      throw error
    }
  },
}

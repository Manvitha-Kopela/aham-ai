// Updates needed in src/components/Contact.jsx
// Replace the handleSubmit function with this version
// to save leads directly to your Supabase database

import { submitLead } from '../lib/supabase'

// In handleSubmit(), replace the setTimeout simulation with:
/*
  try {
    await submitLead(form.name, form.email, form.service, form.msg)
    setStatus('success')
    setForm({ name: '', email: '', service: 'Web Design & Development', msg: '' })
  } catch (err) {
    console.error('Lead submission error:', err)
    setStatus('error')
  }
*/

// This saves every contact form submission to your Supabase
// 'leads' table, which then appears in your Admin Dashboard.

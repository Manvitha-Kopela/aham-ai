import { createClient } from '@supabase/supabase-js'

// ================================================================
// STEP 1 — Get these from Supabase dashboard:
//   → Go to https://supabase.com → Your Project
//   → Settings → API
//   → Copy "Project URL" and "anon public" key
// ================================================================
// STEP 2 — Create a .env file in your project root:
//   VITE_SUPABASE_URL=https://xxxx.supabase.co
//   VITE_SUPABASE_ANON_KEY=eyJhbGci...
// ================================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠ Supabase env vars missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
)

// ── Auth helpers ──────────────────────────────────────────────────

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// ── Profile helpers ───────────────────────────────────────────────

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}

// ── Project helpers ───────────────────────────────────────────────

export async function getProjects(clientId) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getProjectData(projectId) {
  // Fetch all project data in parallel
  const [timeline, deliverables, messages, files, invoices, approvals, activity, brandAssets] =
    await Promise.all([
      supabase.from('timeline_steps').select('*').eq('project_id', projectId).order('sort_order'),
      supabase.from('deliverables').select('*').eq('project_id', projectId).order('sort_order'),
      supabase.from('messages').select('*').eq('project_id', projectId).order('created_at'),
      supabase.from('files').select('*').eq('project_id', projectId).order('created_at', { ascending: false }),
      supabase.from('invoices').select('*').eq('project_id', projectId).order('created_at'),
      supabase.from('approvals').select('*').eq('project_id', projectId).order('created_at', { ascending: false }),
      supabase.from('activity').select('*').eq('project_id', projectId).order('created_at', { ascending: false }).limit(10),
      supabase.from('brand_assets').select('*').eq('project_id', projectId).order('created_at'),
    ])
  return {
    timeline: timeline.data || [],
    deliverables: deliverables.data || [],
    messages: messages.data || [],
    files: files.data || [],
    invoices: invoices.data || [],
    approvals: approvals.data || [],
    activity: activity.data || [],
    brandAssets: brandAssets.data || [],
  }
}

// ── Message helpers ───────────────────────────────────────────────

export async function sendMessage(projectId, senderId, senderName, senderInitials, senderType, content) {
  const { data, error } = await supabase
    .from('messages')
    .insert({ project_id: projectId, sender_id: senderId, sender_name: senderName, sender_initials: senderInitials, sender_type: senderType, content })
    .select()
    .single()
  if (error) throw error
  return data
}

export function subscribeToMessages(projectId, callback) {
  return supabase
    .channel(`messages:${projectId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `project_id=eq.${projectId}`,
    }, payload => callback(payload.new))
    .subscribe()
}

// ── File helpers ──────────────────────────────────────────────────

export async function uploadFile(projectId, uploadedBy, uploaderName, file) {
  const ext = file.name.split('.').pop()
  const path = `${projectId}/${Date.now()}-${file.name}`

  // Upload to Supabase Storage
  const { error: storageErr } = await supabase.storage
    .from('project-files')
    .upload(path, file)
  if (storageErr) throw storageErr

  // Save metadata to DB
  const { data, error: dbErr } = await supabase
    .from('files')
    .insert({
      project_id: projectId,
      uploaded_by: uploadedBy,
      uploader_name: uploaderName,
      name: file.name,
      file_type: ext,
      size_mb: parseFloat((file.size / 1024 / 1024).toFixed(2)),
      storage_path: path,
      category: 'Uploads',
    })
    .select()
    .single()
  if (dbErr) throw dbErr
  return data
}

export async function getFileUrl(storagePath) {
  const { data } = await supabase.storage
    .from('project-files')
    .createSignedUrl(storagePath, 3600) // 1 hour expiry
  return data?.signedUrl
}

// ── Approval helpers ──────────────────────────────────────────────

export async function updateApproval(approvalId, status, note) {
  const { data, error } = await supabase
    .from('approvals')
    .update({ status, client_note: note, reviewed_at: new Date().toISOString() })
    .eq('id', approvalId)
    .select()
    .single()
  if (error) throw error
  return data
}

// ── Notification helpers ──────────────────────────────────────────

export async function getNotifications(userId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20)
  if (error) throw error
  return data || []
}

export async function markNotificationsRead(userId) {
  await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false)
}

// ── Meeting helpers ───────────────────────────────────────────────

export async function getAvailableSlots() {
  const { data, error } = await supabase
    .from('meeting_slots')
    .select('*')
    .eq('available', true)
    .order('slot_datetime')
  if (error) throw error
  return data || []
}

export async function bookSlot(slotId, clientId, projectId) {
  const { data, error } = await supabase
    .from('bookings')
    .insert({ slot_id: slotId, client_id: clientId, project_id: projectId })
    .select()
    .single()
  if (error) throw error

  // Mark slot as unavailable
  await supabase.from('meeting_slots').update({ available: false }).eq('id', slotId)
  return data
}

// ── Leads (contact form) ──────────────────────────────────────────

export async function submitLead(name, email, service, message) {
  const { error } = await supabase
    .from('leads')
    .insert({ name, email, service, message })
  if (error) throw error
}

// ── Admin helpers ─────────────────────────────────────────────────

export async function getAllLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getAllProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*, profiles(full_name, company)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function updateLeadStatus(leadId, status) {
  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', leadId)
  if (error) throw error
}

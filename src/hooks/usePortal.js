import { useState, useEffect, useCallback } from 'react'
import {
  supabase, signIn, signOut, getProfile, updateProfile,
  getProjects, getProjectData, sendMessage, subscribeToMessages,
  uploadFile, updateApproval, getNotifications, markNotificationsRead,
  getAvailableSlots, bookSlot, getFileUrl,
} from '../lib/supabase'

// ================================================================
// useAuth — handles login/logout/session
// ================================================================
export function useAuth() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) loadProfile(session.user.id)
      else setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) loadProfile(session.user.id)
      else { setProfile(null); setLoading(false) }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function loadProfile(userId) {
    try {
      const data = await getProfile(userId)
      setProfile(data)
    } catch (e) {
      console.error('Profile load error:', e)
    } finally {
      setLoading(false)
    }
  }

  async function login(email, password) {
    setError(null)
    setLoading(true)
    try {
      await signIn(email, password)
    } catch (e) {
      setError(e.message || 'Invalid email or password')
      setLoading(false)
      throw e
    }
  }

  async function logout() {
    await signOut()
    setUser(null)
    setProfile(null)
  }

  async function saveProfile(updates) {
    if (!user) return
    const updated = await updateProfile(user.id, updates)
    setProfile(updated)
    return updated
  }

  return { user, profile, loading, error, login, logout, saveProfile }
}

// ================================================================
// usePortal — loads all data for the client dashboard
// ================================================================
export function usePortal(user, profile) {
  const [projects, setProjects] = useState([])
  const [activeProject, setActiveProject] = useState(null)
  const [projectData, setProjectData] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [slots, setSlots] = useState([])
  const [loadingProject, setLoadingProject] = useState(false)
  const [error, setError] = useState(null)

  // Load projects when user is ready
  useEffect(() => {
    if (!user?.id) return
    loadProjects()
    loadNotifications()
    loadSlots()
  }, [user?.id])

  // Load project data when active project changes
  useEffect(() => {
    if (!activeProject?.id) return
    loadProjectData(activeProject.id)
    setupRealtimeMessages(activeProject.id)
  }, [activeProject?.id])

  async function loadProjects() {
    try {
      const data = await getProjects(user.id)
      setProjects(data)
      if (data.length > 0) setActiveProject(data[0])
    } catch (e) {
      setError(e.message)
    }
  }

  async function loadProjectData(projectId) {
    setLoadingProject(true)
    try {
      const data = await getProjectData(projectId)
      setProjectData(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoadingProject(false)
    }
  }

  async function loadNotifications() {
    try {
      const data = await getNotifications(user.id)
      setNotifications(data)
    } catch (e) {
      console.error('Notifications error:', e)
    }
  }

  async function loadSlots() {
    try {
      const data = await getAvailableSlots()
      setSlots(data)
    } catch (e) {
      console.error('Slots error:', e)
    }
  }

  // Realtime message subscription
  function setupRealtimeMessages(projectId) {
    const channel = subscribeToMessages(projectId, (newMessage) => {
      setProjectData(prev => prev ? {
        ...prev,
        messages: [...prev.messages, newMessage],
      } : prev)
    })
    return () => supabase.removeChannel(channel)
  }

  // ── Actions ──────────────────────────────────────────────────────

  const postMessage = useCallback(async (content) => {
    if (!activeProject || !user || !profile) return
    const msg = await sendMessage(
      activeProject.id,
      user.id,
      profile.full_name || 'You',
      getInitials(profile.full_name),
      'client',
      content
    )
    // Message will appear via realtime subscription
    return msg
  }, [activeProject, user, profile])

  const handleFileUpload = useCallback(async (file) => {
    if (!activeProject || !user || !profile) return
    const uploaded = await uploadFile(
      activeProject.id,
      user.id,
      profile.full_name || 'Client',
      file
    )
    setProjectData(prev => prev ? {
      ...prev,
      files: [uploaded, ...prev.files],
    } : prev)
    return uploaded
  }, [activeProject, user, profile])

  const handleApproval = useCallback(async (approvalId, status, note = '') => {
    const updated = await updateApproval(approvalId, status, note)
    setProjectData(prev => prev ? {
      ...prev,
      approvals: prev.approvals.map(a => a.id === approvalId ? updated : a),
    } : prev)
  }, [])

  const handleBookSlot = useCallback(async (slotId) => {
    if (!user || !activeProject) return
    await bookSlot(slotId, user.id, activeProject.id)
    setSlots(prev => prev.filter(s => s.id !== slotId))
    return true
  }, [user, activeProject])

  const dismissNotifications = useCallback(async () => {
    if (!user) return
    await markNotificationsRead(user.id)
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [user])

  const getDownloadUrl = useCallback(async (storagePath) => {
    return getFileUrl(storagePath)
  }, [])

  return {
    projects,
    activeProject,
    setActiveProject,
    projectData,
    loadingProject,
    notifications,
    slots,
    error,
    postMessage,
    handleFileUpload,
    handleApproval,
    handleBookSlot,
    dismissNotifications,
    getDownloadUrl,
  }
}

// ── Utilities ─────────────────────────────────────────────────────
function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

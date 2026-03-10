import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('citaca_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('citaca_token')
      localStorage.removeItem('citaca_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ── Auth ──────────────────────────────────────────────
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
}

// ── Student ───────────────────────────────────────────
export const studentAPI = {
  getDashboard: () => api.get('/student/dashboard'),
  getAttendance: () => api.get('/student/attendance'),
  getMarks: () => api.get('/student/marks'),
  getNotes: () => api.get('/student/notes'),
  getSyllabus: () => api.get('/student/syllabus'),
  getPlanner: () => api.get('/student/planner'),
  getLeaderboard: () => api.get('/student/leaderboard'),
  getLeetCode: () => api.get('/student/leetcode'),
  getCompetitions: () => api.get('/student/competitions'),
  getNews: () => api.get('/student/news'),
  getResetPlan: () => api.get('/student/reset-plan'),
  chatWithAI: (message) => api.post('/ai/chat', { message }),
  wellnessChat: (message) => api.post('/ai/wellness', { message }),
}

// ── Faculty ───────────────────────────────────────────
export const facultyAPI = {
  getDashboard: () => api.get('/faculty/dashboard'),
  getAttendance: () => api.get('/faculty/attendance'),
  generateQR: (classId) => api.post('/faculty/attendance/qr', { classId }),
  getAssignments: () => api.get('/faculty/assignments'),
  createAssignment: (data) => api.post('/faculty/assignments', data),
  uploadNotes: (formData) => api.post('/faculty/notes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getResetPlans: () => api.get('/faculty/reset-plans'),
}

// ── HOD ───────────────────────────────────────────────
export const hodAPI = {
  getDashboard: () => api.get('/hod/dashboard'),
  getDepartmentStats: () => api.get('/hod/stats'),
}

// ── Parent ────────────────────────────────────────────
export const parentAPI = {
  getDashboard: () => api.get('/parent/dashboard'),
  getChildProgress: (childId) => api.get(`/parent/child/${childId}`),
}

// ── Admin ─────────────────────────────────────────────
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: () => api.get('/admin/users'),
  createAnnouncement: (data) => api.post('/admin/announcements', data),
}

export default api

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { AuthProvider, useAuth, ROLES } from './context/AuthContext'
import SplashScreen from './components/SplashScreen'
import BottomNav from './components/BottomNav'

// Pages
import LoginScreen        from './pages/LoginScreen'
import ProfileScreen      from './pages/ProfileScreen'
import StudentDashboard   from './pages/student/StudentDashboard'
import AIChatbotScreen    from './pages/student/AIChatbotScreen'
import FacultyDashboard   from './pages/faculty/FacultyDashboard'
import { HodDashboard }   from './pages/hod/HodDashboard'
import ParentDashboard    from './pages/parent/ParentDashboard'
import AdminDashboard     from './pages/admin/AdminDashboard'

// Protected route wrapper
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />
  }
  return children
}

// Role-based home redirect
function HomeRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  const map = {
    [ROLES.STUDENT]: '/student',
    [ROLES.FACULTY]: '/faculty',
    [ROLES.HOD]:     '/hod',
    [ROLES.PARENT]:  '/parent',
    [ROLES.ADMIN]:   '/admin',
  }
  return <Navigate to={map[user.role] || '/login'} replace />
}

function AppRoutes() {
  return (
    <div className="max-w-md mx-auto relative min-h-screen">
      <Routes>
        <Route path="/"       element={<HomeRedirect />} />
        <Route path="/login"  element={<LoginScreen />} />

        {/* Student */}
        <Route path="/student" element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/student/ai-chat" element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <AIChatbotScreen />
          </ProtectedRoute>
        } />

        {/* Faculty */}
        <Route path="/faculty" element={
          <ProtectedRoute allowedRoles={[ROLES.FACULTY]}>
            <FacultyDashboard />
          </ProtectedRoute>
        } />

        {/* HOD */}
        <Route path="/hod" element={
          <ProtectedRoute allowedRoles={[ROLES.HOD]}>
            <HodDashboard />
          </ProtectedRoute>
        } />

        {/* Parent */}
        <Route path="/parent" element={
          <ProtectedRoute allowedRoles={[ROLES.PARENT]}>
            <ParentDashboard />
          </ProtectedRoute>
        } />

        {/* Admin */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Shared */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <AuthProvider>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

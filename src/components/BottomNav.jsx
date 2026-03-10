import { useNavigate, useLocation } from 'react-router-dom'
import { Home, BookOpen, Bell, User, LayoutGrid } from 'lucide-react'
import { useAuth, ROLES } from '../context/AuthContext'

const studentNav = [
  { icon: Home,       label: 'Home',     path: '/student' },
  { icon: BookOpen,   label: 'Courses',  path: '/student/notes' },
  { icon: LayoutGrid, label: 'More',     path: '/student/more' },
  { icon: Bell,       label: 'Alerts',   path: '/student/reminders' },
  { icon: User,       label: 'Profile',  path: '/profile' },
]

const facultyNav = [
  { icon: Home,       label: 'Home',      path: '/faculty' },
  { icon: BookOpen,   label: 'Classes',   path: '/faculty/attendance' },
  { icon: LayoutGrid, label: 'More',      path: '/faculty/more' },
  { icon: Bell,       label: 'Alerts',    path: '/faculty/alerts' },
  { icon: User,       label: 'Profile',   path: '/profile' },
]

const hodNav = [
  { icon: Home,       label: 'Home',    path: '/hod' },
  { icon: LayoutGrid, label: 'Stats',   path: '/hod/stats' },
  { icon: User,       label: 'Profile', path: '/profile' },
]

const parentNav = [
  { icon: Home,       label: 'Home',    path: '/parent' },
  { icon: User,       label: 'Profile', path: '/profile' },
]

const adminNav = [
  { icon: Home,       label: 'Home',  path: '/admin' },
  { icon: LayoutGrid, label: 'Users', path: '/admin/users' },
  { icon: User,       label: 'Profile', path: '/profile' },
]

const navMap = {
  [ROLES.STUDENT]: studentNav,
  [ROLES.FACULTY]: facultyNav,
  [ROLES.HOD]: hodNav,
  [ROLES.PARENT]: parentNav,
  [ROLES.ADMIN]: adminNav,
}

export default function BottomNav() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if (!user) return null
  const navItems = navMap[user.role] || studentNav

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-bottom z-40 shadow-lg">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-2xl transition-all duration-150 ${
                active ? 'text-citaca-dark' : 'text-gray-400'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-150 ${
                active ? 'bg-citaca-yellow shadow-citaca' : ''
              }`}>
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              </div>
              <span className={`text-[10px] font-body ${active ? 'font-semibold text-citaca-dark' : ''}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

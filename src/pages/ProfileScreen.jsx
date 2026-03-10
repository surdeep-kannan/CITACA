import { useNavigate } from 'react-router-dom'
import { ArrowLeft, LogOut, User, Mail, Phone, Building } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function ProfileScreen() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="page-container bg-white">
      <div className="top-bar">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 bg-citaca-dark/10 rounded-xl flex items-center justify-center">
            <ArrowLeft size={18} className="text-citaca-dark" />
          </button>
          <h1 className="font-display font-700 text-citaca-dark text-xl">My Profile</h1>
        </div>
      </div>

      <div className="px-5 pt-5 space-y-5 page-enter">
        {/* Avatar */}
        <div className="flex flex-col items-center py-6">
          <div className="w-20 h-20 bg-citaca-dark rounded-3xl flex items-center justify-center shadow-citaca-lg mb-3">
            <span className="font-display font-800 text-citaca-yellow text-3xl">
              {user?.name?.[0] ?? 'U'}
            </span>
          </div>
          <h2 className="font-display font-700 text-citaca-dark text-xl">{user?.name ?? 'User'}</h2>
          <span className="mt-1 bg-citaca-yellow text-citaca-dark text-xs font-body font-600 px-3 py-1 rounded-full capitalize">
            {user?.role ?? 'Student'}
          </span>
        </div>

        {/* Details */}
        <div className="card space-y-4">
          {[
            { icon: Mail,     label: 'Email',      value: user?.email },
            { icon: Phone,    label: 'Phone',      value: user?.phone ?? '—' },
            { icon: Building, label: 'Department', value: user?.department ?? '—' },
            { icon: User,     label: 'Roll No',    value: user?.roll_no ?? '—' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 bg-citaca-yellow/20 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={16} className="text-citaca-dark" />
              </div>
              <div>
                <p className="font-body text-gray-400 text-xs">{label}</p>
                <p className="font-body font-500 text-citaca-dark text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-red-200 text-red-500 font-body font-500 hover:bg-red-50 active:scale-95 transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>

        <p className="text-center font-body text-gray-300 text-xs pb-4">CITACA v1.0 · CIT Chennai</p>
      </div>
    </div>
  )
}

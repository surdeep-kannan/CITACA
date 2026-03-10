import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminAPI } from '../../api'
import { Users, Bell, Settings } from 'lucide-react'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    adminAPI.getDashboard().then(r => setStats(r.data)).catch(() => {})
  }, [])

  return (
    <div className="page-container bg-white">
      <div className="top-bar">
        <p className="font-body text-citaca-dark/60 text-sm">Admin Panel</p>
        <h1 className="font-display font-700 text-citaca-dark text-2xl">System Overview</h1>
      </div>
      <div className="px-5 pt-5 space-y-4 page-enter">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Users',   value: stats?.total_users ?? '—' },
            { label: 'Active Today',  value: stats?.active_today ?? '—' },
            { label: 'Departments',   value: stats?.departments ?? '—' },
          ].map(({ label, value }) => (
            <div key={label} className="card text-center">
              <p className="font-display font-700 text-2xl text-citaca-dark">{value}</p>
              <p className="font-body text-gray-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {[
            { icon: Users, label: 'Manage Users', path: '/admin/users' },
            { icon: Bell,  label: 'Send Announcement', path: '/admin/announcements' },
            { icon: Settings, label: 'System Settings', path: '/admin/settings' },
          ].map(({ icon: Icon, label, path }) => (
            <button key={path} onClick={() => navigate(path)}
              className="w-full card flex items-center gap-4 hover:bg-citaca-yellow-soft hover:border-citaca-yellow active:scale-95 transition-all">
              <div className="w-10 h-10 bg-citaca-yellow/30 rounded-2xl flex items-center justify-center">
                <Icon size={18} className="text-citaca-dark" />
              </div>
              <span className="font-body font-500 text-citaca-dark">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

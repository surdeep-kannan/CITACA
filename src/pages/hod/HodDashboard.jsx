// HOD Dashboard
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import { hodAPI } from '../../api'
import { Users, TrendingUp, BookOpen, ChevronRight } from 'lucide-react'

export function HodDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    hodAPI.getDashboard().then(r => setStats(r.data)).catch(() => {})
  }, [])

  return (
    <div className="page-container bg-white">
      <div className="top-bar">
        <p className="font-body text-citaca-dark/60 text-sm">HOD Portal</p>
        <h1 className="font-display font-700 text-citaca-dark text-2xl">Department Overview</h1>
      </div>
      <div className="px-5 pt-5 space-y-4 page-enter">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Users,      label: 'Total Students', value: stats?.total_students ?? '—' },
            { icon: TrendingUp, label: 'Avg Attendance',  value: stats?.avg_attendance ? `${stats.avg_attendance}%` : '—' },
            { icon: BookOpen,   label: 'Subjects',        value: stats?.subjects ?? '—' },
            { icon: Users,      label: 'Faculty',         value: stats?.faculty_count ?? '—' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="card flex items-center gap-3">
              <div className="w-10 h-10 bg-citaca-yellow/30 rounded-2xl flex items-center justify-center">
                <Icon size={18} className="text-citaca-dark" />
              </div>
              <div>
                <p className="font-display font-700 text-xl text-citaca-dark">{value}</p>
                <p className="font-body text-gray-400 text-xs">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

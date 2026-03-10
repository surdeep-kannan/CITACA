import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QrCode, BookOpen, Upload, ClipboardList, ChevronRight, Users, Bell } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { facultyAPI } from '../../api'

const quickLinks = [
  { icon: QrCode,       label: 'QR Attendance', path: '/faculty/attendance-qr', color: 'bg-citaca-yellow text-citaca-dark' },
  { icon: ClipboardList,label: 'Attendance Mgr', path: '/faculty/attendance',   color: 'bg-blue-100 text-blue-700' },
  { icon: Upload,       label: 'Upload Notes',  path: '/faculty/notes',         color: 'bg-green-100 text-green-700' },
  { icon: BookOpen,     label: 'Assignments',   path: '/faculty/assignments',   color: 'bg-purple-100 text-purple-700' },
]

export default function FacultyDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    facultyAPI.getDashboard().then(r => setStats(r.data)).catch(() => {})
  }, [])

  const firstName = user?.name?.split(' ')[0] || 'Faculty'

  return (
    <div className="page-container bg-white">
      <div className="top-bar">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-citaca-dark/60 text-sm">Faculty Portal</p>
            <h1 className="font-display font-700 text-citaca-dark text-2xl">Prof. {firstName}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/profile')}
              className="w-10 h-10 bg-citaca-dark rounded-2xl flex items-center justify-center">
              <span className="font-display font-700 text-citaca-yellow text-sm">{firstName[0]}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 space-y-6 page-enter">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Classes Today', value: stats?.classes_today ?? '—' },
            { label: 'Students',      value: stats?.total_students ?? '—' },
            { label: 'Pending',       value: stats?.pending_tasks ?? '—' },
          ].map(({ label, value }) => (
            <div key={label} className="card text-center">
              <p className="font-display font-700 text-2xl text-citaca-dark">{value}</p>
              <p className="font-body text-gray-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Quick QR button */}
        <button
          onClick={() => navigate('/faculty/attendance-qr')}
          className="w-full bg-citaca-dark rounded-3xl p-5 flex items-center justify-between group"
        >
          <div>
            <p className="font-body text-citaca-yellow text-xs tracking-widest uppercase mb-1">Quick Action</p>
            <p className="font-display font-700 text-white text-lg">Generate QR Attendance</p>
            <p className="font-body text-white/50 text-sm mt-0.5">Let students scan to mark attendance</p>
          </div>
          <div className="w-12 h-12 bg-citaca-yellow rounded-2xl flex items-center justify-center shadow-citaca">
            <QrCode size={22} className="text-citaca-dark" />
          </div>
        </button>

        {/* Quick links */}
        <div>
          <h2 className="font-display font-700 text-citaca-dark text-lg mb-3">Tools</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map(({ icon: Icon, label, path, color }) => (
              <button key={path} onClick={() => navigate(path)}
                className="card flex items-center gap-3 hover:border-citaca-yellow hover:bg-citaca-yellow-soft active:scale-95 transition-all">
                <div className={`w-11 h-11 ${color} rounded-2xl flex items-center justify-center shrink-0`}>
                  <Icon size={20} />
                </div>
                <span className="font-body font-500 text-citaca-dark text-sm text-left">{label}</span>
                <ChevronRight size={16} className="text-gray-300 ml-auto" />
              </button>
            ))}
          </div>
        </div>

        {/* Today's schedule */}
        {stats?.schedule?.length > 0 && (
          <div>
            <h2 className="font-display font-700 text-citaca-dark text-lg mb-3">Today's Classes</h2>
            <div className="space-y-2">
              {stats.schedule.map((cls, i) => (
                <div key={i} className="card flex items-center gap-4">
                  <div className="text-center w-12">
                    <p className="font-display font-700 text-citaca-dark text-sm">{cls.time}</p>
                  </div>
                  <div className="w-px h-10 bg-citaca-yellow rounded-full" />
                  <div>
                    <p className="font-body font-500 text-citaca-dark text-sm">{cls.subject}</p>
                    <p className="font-body text-gray-400 text-xs">{cls.room} · {cls.class}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

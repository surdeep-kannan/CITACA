import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, CheckSquare, Trophy, Code2, Zap, Heart,
  ChevronRight, TrendingUp, Calendar, Bell, Newspaper
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { studentAPI } from '../../api'

const quickLinks = [
  { icon: CheckSquare, label: 'Attendance', path: '/student/attendance', color: 'bg-green-100 text-green-700' },
  { icon: TrendingUp,  label: 'Marks',      path: '/student/marks',      color: 'bg-blue-100 text-blue-700' },
  { icon: BookOpen,    label: 'Notes',       path: '/student/notes',      color: 'bg-purple-100 text-purple-700' },
  { icon: Calendar,    label: 'Planner',     path: '/student/planner',    color: 'bg-orange-100 text-orange-700' },
  { icon: Trophy,      label: 'Leaderboard', path: '/student/leaderboard',color: 'bg-citaca-yellow/60 text-yellow-800' },
  { icon: Code2,       label: 'LeetCode',    path: '/student/leetcode',   color: 'bg-gray-100 text-gray-700' },
  { icon: Zap,         label: 'Competitions',path: '/student/competitions',color: 'bg-red-100 text-red-700' },
  { icon: Heart,       label: 'Wellness',    path: '/student/wellness',   color: 'bg-pink-100 text-pink-700' },
]

export default function StudentDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [news, setNews] = useState([])

  useEffect(() => {
    studentAPI.getDashboard().then(r => setStats(r.data)).catch(() => {})
    studentAPI.getNews().then(r => setNews(r.data?.slice(0, 3) || [])).catch(() => {})
  }, [])

  const firstName = user?.name?.split(' ')[0] || 'Student'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="page-container bg-white">
      {/* Top bar */}
      <div className="top-bar">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-citaca-dark/60 text-sm">{greeting} 👋</p>
            <h1 className="font-display font-700 text-citaca-dark text-2xl">{firstName}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/student/reminders')}
              className="w-10 h-10 bg-citaca-dark/10 rounded-2xl flex items-center justify-center relative">
              <Bell size={18} className="text-citaca-dark" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button onClick={() => navigate('/profile')}
              className="w-10 h-10 bg-citaca-dark rounded-2xl flex items-center justify-center">
              <span className="font-display font-700 text-citaca-yellow text-sm">
                {firstName[0]}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 space-y-6 page-enter">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Attendance', value: stats?.attendance ?? '—', unit: '%', good: (stats?.attendance ?? 0) >= 75 },
            { label: 'CGPA',       value: stats?.cgpa ?? '—',       unit: '',  good: true },
            { label: 'Tasks Due',  value: stats?.tasks_due ?? '—',  unit: '',  good: (stats?.tasks_due ?? 0) === 0 },
          ].map(({ label, value, unit, good }) => (
            <div key={label} className="card text-center">
              <p className={`font-display font-700 text-2xl ${good ? 'text-citaca-dark' : 'text-red-500'}`}>
                {value}{unit}
              </p>
              <p className="font-body text-gray-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* AI Chatbot CTA */}
        <button
          onClick={() => navigate('/student/ai-chat')}
          className="w-full bg-citaca-dark rounded-3xl p-5 flex items-center justify-between group"
        >
          <div>
            <p className="font-body text-citaca-yellow text-xs tracking-widest uppercase mb-1">AI Assistant</p>
            <p className="font-display font-700 text-white text-lg">Ask CITACA anything 🤖</p>
            <p className="font-body text-white/50 text-sm mt-0.5">Doubts, summaries, quizzes...</p>
          </div>
          <div className="w-12 h-12 bg-citaca-yellow rounded-2xl flex items-center justify-center shadow-citaca group-hover:shadow-citaca-lg transition-shadow">
            <ChevronRight size={22} className="text-citaca-dark" />
          </div>
        </button>

        {/* Quick links */}
        <div>
          <h2 className="font-display font-700 text-citaca-dark text-lg mb-3">Quick Access</h2>
          <div className="grid grid-cols-4 gap-3">
            {quickLinks.map(({ icon: Icon, label, path, color }) => (
              <button key={path} onClick={() => navigate(path)}
                className="flex flex-col items-center gap-2 py-4 rounded-3xl bg-gray-50 hover:bg-citaca-yellow-soft active:scale-95 transition-all duration-150 border border-transparent hover:border-citaca-yellow">
                <div className={`w-10 h-10 ${color} rounded-2xl flex items-center justify-center`}>
                  <Icon size={18} />
                </div>
                <span className="font-body text-[11px] text-citaca-gray text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Syllabus tracker */}
        <button onClick={() => navigate('/student/syllabus')}
          className="w-full card-yellow flex items-center justify-between">
          <div>
            <p className="font-body text-xs text-citaca-dark/60 mb-0.5">Syllabus Progress</p>
            <p className="font-display font-700 text-citaca-dark text-base">
              {stats?.syllabus_progress ?? 0}% completed
            </p>
            <div className="w-40 h-1.5 bg-citaca-dark/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-citaca-dark rounded-full transition-all duration-700"
                style={{ width: `${stats?.syllabus_progress ?? 0}%` }}
              />
            </div>
          </div>
          <ChevronRight size={20} className="text-citaca-dark/40" />
        </button>

        {/* Latest news */}
        {news.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-700 text-citaca-dark text-lg">College News</h2>
              <button onClick={() => navigate('/student/news')}
                className="font-body text-sm text-citaca-gray/60 flex items-center gap-1">
                See all <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {news.map((item, i) => (
                <button key={i} onClick={() => navigate(`/student/news/${item.id}`)}
                  className="w-full card text-left flex items-start gap-3">
                  <Newspaper size={18} className="text-citaca-yellow mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body font-500 text-citaca-dark text-sm line-clamp-2">{item.title}</p>
                    <p className="font-body text-gray-400 text-xs mt-1">{item.date}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

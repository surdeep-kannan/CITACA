import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parentAPI } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { TrendingUp, CheckSquare, Bell } from 'lucide-react'

export default function ParentDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    parentAPI.getDashboard().then(r => setData(r.data)).catch(() => {})
  }, [])

  return (
    <div className="page-container bg-white">
      <div className="top-bar">
        <p className="font-body text-citaca-dark/60 text-sm">Parent Portal</p>
        <h1 className="font-display font-700 text-citaca-dark text-2xl">Child's Progress</h1>
      </div>
      <div className="px-5 pt-5 space-y-4 page-enter">
        <div className="card-yellow">
          <p className="font-body text-citaca-dark/60 text-sm mb-1">Monitoring</p>
          <p className="font-display font-700 text-citaca-dark text-xl">{data?.child_name ?? 'Your Child'}</p>
          <p className="font-body text-citaca-gray text-sm">{data?.department ?? '—'} · Sem {data?.semester ?? '—'}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: CheckSquare, label: 'Attendance', value: data?.attendance ? `${data.attendance}%` : '—', alert: (data?.attendance ?? 100) < 75 },
            { icon: TrendingUp,  label: 'CGPA',       value: data?.cgpa ?? '—', alert: false },
          ].map(({ icon: Icon, label, value, alert }) => (
            <div key={label} className={`card ${alert ? 'border-red-200 bg-red-50' : ''}`}>
              <Icon size={18} className={alert ? 'text-red-500' : 'text-citaca-dark'} />
              <p className={`font-display font-700 text-2xl mt-2 ${alert ? 'text-red-500' : 'text-citaca-dark'}`}>{value}</p>
              <p className="font-body text-gray-400 text-xs">{label}</p>
              {alert && <p className="font-body text-red-500 text-xs mt-1">⚠️ Below 75%</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

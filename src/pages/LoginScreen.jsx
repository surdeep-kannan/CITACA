import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth, ROLES } from '../context/AuthContext'

const roleConfig = {
  [ROLES.STUDENT]:  { label: 'Student',  emoji: '🎓', color: 'bg-blue-50 border-blue-200',   active: 'bg-citaca-yellow border-citaca-yellow' },
  [ROLES.FACULTY]:  { label: 'Faculty',  emoji: '👨‍🏫', color: 'bg-green-50 border-green-200',  active: 'bg-citaca-yellow border-citaca-yellow' },
  [ROLES.HOD]:      { label: 'HOD',      emoji: '🏢', color: 'bg-purple-50 border-purple-200', active: 'bg-citaca-yellow border-citaca-yellow' },
  [ROLES.PARENT]:   { label: 'Parent',   emoji: '👨‍👩‍👧', color: 'bg-orange-50 border-orange-200', active: 'bg-citaca-yellow border-citaca-yellow' },
  [ROLES.ADMIN]:    { label: 'Admin',    emoji: '⚙️', color: 'bg-red-50 border-red-200',       active: 'bg-citaca-yellow border-citaca-yellow' },
}

const roleRedirect = {
  [ROLES.STUDENT]: '/student',
  [ROLES.FACULTY]: '/faculty',
  [ROLES.HOD]:     '/hod',
  [ROLES.PARENT]:  '/parent',
  [ROLES.ADMIN]:   '/admin',
}

export default function LoginScreen() {
  const [selectedRole, setSelectedRole] = useState(ROLES.STUDENT)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const mockUser = {
      name: email ? email.split('@')[0].replace('.', ' ') : 'Demo User',
      email: email || 'demo@citchennai.net',
      role: selectedRole,
      department: 'Computer Science',
      roll_no: 'CSE2021001',
      phone: '+91 98765 43210',
    }
    login(mockUser, 'mock-token-123')
    navigate(roleRedirect[selectedRole])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-citaca-yellow px-6 pt-16 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-citaca-dark rounded-2xl flex items-center justify-center">
            <span className="font-display font-800 text-citaca-yellow text-xl">C</span>
          </div>
          <div>
            <h1 className="font-display font-800 text-citaca-dark text-2xl tracking-tight">CITACA</h1>
            <p className="font-body text-citaca-dark/60 text-xs tracking-widest uppercase">CIT Chennai</p>
          </div>
        </div>
        <h2 className="font-display font-700 text-citaca-dark text-3xl leading-tight">
          Welcome back 👋
        </h2>
        <p className="font-body text-citaca-dark/60 text-sm mt-1">Sign in to your academic portal</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-8 pb-10 overflow-y-auto">
        {/* Role selector */}
        <p className="font-body font-500 text-citaca-gray text-sm mb-3">I am a...</p>
        <div className="grid grid-cols-5 gap-2 mb-8">
          {Object.entries(roleConfig).map(([role, cfg]) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`flex flex-col items-center gap-1 py-3 rounded-2xl border-2 transition-all duration-150 ${
                selectedRole === role ? cfg.active : cfg.color
              }`}
            >
              <span className="text-xl">{cfg.emoji}</span>
              <span className="text-[10px] font-body font-600 text-citaca-dark">{cfg.label}</span>
            </button>
          ))}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="font-body font-500 text-citaca-gray text-sm mb-2 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@citchennai.net"
            className="w-full bg-citaca-gray-light rounded-2xl px-4 py-4 font-body text-citaca-dark placeholder-gray-400 outline-none focus:ring-2 focus:ring-citaca-yellow transition-all"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="font-body font-500 text-citaca-gray text-sm mb-2 block">Password</label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-citaca-gray-light rounded-2xl px-4 py-4 font-body text-citaca-dark placeholder-gray-400 outline-none focus:ring-2 focus:ring-citaca-yellow transition-all pr-12"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-citaca-yellow text-citaca-dark font-display font-700 text-lg py-4 rounded-2xl shadow-citaca hover:shadow-citaca-lg hover:bg-citaca-yellow-dark transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-citaca-dark/30 border-t-citaca-dark rounded-full animate-spin" />
          ) : (
            <>Sign In <ArrowRight size={20} /></>
          )}
        </button>

        <p className="text-center font-body text-gray-400 text-xs mt-6">
          Academic Intelligence Platform · CIT Chennai
        </p>
      </div>
    </div>
  )
}

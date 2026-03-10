import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const ROLES = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  HOD: 'hod',
  PARENT: 'parent',
  ADMIN: 'admin',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('citaca_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData, token) => {
    const userWithToken = { ...userData, token }
    setUser(userWithToken)
    localStorage.setItem('citaca_user', JSON.stringify(userWithToken))
    localStorage.setItem('citaca_token', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('citaca_user')
    localStorage.removeItem('citaca_token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

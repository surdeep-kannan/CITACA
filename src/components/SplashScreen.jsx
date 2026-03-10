import { useEffect, useState } from 'react'

export default function SplashScreen({ onDone }) {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1800)
    const t2 = setTimeout(() => onDone(), 2300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 bg-citaca-yellow flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Logo mark */}
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-citaca-dark rounded-3xl flex items-center justify-center shadow-citaca-lg">
          <span className="font-display font-800 text-citaca-yellow text-4xl tracking-tight">C</span>
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-md">
          <span className="text-base">🎓</span>
        </div>
      </div>

      <h1 className="font-display font-800 text-citaca-dark text-4xl tracking-tight">CITACA</h1>
      <p className="font-body text-citaca-dark/60 text-sm mt-2 tracking-widest uppercase">CIT Chennai</p>

      {/* Loading bar */}
      <div className="absolute bottom-16 w-40 h-1 bg-citaca-dark/20 rounded-full overflow-hidden">
        <div className="h-full bg-citaca-dark rounded-full animate-[loadBar_1.8s_ease-in-out_forwards]" />
      </div>

      <style>{`
        @keyframes loadBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  )
}

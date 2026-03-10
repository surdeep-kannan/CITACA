import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Mic } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { studentAPI } from '../../api'

const SUGGESTIONS = [
  'Explain Binary Search Trees 🌳',
  'Summarize my syllabus 📚',
  'Quiz me on OS concepts 🧠',
  'Help with my assignment ✍️',
]

export default function AIChatbotScreen() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm CITACA AI 👋\nAsk me anything about your subjects, syllabus, or assignments!" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setLoading(true)
    try {
      const res = await studentAPI.chatWithAI(msg)
      setMessages(prev => [...prev, { role: 'assistant', text: res.data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I had trouble connecting. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-citaca-yellow px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 bg-citaca-dark/10 rounded-xl flex items-center justify-center">
          <ArrowLeft size={18} className="text-citaca-dark" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-citaca-dark rounded-xl flex items-center justify-center">
            <span className="text-citaca-yellow text-lg">🤖</span>
          </div>
          <div>
            <p className="font-display font-700 text-citaca-dark text-base">CITACA AI</p>
            <p className="font-body text-citaca-dark/50 text-xs">Academic Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-citaca-gray-light">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-3xl px-4 py-3 ${
              msg.role === 'user'
                ? 'bg-citaca-dark text-white rounded-br-lg'
                : 'bg-white text-citaca-dark rounded-bl-lg shadow-sm border border-gray-100'
            }`}>
              <p className="font-body text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-3xl rounded-bl-lg px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex gap-1.5">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 bg-citaca-yellow rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 bg-white border-t border-gray-100">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => sendMessage(s)}
                className="shrink-0 bg-citaca-yellow-soft border border-citaca-yellow text-citaca-dark text-xs font-body px-3 py-2 rounded-2xl">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-gray-100 safe-bottom">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask anything..."
            className="flex-1 bg-citaca-gray-light rounded-2xl px-4 py-3 font-body text-sm text-citaca-dark outline-none focus:ring-2 focus:ring-citaca-yellow"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-11 h-11 bg-citaca-yellow rounded-2xl flex items-center justify-center shadow-citaca disabled:opacity-40 active:scale-95 transition-all"
          >
            <Send size={18} className="text-citaca-dark" />
          </button>
        </div>
      </div>
    </div>
  )
}

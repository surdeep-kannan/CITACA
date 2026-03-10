# CITACA PWA — CIT Chennai Academic Intelligence Platform

## Tech Stack
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS (Yellow & White CIT theme)
- **PWA**: vite-plugin-pwa (auto service worker + manifest)
- **Backend**: Python FastAPI (your existing backend)
- **Auth**: JWT Bearer tokens

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set your FastAPI backend URL
cp .env.example .env
# Edit .env → set VITE_API_URL=http://your-backend-url

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

## Project Structure
```
src/
├── api/          → All FastAPI calls (authAPI, studentAPI, facultyAPI...)
├── components/   → SplashScreen, BottomNav
├── context/      → AuthContext (JWT + role management)
├── pages/
│   ├── student/  → StudentDashboard, AIChatbotScreen, ...
│   ├── faculty/  → FacultyDashboard, ...
│   ├── hod/      → HodDashboard
│   ├── parent/   → ParentDashboard
│   ├── admin/    → AdminDashboard
│   ├── LoginScreen.jsx
│   └── ProfileScreen.jsx
└── App.jsx       → Routes + role-based protection
```

## FastAPI Backend Requirements
Your FastAPI backend should expose these endpoints:

### Auth
- `POST /auth/login` → `{ user: {..., role}, access_token }`
- `GET  /auth/me`

### Student
- `GET  /student/dashboard`
- `GET  /student/attendance`
- `GET  /student/marks`
- `GET  /student/notes`
- `GET  /student/news`
- `POST /ai/chat` → `{ message }` → `{ reply }`
- `POST /ai/wellness`

### Faculty
- `GET  /faculty/dashboard`
- `POST /faculty/attendance/qr`
- `POST /faculty/notes` (multipart)

## Deploying as PWA
1. Build: `npm run build`
2. Deploy `dist/` folder to **Vercel** or **Netlify**
3. Must be served over **HTTPS** for PWA install to work
4. Users will see "Add to Home Screen" prompt automatically

## Adding More Screens
Each screen follows this pattern:
```jsx
// src/pages/student/AttendanceScreen.jsx
import { useEffect, useState } from 'react'
import { studentAPI } from '../../api'

export default function AttendanceScreen() {
  const [data, setData] = useState(null)
  useEffect(() => { studentAPI.getAttendance().then(r => setData(r.data)) }, [])
  // ... render
}
```
Then add the route in `App.jsx`.

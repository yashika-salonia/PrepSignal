// Redirect unauthenticated users to /login
 
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
 
export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
 
  // While checking token validity, show a minimal loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-signal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
 
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
 
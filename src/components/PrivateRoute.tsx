import { Navigate } from 'react-router-dom'
import { isTokenValid } from '../utils/token'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  if (!isTokenValid()) {
    localStorage.removeItem('token')
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

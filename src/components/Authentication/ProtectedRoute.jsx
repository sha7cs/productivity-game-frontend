import React, { useContext } from "react"
import { getUserFromToken } from "../../lib/auth"
import { Navigate } from "react-router"
import { UserContext } from "../../App"

export default function ProtectedRoute({ children }) {
  const { user, getUserProfile } = useContext(UserContext)
  if (!user){
    return <Navigate to="/login" replace />
  }
  
  return children
}
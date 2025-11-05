import React, { useContext } from "react"
import { getUserFromToken } from "../../lib/auth"
import { Navigate } from "react-router"
import { UserContext } from "../../App"
import toast from 'react-hot-toast';

export default function ProtectedRoute({ children }) {
  const { user, getUserProfile } = useContext(UserContext)
  if (!user){
    toast.error('Login first')
    return <Navigate to="/login" replace />
  }
  
  return children
}
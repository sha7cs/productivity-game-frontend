import React, { useContext } from "react"
import { getUserFromToken } from "../../lib/auth"
import { Navigate } from "react-router"
import { UserContext } from "../../App"
import toast from 'react-hot-toast';

// i dont want authorized uses to reach welcome or signup/login pages
export default function PublicRoute({ children }) {
    const { user, getUserProfile } = useContext(UserContext)
    if (user) {
        toast.error('Logout first')
        return <Navigate to="/homepage" replace />
    }
    return children
}
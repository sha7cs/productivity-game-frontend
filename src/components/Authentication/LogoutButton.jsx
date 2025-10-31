import React from 'react'
import { useNavigate } from 'react-router'
import { clearTokens } from '../../lib/auth'

function LogoutButton({setUser, className}) {
    const navigate = useNavigate()
    function handleLogout(){
        clearTokens()
        setUser(null)
        navigate('/login')
    }
  return (
    <div>
        <button onClick={handleLogout} className={className}>Logout</button>
    </div>
  )
}

export default LogoutButton
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { clearTokens } from '../../lib/auth'
import CustomModal from '../CustomModal/CustomModal'

function LogoutButton({setUser, className}) {
    const navigate = useNavigate()
    const [open, setOpen] = useState()
    function handleLogout(){
        clearTokens()
        setUser(null)
        navigate('/login')
    }
  return (
    <>
      <button className='logout-btn' onClick={() => setOpen(true)}>Logout</button>  

      <CustomModal isOpen={open} onClose={() => setOpen(false)}>
        <h2>you sure you want to logout?</h2>
        <button onClick={handleLogout} >Logout</button>
      </CustomModal>
    </>
  )
}

export default LogoutButton
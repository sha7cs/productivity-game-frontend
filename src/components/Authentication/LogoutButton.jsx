import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { clearTokens } from '../../lib/auth'
import CustomModal from '../CustomModal/CustomModal'
import { IoMdLogOut } from "react-icons/io";
import { PiPersonSimpleRunDuotone } from "react-icons/pi";
import toast from 'react-hot-toast';

function LogoutButton({setUser, className}) {
    const navigate = useNavigate()
    const [open, setOpen] = useState()
    function handleLogout(){
        clearTokens()
        setUser(null)
        navigate('/login')
        toast.success('Logout successfull!')
    }
  return (
    <>
      <button id='logout-btn' onClick={() => setOpen(true)} title='Logout'><IoMdLogOut className='icon' size={23}/></button>  
      <div id='logout-modal'>
      <CustomModal isOpen={open} onClose={() => setOpen(false)}>
        <div className='header'>
          <span>Logout</span>
          <hr />
        </div>
        
        <div className='content'>you sure you want to logout?</div>
        <button onClick={handleLogout} ><PiPersonSimpleRunDuotone size={30}/></button>
      </CustomModal>
      </div>
    </>
  )
}

export default LogoutButton
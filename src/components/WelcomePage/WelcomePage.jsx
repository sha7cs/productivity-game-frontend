import React from 'react'
import { Link } from 'react-router'
import './welcome.sass'
import { GiOnTarget } from "react-icons/gi";

function WelcomePage() {
  return (
    <div className='welcome-div'>
      <h1 className='tracking-in-contract '>
        <GiOnTarget size={70} />
        Welcome
        <GiOnTarget size={70} />
      </h1>

      <p>Create fun challenges, share goals with friends, and compete to see who stays most productive.</p>
      <div className='actions'>
        <Link to={'/signup'}><button className='signup-btn'>Signup</button> </Link>
        <Link to={'/login'}><button className='login-btn'>Login</button></Link>
      </div>
    </div>
  )
}

export default WelcomePage
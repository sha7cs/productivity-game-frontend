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

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit ipsum expedita accusamus eveniet,orem excepturi!</p>
      <div className='actions'>
        <Link to={'/signup'}><button className='signup-btn'>Signup</button> </Link>
        <Link to={'/login'}><button className='login-btn'>Login</button></Link>
      </div>
    </div>
  )
}

export default WelcomePage
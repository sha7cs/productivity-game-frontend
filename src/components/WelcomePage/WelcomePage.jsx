import React from 'react'
import { Link } from 'react-router'
import './welcome.sass'
function WelcomePage() {
  return (
    <div className='welcome-div'>
        <h1>Welcome!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit ipsum expedita accusamus eveniet,orem excepturi!</p>
        <div className='actions'>
                <Link to={'/signup'}><button className='signup-btn'>Signup</button> </Link>
                <Link to={'/login'}><button className='login-btn'>Login</button></Link>
        </div>
    </div>
  )
}

export default WelcomePage
import React from 'react'
import { Link } from 'react-router'
function WelcomePage() {
  return (
    <div>
        <h1>Welcome!</h1>
        <>
                <Link to={'/signup'}><button>Signup</button> </Link>
                <Link to={'/login'}><button>Login</button></Link>
        </>
    </div>
  )
}

export default WelcomePage
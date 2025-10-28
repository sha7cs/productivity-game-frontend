import React from 'react'
import { Link } from 'react-router'
import LogoutButton from '../Authentication/LogoutButton'
function NavBar({ user, setUser }) {
    return (
        <nav>
            {user
                ?
                <LogoutButton setUser={setUser} />
                :
                <>
                    <Link to={'/signup'}>Signup</Link>
                    <Link to={'/login'}>Login</Link>
                </>
            }
            <>
                <Link to={`/challenges`}>Challenges </Link>
                <Link to={``}>Add Challenge</Link>
            </>
        </nav>
    )
}

export default NavBar
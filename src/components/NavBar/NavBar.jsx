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
                    <h2>sign up</h2>
                    <h2>login</h2>
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
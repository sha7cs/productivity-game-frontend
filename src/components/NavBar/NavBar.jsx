import React from 'react'
import { Link, NavLink } from 'react-router'
import LogoutButton from '../Authentication/LogoutButton'
import './navbar.sass'
import { IoMdHome } from "react-icons/io";
import { GoGoal } from "react-icons/go";
import { IoPerson } from "react-icons/io5";

function NavBar({ user, setUser }) {
    return (<>
        {user
            ?
            <LogoutButton setUser={setUser} className='logout-btn'/>
            :
            <>
                <Link to={'/signup'}>Signup</Link>
                <Link to={'/login'}>Login</Link>
            </>
        }
        <nav className="navbar">
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "nav-icon active" : "nav-icon")}
            >
                <IoMdHome size={35} />
            </NavLink>

            <NavLink
                to="/challenges"
                className={({ isActive }) => (isActive ? "nav-icon active" : "nav-icon")}
            >
                <GoGoal size={35} />
            </NavLink>

            <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "nav-icon active" : "nav-icon")}
            >
                <IoPerson size={35} />
            </NavLink>
        </nav>
    </>
    )
}

export default NavBar
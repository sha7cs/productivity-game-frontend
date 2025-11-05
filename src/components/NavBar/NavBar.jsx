import React, { useEffect, useContext } from 'react'
import { Link, NavLink } from 'react-router'
import LogoutButton from '../Authentication/LogoutButton'
import './navbar.sass'
import { IoMdHome } from "react-icons/io";
import { GoGoal } from "react-icons/go";
import { IoPerson } from "react-icons/io5";
import { UserContext } from '../../App';

function NavBar() {
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        document.documentElement.classList.add("with-navbar");
        return () => document.documentElement.classList.remove("with-navbar");
    }, []);
    return (<>
        {user
            ?
            <>
                <LogoutButton setUser={setUser} className='logout-btn' />
                <nav className="navbar">
                    <NavLink
                        to="/homepage"
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
                        to='/future'
                        className={({ isActive }) => (isActive ? "nav-icon active" : "nav-icon")}
                    >
                        <IoPerson size={35} />
                    </NavLink>
                </nav>
            </>
            :
            ''
        }

    </>
    )
}

export default NavBar
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import { authRequest } from '../../lib/auth'
import './challenge-list.sass'
import { IoIosAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import ChallengeCard from '../ChallengeCard/ChallengeCard'

function ChallengeList({user}) {
    const [challengeList, setChallengeList] = useState(null) // not an empty array so that when its loading it displays 'loading' for user

    async function getAllChallenges() {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/` })
        setChallengeList(response.data)
    }
    useEffect(() => {
        getAllChallenges()
    }, [])

    return (
        <div className='challenges-page'>
            <div className='header-challenges'>
                <h1 className='page-title'>Challenges</h1>
                <div>
                    <Link to={`/challenges/add`} title="Add a Challenge"><IoIosAddCircle size={30} /></Link> 
                    <Link to={'/challenges/join'} title="Search for Challenge"><FaSearch size={30}/></Link>
                </div>
            </div>
            <div className='challenges'>
                {
                    challengeList
                        ?
                        challengeList.length
                            ?
                            <>
                                {
                                    challengeList.map(challenge => {
                                        return <ChallengeCard challenge={challenge} key={challenge.id} user={user}/>
                                    })
                                }
                            </>
                            :
                            <h2>you have no challenges</h2>
                        :
                        <h2>Loading...</h2>
                }
            </div>
        </div>
    )
}

export default ChallengeList
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import { authRequest } from '../../lib/auth'
import './challenge-list.sass'
import { IoIosAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import ChallengeCard from '../ChallengeCard/ChallengeCard'
import { UserContext } from '../../App'
import '../WelcomePage/welcome.sass'
import JoinChallenge from '../JoinChallenge/JoinChallenge'
import ChallengeForm from '../ChallengeForm/ChallengeForm'

function ChallengeList({ challenges }) {
    const { user } = useContext(UserContext)
    const [challengeList, setChallengeList] = useState(null) // not an empty array so that when its loading it displays 'loading' for user
    const [inActiveChallenges, setInactiveChallenges] = useState(null)

    // async function getAllChallenges() {
    //     try {
    //         const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/` })
    //         const active = response.data.filter(ch => ch.is_active === true)
    //         setChallengeList(active)

    //         const inActive = response.data.filter(ch => ch.is_active === false)
    //         setInactiveChallenges(inActive)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    function getAllChallenges() {
        try {
            const active = challenges.filter(ch => ch.is_active === true);
            const inActive = challenges.filter(ch => ch.is_active === false);

            setChallengeList(active);
            setInactiveChallenges(inActive);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (challenges?.length) {
            getAllChallenges()
        }
    }, [challenges])

    return (
        <div className='challenges-page'>
            <div className='circle1'></div>
            <div className='circle2'></div>
            <div className='circle3'></div>
            <div className='circle4'></div>
            <div className='header-challenges'>
                <h1 className='page-title'>Challenges</h1>
                <div>
                    <ChallengeForm title="Add a Challenge" className={'add-challenge'}><IoIosAddCircle size={30} /></ChallengeForm>
                    <Link to={'/challenges/join'} title="Search for Challenge"><FaSearch size={30} /></Link>
                </div>
            </div>
            <hr />

            {/* on going Challenges  */}
            <div className='header-challenges sub'>
                <h2 className='page-sub-title'>Ongoing</h2>
                <div>
                    <JoinChallenge className='join-btn' />
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
                                        return <ChallengeCard challenge={challenge} key={challenge.id} />
                                    })
                                }
                            </>
                            :
                            <>
                                <h2>you have no challenges yet! </h2>
                                <ChallengeForm title="Add a Challenge" getAllChallenges={getAllChallenges} >Create a challenge now!</ChallengeForm>
                            </>
                        :
                        <div id='loader-div'>
                            <span className="loader"></span>
                        </div>
                }
            </div>

            {/* Done challenges  */}
            <div className='header-challenges sub'>
                <h2 className='page-sub-title'>Done</h2>
            </div>
            <div className='challenges'>
                {
                    inActiveChallenges
                        ?
                        inActiveChallenges.length
                            ?
                            <>
                                {
                                    inActiveChallenges.map(challenge => {
                                        return <ChallengeCard challenge={challenge} key={challenge.id} className='inactive' />
                                    })
                                }
                            </>
                            :
                            <>
                                <h2>none of your challenges has been done yet! </h2>
                                <ChallengeForm title="Add a Challenge" >Create a challenge now!</ChallengeForm>
                            </>
                        :
                        <div id='loader-div'>
                            <span className="loader"></span>
                        </div>

                }
            </div>
        </div>
    )
}

export default ChallengeList
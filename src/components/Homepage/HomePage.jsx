import React, { useContext, useEffect, useState } from 'react'
import './homepage.sass'
import { UserContext } from '../../App'
import { authRequest } from '../../lib/auth'

function HomePage() {
    const { user, setUser } = useContext(UserContext)
    const [challengesList, setChallengeList] = useState([])
    const [goalsCompleted, setGoalsCompleted] = useState([])

    async function getAllChallenges() {
        try {
            const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/` })
            setChallengeList(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getCompletedGoals() {
        try {
            const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/goals/completed/` })
            setGoalsCompleted(response.data)
        } catch (error) {
            console.log(error)
            // setErrors(error.response.data.error)
        }
    }
    useEffect(() => {
        if (user?.user?.id) {
            getAllChallenges()
            getCompletedGoals()
        }
    }, [])
    return (
        <div className='homepage'>
            <div className='circle1'></div>
            <div className='circle2'></div>
            <div className='circle3'></div>
            <div className='circle4'></div>
            {user.user ?
                <>
                    <h1>Welcome {user?.user?.first_name}!</h1>
                    <div className='cards'>

                        <div className='card first'>
                            <h2>{user.total_points}</h2>
                            <h2>Total Points</h2>
                        </div>

                        <div className='card second'>
                            <h2>{user.wins_count}</h2>
                            <h2>Wins</h2>
                        </div>

                        <div className='card third'>
                            <h2>{user.total_goals_completed}</h2>
                            <h2>Goals Completed</h2>
                        </div>

                        <div className='card fourth'>
                            <h2>{user.total_challenges_joined}</h2>
                            <h2>Challenges</h2>
                        </div>

                    </div>

                    <div className='bottom-cards'>
                        <div className='bottom-card card'>
                            <h2>All Challenges</h2>
                            <hr />
                            {
                                challengesList.length
                                    ?
                                    <ul>
                                        {
                                            challengesList.map((challenge, index) => {
                                                return (
                                                    <li key={challenge.id}>
                                                        <span>{index + 1}</span>
                                                        {challenge.name}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    :
                                    <div id='loader-div'>
                                        <span className="loader"></span>
                                    </div>
                            }
                        </div>
                        <div className='bottom-card card'>
                            <h2>Your Last 5 Completed Goals</h2>
                            <hr />
                            {
                                goalsCompleted.length
                                    ?
                                    <ul>
                                        {
                                            goalsCompleted.map(goal => {
                                                return (<li key={goal.id}>{goal.goal_detail.title}</li>)
                                            })
                                        }
                                    </ul>
                                    :
                                    <div id='loader-div'>
                                        <span className="loader"></span>
                                    </div>

                            }
                        </div>
                    </div>
                </>
                :
                <div id='loader-div'>
                    <span className="loader"></span>
                </div>
            }
        </div>
    )
}

export default HomePage
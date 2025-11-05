import React, { use, useContext, useEffect, useState } from 'react'
import './homepage.sass'
import { UserContext } from '../../App'
import { authRequest } from '../../lib/auth'
import { RiCopperCoinFill } from "react-icons/ri";
import { IoIosTrophy } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import { GiPodiumWinner } from "react-icons/gi";
import { Link } from 'react-router';

function HomePage({ challenges }) {
    const { user, setUser } = useContext(UserContext)
    const [goalsCompleted, setGoalsCompleted] = useState(null)
    const [challengesList, setChallengeList] = useState(null)
    console.log(goalsCompleted)
    async function getCompletedGoals() {
        try {
            const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/goals/completed/` })
            setGoalsCompleted(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (user?.user?.id) {
            getCompletedGoals()
        }
        if (challenges?.length) {
            setChallengeList(challenges)
        }
    }, [])

    // to get how many day ago was the goal completed
    function getDaysAgo(dateString) {
        const completionDate = new Date(dateString)
        const today = new Date()
        const diffTime = today - completionDate
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 0) {
            return "Today"
        } else if (diffDays === 1) {
            return "Yesterday"
        } else if (diffDays < 30) {
            return `${diffDays} days ago`
        } else { // if it was more that a month i wont specifiy
            return "A long time ago"
        }
    }

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
                            <h2 className='number'>
                                <RiCopperCoinFill size={30} className='icon' />
                                {user.total_points}
                                <RiCopperCoinFill size={30} className='icon' />
                            </h2>
                            <h2>Total Points</h2>
                        </div>

                        <div className='card second'>
                            <h2 className='number'>
                                <IoIosTrophy size={33} className='icon' />
                                {user.wins_count}
                                <IoIosTrophy size={33} className='icon' />

                            </h2>
                            <h2>Wins</h2>
                        </div>

                        <div className='card third'>
                            <h2 className='number'>
                                <TbTargetArrow size={30} className='icon' />
                                {user.total_goals_completed}
                                <TbTargetArrow size={30} className='icon' />
                            </h2>
                            <h2>Goals Completed</h2>
                        </div>

                        <div className='card fourth'>
                            <h2 className='number'>
                                <GiPodiumWinner size={30} className='icon' />
                                {user.total_challenges_joined}
                                <GiPodiumWinner size={30} className='icon' />
                            </h2>
                            <h2>Challenges</h2>
                        </div>

                    </div>

                    <div className='bottom-cards'>
                        <div className='all-challenges card'>
                            <h2>All Challenges</h2>
                            <hr />
                            {
                                challengesList
                                    ?
                                    challengesList?.length
                                        ?
                                        <ul>
                                            {
                                                challengesList.map((challenge, index) => {
                                                    return (
                                                        <div className='challenge-item'>
                                                            <span className='index'>{index + 1}</span>
                                                            <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
                                                                <li>
                                                                    {challenge.name}
                                                                </li>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </ul>
                                        :
                                        <h3>No challenges yet!</h3>
                                    :
                                    <div id='loader-div'>
                                        <span className="loader"></span>
                                    </div>
                            }
                        </div>
                        <div className='all-completed-goals card'>
                            <h2>Your Last 5 Completed Goals</h2>
                            <hr />
                            {
                                goalsCompleted ?
                                    goalsCompleted?.length
                                        ?
                                        <ul>
                                            {
                                                goalsCompleted.map(goal => {
                                                    return (
                                                        <div className='completed-goal-item'>
                                                            <li key={goal.id}>
                                                                {goal.goal_detail.title}
                                                                <p>{challenges.find(ch => ch.id==goal.goal_detail.challenge).name}</p>
                                                            </li>
                                                            <span className='date'>{getDaysAgo(goal.completion_date)}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </ul>
                                        :
                                        <h3>No completed goals!</h3>
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
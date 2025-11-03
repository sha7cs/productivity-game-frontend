import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import { authRequest } from '../../lib/auth'
import './challenge-detail.sass'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import SingleGoal from './SingleGoal'
import MembersRank from './MembersRank'
import { UserContext } from '../../App'
import { useContext } from 'react'
import { IoIosAddCircle } from "react-icons/io";

function ChallengeDetail({ }) {
    const { user, getUserProfile } = useContext(UserContext)
    const { challengeId } = useParams()
    const [errors, setErrors] = useState('')
    const navigate = useNavigate();

    const [challenge, setChallenge] = useState({
        "members": [],
        "goals": [],
        "name": "",
        "description": "",
        "start_date": "",
        "end_date": "",
        "join_code": "",
        "is_active": true,
        "created_by": '',
        "winner": null
    })
    const [members, setMembers] = useState([])
    const [member, setMember] = useState([])
    const [goalsCompleted, setGoalsCompleted] = useState([]) // to make the goals user completed at the bottom of the list

    async function getSingleChallenge() {
        try {
            const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/` })
            setChallenge(response.data)

            getUserProfile() // to update total_points in user info

            const sortedMembers = [...response.data.members].sort((a, b) => b.total_points - a.total_points)
            setMembers(sortedMembers)

            setMember(response.data.members.find(m => m.user === user.user.id)) // to dynamically update the points

            return response.data
        } catch (error) {
            console.log(error)
            // setErrors(error.response.data.error)
        }
    }

    async function getCompletedGoals() {
        try {
            const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/goals/complete/` })
            setGoalsCompleted(response.data)
        } catch (error) {
            console.log(error)
            // setErrors(error.response.data.error)
        }
    }

    useEffect(() => {
        if (user?.user?.id) { // dont get the challenge unless you make sure you got the user
            getSingleChallenge()
        }
        getCompletedGoals()
    }, [])

    function getDaysRemaining(endDate) {
        const today = new Date();
        const end = new Date(endDate);
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert ms to days
        return diffDays > 0 ? diffDays : 0;
    }

    async function handleOnComplete() {
        await getSingleChallenge()
        await getUserProfile()
        await getCompletedGoals() 
    }

    if (errors) {
        return (
            <div>
                <h3>{errors}</h3>
            </div>
        )
    }
    return (
        <>
            {challenge.name != ""
                ?
                <>
                    <div className='challenge-detail-header'>
                        <button onClick={() => navigate(-1)} className='back-btn'><IoArrowBack size={30} /></button>
                        <h1>{challenge.name}</h1>
                        <div className='actions'>
                            {/* i might change them and make it ine button for edit and the delete is inside it  */}
                            <Link to={`/challenges/${challengeId}/edit`}><button><FaEdit size={20} /></button></Link>
                            <Link to={`/challenges/${challengeId}/confirm-delete`}><button style={{ backgroundColor: 'red', color: 'white' }}><MdDelete size={20} /></button></Link>
                        </div>
                    </div>

                    <div className='challenge-detail-card'>
                        {/* i need to make a component for a single goal? */}
                        <div className='goals'>
                            <div className='title'>
                                <h3>Goals</h3>
                                <Link to={`/challenges/${challenge.id}/add-goal`}><button className='add-goal'><IoIosAddCircle size={35} color='#4cd964'/></button></Link>
                            </div>
                            {
                                challenge.goals.length
                                    ?
                                    <ul>
                                        {
                                            challenge.goals.map(goal => (
                                                (<SingleGoal goal={goal} key={goal.id} handleOnComplete={handleOnComplete} completed={goalsCompleted.some(g => g.goal_detail.id === goal.id) ? 'completed' : ''} />)
                                            ))
                                        }
                                    </ul>
                                    :
                                    'No assigned goals yet'
                            }
                            <Link to={`/challenges/${challenge.id}/add-goal`}><button className='add-goal'>Add Goal</button></Link>
                        </div>

                        <div className='challenge-details'>
                            <div className='points'>
                                <h3>Your points</h3>
                                <h4>{member ? member.total_points : 0}</h4>
                            </div>

                            <div className='members'>
                                <h3>Members Rank</h3>
                                {
                                    members.length
                                        ?
                                        <MembersRank members={members} />
                                        :
                                        'No assigned members yet'
                                }
                            </div>

                            <div className='day-remaining'>
                                <h3>Days Remaining</h3>
                                <h3>⏰ {getDaysRemaining(challenge.end_date)} days ⏰</h3>
                            </div>

                            {/* i want to make a page that will list all the goals you and the members completed based on date  */}
                            <a href="">History</a>

                            {/* just for now i will make it hidden but i will create a modal for ot later */}
                            <div className='challenge-info' hidden>
                                <h3>{challenge.description}</h3>
                                <h3>Join Code : {challenge.join_code}</h3>
                                <h3>created by you</h3>
                                <h3>{challenge.winner == null ? "no winner yet" : challenge.winner}</h3>
                                <h3>{challenge.is_active ? 'is active' : 'this challenge has ended'}</h3>
                            </div>
                            {/* i need to make a component for a single goal? */}
                        </div>
                    </div>
                </>
                :
                <h3>Loading ...</h3>
            }
        </>
    )
}

export default ChallengeDetail
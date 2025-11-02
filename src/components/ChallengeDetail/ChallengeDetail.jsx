import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import { authRequest } from '../../lib/auth'
import './challenge-detail.sass'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

function ChallengeDetail() {
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

    async function getSingleChallenge() {
        try {
            const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/` })
            setChallenge(response.data)
            return response.data
        } catch (error) {
            setErrors(error.response.data.error)
        }
    }

    useEffect(() => {
        getSingleChallenge()
    }, [])

    function getDaysRemaining(startDate, endDate) {
        const today = new Date();
        const end = new Date(endDate);
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert ms to days
        return diffDays > 0 ? diffDays : 0;
    }
    function handleGoalCheck(goalId) {
        console.log('check a goal')
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
                        <button onClick={() => navigate(-1)} className='back-btn'><IoArrowBack size={30}/></button>
                        <h1>{challenge.name}</h1>
                        <div className='actions'>
                             {/* i might change them and make it ine button for edit and the delete is inside it  */}
                            <Link to={`/challenges/${challengeId}/edit`}><button><FaEdit size={20}/></button></Link> 
                            <Link to={`/challenges/${challengeId}/confirm-delete`}><button style={{ backgroundColor:'red', color: 'white' }}><MdDelete size={20} /></button></Link>
                        </div>
                    </div>
                    <div className='challenge-detail-card'>
                        {/* i need to make a component for a single goal? */}
                        <div className='goals'>
                            <h3>Goals</h3>
                            {
                                challenge.goals.length
                                    ?
                                    <ul>
                                        {
                                            challenge.goals.map(goal => {
                                                return (
                                                    <li key={`goal-${goal.id}`} className='goal-item'>
                                                        <div className="goal-content">
                                                            <div className='goal-header'>
                                                                <span className="goal-title">{goal.title}</span>
                                                                <Link to={`/challenges/${challenge.id}/edit-goal/${goal.id}`}><FaEdit size={20} color='#a6a6a6'/></Link>
                                                            </div>
                                                            <p className="goal-description">
                                                                {goal.description}
                                                            </p>
                                                        </div>
                                                        <input
                                                            type="checkbox"
                                                            className="goal-checkbox"
                                                            onChange={() => handleGoalCheck(goal.id)}
                                                        />

                                                        {/* <Link to={`/challenges/${challenge.id}/delete-goal/${goal.id}`}><button style={{ color: 'red' }}>Delete</button></Link> */}
                                                    </li>
                                                )
                                            })
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
                                <h4>23</h4>
                            </div>
                            <div className='members'>
                                <h3>Members Rank</h3>
                                {
                                    challenge.members.length
                                        ?
                                        <ul>
                                            {
                                                challenge.members.map(member => {
                                                    return <li key={`member-${member.id}`}>{member.user}</li>
                                                    // will display them based on their rank
                                                })
                                            }
                                        </ul>
                                        :
                                        'No assigned members yet'
                                }
                            </div>
                            <div className='day-remaining'>
                                <h3>Days Remaining</h3>
                                <h3>⏰ {getDaysRemaining(challenge.start_date, challenge.end_date)} days ⏰</h3>
                            </div>
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
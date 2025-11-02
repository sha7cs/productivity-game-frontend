import React, { useContext, useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router';
import { authRequest } from '../../lib/auth';
import { UserContext } from '../../App';

function SingleGoal({goal , handleOnComplete}) {
    const [completedGoals, setCompletedGoals] = useState([])
    const { user, getUserProfile } = useContext(UserContext)

    async function handleGoalCheck(goalId) {
        try {
            const response = await authRequest({ method: 'post', url: `http://127.0.0.1:8000/api/challenges/${goal.challenge}/goals/${goal.id}/complete/` })
            handleOnComplete()
        } catch(errors){
            console.log(errors)
        }
    }
    // i will use this to get the completed goals
    async function getCompletedGoals() {
        try {
            const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/${goal.challenge}/goals/complete/`})
            response.data.length ? setCompletedGoals(response.data):''
            console.log(response.data)
        } catch(errors){
            console.log(errors)
        }
    }

    useEffect(()=>{
        getCompletedGoals()
    },[])

    return (
        <li key={`goal-${goal.id}`} className='goal-item'>
            <div className="goal-content">
                <div className='goal-header'>
                    <span className="goal-title">{goal.title}</span>
                    <Link to={`/challenges/${goal.challenge}/edit-goal/${goal.id}`}><FaEdit size={20} color='#a6a6a6' /></Link>
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
}

export default SingleGoal
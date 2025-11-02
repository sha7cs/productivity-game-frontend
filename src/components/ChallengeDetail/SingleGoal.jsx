import React from 'react'
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router';

function SingleGoal({goal}) {

     function handleGoalCheck(goalId) {
        console.log('check a goal')
    }

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
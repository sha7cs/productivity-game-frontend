import React, { useContext, useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { authRequest } from '../../lib/auth';
import GoalForm from '../GoalForm/GoalForm';

function SingleGoal({goal , handleOnComplete, completed}) {

    async function handleGoalCheck(goalId) {
        try {
            await authRequest({ method: 'post', url: `http://127.0.0.1:8000/api/challenges/${goal.challenge}/goals/${goal.id}/complete/` })
            handleOnComplete()
        } catch(errors){
            console.log(errors)
        }
    }

    return (
        <li key={`goal-${goal.id}`} className={`goal-item ${completed}`}>
            <div className="goal-content">
                <div className='goal-header'>
                    <span className="goal-title">{goal.title}</span>
                    <GoalForm handleOnComplete={handleOnComplete}challengeId={goal.challenge} goalId={goal.id} disabled={completed === 'completed'} className={'edit-goal'}><FaEdit size={20} color='#a6a6a6'/></GoalForm>
                </div>
                <p className="goal-description">
                    {goal.description}
                </p>
            </div>
            <input
                type="checkbox"
                className="goal-checkbox"
                // to make it unclickable and checked by default if it is already completed 
                checked={completed === 'completed'} 
                disabled={completed === 'completed'}
                onChange={() => handleGoalCheck(goal.id)}
            />
        </li>
    )
}

export default SingleGoal
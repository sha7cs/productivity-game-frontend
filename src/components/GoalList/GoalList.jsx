import React, { useState, useContext, useEffect } from 'react'
import GoalForm from '../GoalForm/GoalForm'
import SingleGoal from './SingleGoal'
import { IoIosAddCircle } from "react-icons/io";
import { UserContext } from '../../App';
import { authRequest } from '../../lib/auth';

function GoalList({ getSingleChallenge, challengeId, challenge }) {
    const { user, getUserProfile } = useContext(UserContext)
    const [goalsCompleted, setGoalsCompleted] = useState([]) // to make the goals user completed at the bottom of the list

    async function getCompletedGoals() {
        try {
            const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/goals/complete/` })
            setGoalsCompleted(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function handleOnComplete() {
        await getSingleChallenge()
        await getUserProfile()
        await getCompletedGoals()
    }
    useEffect(() => {
        getCompletedGoals()
    })
    return (
        <div className='goals'>
            <div className='title'>
                <h3>Goals</h3>
                <GoalForm challengeId={challengeId} className={'add-goal'} title='Add Goal'>
                    <div className='add-goal-div'>
                        <IoIosAddCircle size={35} className='icon' />
                    </div>
                </GoalForm>
            </div>
            {
                challenge.goals.length
                    ?
                    <ul>
                        {//(<SingleGoal goal={goal} key={goal.id} handleOnComplete={handleOnComplete} completed={goalsCompleted.some(g => g.goal_detail.id === goal.id) ? 'completed' : ''} />)
                            [...challenge.goals]
                                .sort((a, b) => {
                                    const aCompleted = goalsCompleted.some(g => g.goal_detail.id === a.id);
                                    const bCompleted = goalsCompleted.some(g => g.goal_detail.id === b.id);

                                    if (aCompleted && !bCompleted) return 1; // a after b
                                    if (!aCompleted && bCompleted) return -1;  // b after a
                                    return 0; // same group // so this sortes them to make the uncompleted ones first in the list so they are displayed at the top
                                }).map(goal => (
                                    (<SingleGoal goal={goal} key={goal.id} handleOnComplete={handleOnComplete} completed={goalsCompleted.some(g => g.goal_detail.id === goal.id) ? 'completed' : ''} />)
                                ))
                        }
                    </ul>
                    :
                    <div className='no-goals'>
                        <h2>No assigned goals yet</h2>
                        <GoalForm challengeId={challengeId} className='add-goal' title='Add Goal'>
                            Click here to make a new goal!
                        </GoalForm>
                    </div>
            }
        </div>
    )
}

export default GoalList
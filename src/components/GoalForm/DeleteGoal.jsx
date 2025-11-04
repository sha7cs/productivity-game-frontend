import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { useEffect } from 'react'
import { authRequest } from '../../lib/auth'
import CustomModal from '../CustomModal/CustomModal'

function DeleteGoal({challengeId,goalId}) {
    const [goal, setGoal] = useState({})
    const navigate = useNavigate()
    const [errors, setErrors] = useState('')
    const [Open, setOpen] = useState(false)


    async function getGoal() {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/goals/${goalId}/` })
        setGoal(response.data)
    }

    useEffect(() => {
        getGoal()
    }, [])

    async function deleteGoal(event) {
        try {
            event.preventDefault()
            const response = await authRequest({ method: 'delete', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/goals/${goalId}/` })
            navigate(`/challenges/${challengeId}`) // when returning for frontend i want to send a message to next page how?
        } catch (error) {
            setErrors(error.response.data.error)
        }
    }

    if (errors) {
        return (
            <div>
                <h3>{errors}</h3>
            </div>
        )
    }
    return (
        <div>
            <button style={{backgroundColor:'red'}} onClick={() => setOpen(true)}>Delete Goal</button>
            <CustomModal isOpen={Open} onClose={() => setOpen(false)}>
                <div className='header'> 
                    Confirm Delete
                    <hr />
                </div>
                <div className='content-modal'>
                    Are you sure you want to delete "{goal.title}" goal?
                  <button onClick={deleteGoal}>Yes</button>
                </div>
            </CustomModal>
        </div>
    )
}

export default DeleteGoal
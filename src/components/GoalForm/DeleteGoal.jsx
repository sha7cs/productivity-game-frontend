import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { useEffect } from 'react'
import { authRequest } from '../../lib/auth'

function DeleteGoal() {
    const { challengeId, goalId } = useParams()
    const [goal, setGoal] = useState({})
    const navigate = useNavigate()
    const [errors, setErrors] = useState('')


    async function getGoal() {
        const response = await authRequest({method:'get',url:`http://127.0.0.1:8000/api/challenges/${challengeId}/goals/${goalId}/`})
        setGoal(response.data)
    }

    useEffect(() => {
        getGoal()
    }, [])

    async function deleteGoal(event) {
        try {
            event.preventDefault()
            const response = await authRequest({method:'delete',url:`http://127.0.0.1:8000/api/challenges/${challengeId}/goals/${goalId}/`})
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
            <h1> Are you sure you want to delete "{goal.title}" goal?</h1>
            <button onClick={deleteGoal}>Yes</button>
        </div>
    )
}

export default DeleteGoal
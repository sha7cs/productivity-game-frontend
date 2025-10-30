import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authRequest } from '../../lib/auth'

function DeleteChallenge() {
    const { challengeId } = useParams()
    const [challenge, setChallenge] = useState({})
    const navigate = useNavigate()
    const [errors, setErrors] = useState('')


    async function getChallenge() {
        const response = await authRequest({method:'get',url:`http://127.0.0.1:8000/api/challenges/${challengeId}/`})
        setChallenge(response.data)
    }

    useEffect(() => {
        getChallenge()
    }, [])

    async function deleteChallenge(event) {
        try {
            event.preventDefault()
            const response = await authRequest({method:'delete',url:`http://127.0.0.1:8000/api/challenges/${challengeId}/`})
            navigate(`/challenges`) 
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
            <h1> Are you sure you want to delete "{challenge.name}" challenge?</h1>
            <button onClick={deleteChallenge}>Yes</button>
        </div>
    )
}

export default DeleteChallenge
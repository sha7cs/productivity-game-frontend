import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authRequest } from '../../lib/auth'
import CustomModal from '../CustomModal/CustomModal'

function DeleteChallenge({ children, challengeId, style }) {
    const [challenge, setChallenge] = useState({})
    const navigate = useNavigate()
    const [errors, setErrors] = useState('')
    const [open, setOpen] = useState(false)


    async function getChallenge() {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/` })
        setChallenge(response.data)
    }

    useEffect(() => {
        getChallenge()
    }, [])

    async function deleteChallenge(event) {
        try {
            event.preventDefault()
            const response = await authRequest({ method: 'delete', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/` })
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
            <button style={style} onClick={() => setOpen(true)}>{children}</button>
            <CustomModal isOpen={open} onClose={() => setOpen(false)}>
                <div className='header'>
                    Confirm Delete
                    <hr />
                </div>
                <div className='content-modal'>
                    <h2> Are you sure you want to delete "{challenge.name}" challenge?</h2>
                    <button onClick={deleteChallenge}>Yes</button>
                </div>
            </CustomModal>
        </div>
    )
}

export default DeleteChallenge
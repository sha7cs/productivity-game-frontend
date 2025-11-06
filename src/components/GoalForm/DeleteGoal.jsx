import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { useEffect } from 'react'
import { authRequest } from '../../lib/auth'
import CustomModal from '../CustomModal/CustomModal'
import toast from 'react-hot-toast'

function DeleteGoal({ handleOnComplete, challengeId, goalId, show, onClose }) {
    const [goal, setGoal] = useState({})
    const [open, setOpen] = useState(show)

    useEffect(() => {
        setOpen(show)
    })

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
            await authRequest({ method: 'delete', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/goals/${goalId}/` })
            handleOnComplete()
            toast.success('Goal is deleted')
        } catch (error) {
            toast.error('Goal was not deleted')
        }
    }

    return (
        <div>
            <CustomModal isOpen={open} onClose={() => {
                setOpen(false)
                onClose()
            }}>
                <div className='header'>
                    Confirm Delete
                    <hr />
                </div>
                <div className='content-modal'>
                    Are you sure you want to delete "{goal.title}" goal?
                    <button style={{ backgroundColor: 'red' }} onClick={deleteGoal}>Yes</button>
                </div>
            </CustomModal>
        </div>
    )
}

export default DeleteGoal
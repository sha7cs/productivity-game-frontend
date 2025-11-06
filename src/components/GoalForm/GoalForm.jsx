import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authRequest } from '../../lib/auth'
import CustomModal from '../CustomModal/CustomModal'
import DeleteGoal from './DeleteGoal'
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import { UserContext } from '../../App'

function GoalForm({ challengeId, goalId, className, children, handleOnComplete }) {
    const [Open, setOpen] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        points: 0,
        description: '',
        challenge: challengeId
    })

    async function getGoal() {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/goals/${goalId}/` })
        setFormData(response.data)
    }
    
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    async function handleSubmit(event) {
        try {
            event.preventDefault()
            let response = {}
            if (goalId) {
                response = await authRequest({ method: 'put', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/goals/${goalId}/`, data: formData })
            } else {
                response = await authRequest({ method: 'post', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/goals/`, data: formData })
                setFormData({
                    title: '',
                    points: 0,
                    description: '',
                    challenge: challengeId
                })
            }
            if (response.status === 201 || response.status === 200) {
                setOpen(false)
                handleOnComplete()
                response.status === 200 ? toast.success('Goal has been updated!') : toast.success('Goal has been created!')
            }
        } catch (error) {
            console.log(error)
            const firstError = Object.keys(error.response?.data)[0] + ": " + Object.values(error.response?.data)[0]
            toast.error(firstError || 'failed. Please try again.')
        }
    }
    
    useEffect(() => {
        if (goalId) {
            getGoal()
        }
    }, [])
    // for the delete button in edit modal
    function openDelete() {
        setOpen(false)
        setShowDelete(true)
    }
    function closeDelete() {
        setShowDelete(false)
    }
    return (
        <>
            <button className={className} onClick={() => setOpen(true)}>{children}</button>
            {showDelete && (<DeleteGoal handleOnComplete={handleOnComplete} show={showDelete} onClose={closeDelete} challengeId={challengeId} goalId={goalId}></DeleteGoal>)}

            <CustomModal isOpen={Open} onClose={() => setOpen(false)}>
                <div className='header'>
                    {goalId ? "Edit Goal" : "Add Goal"}
                    <hr />
                </div>
                <form onSubmit={handleSubmit} className='content-modal'>
                    <div className='goal-title-div'>
                        <label htmlFor="title">Goal title</label>
                        <input value={formData.title} onChange={handleChange} type="text" name="title" id="title" />
                    </div>

                    <div className='goal-points-div'>
                        <label htmlFor="points">points</label>
                        <input value={formData.points} onChange={handleChange} type="number" name="points" id="points" />
                    </div>

                    <div className='goal-description-div'>
                        <label htmlFor="description">description</label>
                        <textarea value={formData.description} onChange={handleChange} type="text" name="description" id="description" />
                    </div>
                    <div id='modal-form-actions'>
                        {goalId ?
                            <button type='submit'
                                style={{ backgroundColor: 'red' }}
                                onClick={() => {
                                    setOpen(false)
                                    openDelete()
                                }}>
                                <MdDelete />
                            </button>
                            :
                            null
                        }
                        <button type='submit'>{goalId ? "Edit Goal" : "Add Goal"}</button>
                    </div>
                </form>
            </CustomModal>
        </>
    )
}

export default GoalForm
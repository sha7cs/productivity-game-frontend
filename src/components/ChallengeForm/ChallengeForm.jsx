import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { authRequest } from '../../lib/auth'
import { UserContext } from '../../App'
import CustomModal from '../CustomModal/CustomModal'
import DeleteChallenge from './DeleteChallenge'
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';

function ChallengeForm({ children, challengeId, className, getSingleChallenge, getAllChallenges }) {
    const { user , fetchChallenges} = useContext(UserContext)
    const [Open, setOpen] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        created_by: user.user ? user.user?.id : '',
        winner: null
    })
    async function getChallenge() {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/` })
        setFormData(response.data)
    }

    useEffect(() => {
        if (challengeId) {
            getChallenge()
        }
    }, [])
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            let response = {}
            if (challengeId) {
                response = await authRequest({ method: 'put', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/`, data: formData })
                await getSingleChallenge()
            } else {
                response = await authRequest({ method: 'post', url: 'http://127.0.0.1:8000/api/challenges/', data: formData })
                fetchChallenges()
            }
            if (response.status === 201 || response.status === 200) {
                setOpen(false)
                response.status === 200 ? toast.success('Challenge has been updated!') : toast.success('Challenge has been created!')
            }
        } catch (error) {
            // because the error is an array ob objects i had to do this to get more infrmation about the errors
            const firstError = Object.keys(error.response.data)[0]+": " + Object.values(error.response.data)[0]
            toast.error(firstError || 'failed. Please try again.')
        }
    }
    // when creating a challenge i want a pop to display the join code 
    // maybe for a certain time? or i should make it until user closes it ? will see
    return (
        <>
            <button className={className} onClick={() => setOpen(true)}>{children}</button>
            <CustomModal isOpen={Open} onClose={() => setOpen(false)}>
                <div className='header'>
                    {challengeId ? `Edit "${formData.name}"` : "Add a Challenge"}
                    <hr />
                </div>
                <form onSubmit={handleSubmit} className='content-modal'>

                    <div className='challenge-name-form'>
                        <label htmlFor="name">Name</label>
                        <input value={formData.name} onChange={handleChange} type="text" name="name" id="name" />
                    </div>

                    <div className='challenge-description-form'>
                        <label htmlFor="description">description</label>
                        <textarea value={formData.description} onChange={handleChange} type="text" name="description" id="description" />
                    </div>

                    <div className='challenge-start_date-form'>
                        <label htmlFor="start_date">Start Date</label>
                        <input value={formData.start_date} onChange={handleChange} type="date" name="start_date" id="start_date" />
                    </div>

                    <div className='challenge-end_date-form'>
                        <label htmlFor="end_date">End Date</label>
                        <input value={formData.end_date} onChange={handleChange} type="date" name="end_date" id="end_date" />
                    </div>
                    {challengeId ?
                        <DeleteChallenge challengeId={challengeId} style={{ backgroundColor: 'red', color: 'white' }}><MdDelete size={20} /></DeleteChallenge>
                        :
                        ''
                    }
                    <button type='submit'>{challengeId ? `Edit "${formData.name}"` : "Add a Challenge"}</button>
                </form>
            </CustomModal>
        </>
    )
}

export default ChallengeForm
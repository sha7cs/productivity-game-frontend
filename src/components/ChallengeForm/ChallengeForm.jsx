import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { authRequest } from '../../lib/auth'
import { UserContext } from '../../App'
import CustomModal from '../CustomModal/CustomModal'

function ChallengeForm({children, challengeId , className}) {
    const { user } = useContext(UserContext)
    // const { challengeId } = useParams()
    const [errors, setErrors] = useState('')
    const [Open, setOpen] = useState(false)


    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        created_by: user.user ? user.user.id : '',
    })

    async function getChallenge() {
        const response = await authRequest({method:'get',url:`http://127.0.0.1:8000/api/challenges/${challengeId}/`})
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
            } else {
                response = await authRequest({ method: 'post', url: 'http://127.0.0.1:8000/api/challenges/', data: formData })
            }
            if (response.status === 201 || response.status === 200) {
                navigate(`/challenges/${response.data.id}`)
            }
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.error)
        }
    }
    // when creating a challenge i want a pop to display the join code 
    // maybe for a certain time? or i should make it until user closes it ? will see

    if (errors) {
        return <h1>{errors}</h1>
    }
    return (
        <>
            <button className={className} onClick={() => setOpen(true)}>{children}</button>
            <CustomModal isOpen={Open} onClose={() => setOpen(false)}>
                <h2>{challengeId ? `Edit "${formData.name}"` : "Add a Challenge"}</h2>
                <form onSubmit={handleSubmit}>

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
                    <button type='submit'>{challengeId ? `Edit "${formData.name}"` : "Add a Challenge"}</button>
                </form>
            </CustomModal>
        </>
    )
}

export default ChallengeForm
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'

function ChallengeForm({ user }) {
    const { challengeId } = useParams()
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        created_by: user ? user.user_id : '',
    })

    async function getChallenge() {
        const response = await axios.get(`http://127.0.0.1:8000/api/challenges/${challengeId}/`)
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
                response = await axios.put(`http://127.0.0.1:8000/api/challenges/${challengeId}/`, formData)
            } else {
                response = await axios.post('http://127.0.0.1:8000/api/challenges/', formData)
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
        <div>
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
        </div>
    )
}

export default ChallengeForm
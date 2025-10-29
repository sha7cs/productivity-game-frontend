import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
// "name": "SDA bootcamp",
//     "description": "something descriptive",
//     "start_date": "2025-10-26",
//     "end_date": "2025-11-10",
//     "join_code": "59462",
//     "is_active": true,
//     "created_by": 1,
//     "winner": null

function ChallengeForm({user}) {

    const [formData, setFormData] = useState({
        name:'',
        description:'',
        start_date:'',
        end_date:'',
        created_by:user.user_id,
    })
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/challenges/', formData)
            navigate(`/challenges/${response.data.id}`)
        } catch(error) {
            console.log(error)
            setErrors(error.response.data.error)
        }
    }
    return (
        <div>
            <h2>Add Challenge</h2>
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
                <button type='submit'>Add Challenge</button>
            </form>
        </div>
    )
}

export default ChallengeForm
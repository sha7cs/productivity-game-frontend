import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
// {
//     "title": "ask a question",
//     "points": 7,
//     "description": "someeething",
//     "created_at": "2025-10-26",
//     "challenge": 1
// }

function GoalForm() {
    const { challengeId } = useParams()
    const [errors, setErrors] = useState('')

    const [formData, setFormData] = useState({
        title: '',
        points: 0,
        description: '',
        challenge: challengeId
    })

    const navigate = useNavigate()
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        console.log(formData)
    }
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/challenges/${challengeId}/goals/`, formData)
            if (response.status === 201 || response.status === 200) {
                navigate(`/challenges/${challengeId}`)
            }
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
            <form on onSubmit={handleSubmit}>
                <div className='goal-title-div'>
                    <label htmlFor="title">Goal title</label>
                    <input onChange={handleChange} type="text" name="title" id="title" />
                </div>

                <div className='goal-points-div'>
                    <label htmlFor="points">points</label>
                    <input onChange={handleChange} type="number" name="points" id="points" />
                </div>

                <div className='goal-description-div'>
                    <label htmlFor="description">description</label>
                    <textarea onChange={handleChange} type="text" name="description" id="description" />
                </div>

                <button type='submit'>Add Goal</button>
            </form>
        </div>
    )
}

export default GoalForm
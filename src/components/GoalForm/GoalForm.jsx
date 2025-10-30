import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authRequest } from '../../lib/auth'

function GoalForm() {
    const { challengeId , goalId} = useParams()
    const [errors, setErrors] = useState('')

    const [formData, setFormData] = useState({
        title: '',
        points: 0,
        description: '',
        challenge: challengeId
    })

    const navigate = useNavigate()

    async function getGoal(){
        const response = await authRequest({method:'get',url:`http://127.0.0.1:8000/api/challenges/${challengeId}/goals/${goalId}/`})
        setFormData(response.data)
    }

    useEffect(()=>{
        if(goalId){
            getGoal()
        }
    },[])

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    async function handleSubmit(event) {
        try {
            event.preventDefault()
            let response = {}
            if(goalId){
                response = await authRequest({method:'put',url:`http://127.0.0.1:8000/api/challenges/${challengeId}/goals/${goalId}/`, data:formData})
            }else{
                response = await authRequest({method:'post',url:`http://127.0.0.1:8000/api/challenges/${challengeId}/goals/`, data:formData})
            }
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
            <h1>{goalId? "Edit Goal" : "Add Goal"}</h1>
            <form onSubmit={handleSubmit}>
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

                <button type='submit'>{goalId? "Edit Goal" : "Add Goal"}</button>
            </form>
        </div>
    )
}

export default GoalForm
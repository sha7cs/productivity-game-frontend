import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

function JoinChallenge({user}) {
    const [joinCode, setJoinCode] = useState('')
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()
    
    function handleChange(event) {
        setJoinCode(event.target.value)
        console.log(event.target.value)
    }

    async function handleSubmit(event){
        event.preventDefault()
        try{
            const response = await axios.post(`http://127.0.0.1:8000/api/challenges/join/${user.user_id}/`,{ joinCode:joinCode })
            if(response.status === 201){
                navigate(`/challenges/${response.data.challenge}`)
            }
        } catch(error){
            setErrors(error.response.data.error)
        }
    }
    
    if(errors){
        return <h2>{errors}</h2>
    }
    return (
        <div>
            <h2>Join a challenge</h2>
            <form onSubmit={handleSubmit}>
                <div className='join-code-div'>
                    <label htmlFor="join-code">Enter the join code of desired challenge</label>
                    <input value={joinCode} onChange={handleChange} type="number" name="join-code" id="join-code" />
                </div>
                <button type='submit'>Join</button>
            </form>
        </div>
    )
}

export default JoinChallenge
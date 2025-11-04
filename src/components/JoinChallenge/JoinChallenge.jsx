import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { authRequest } from '../../lib/auth'
import CustomModal from '../CustomModal/CustomModal'

function JoinChallenge({className}) {
    const [joinCode, setJoinCode] = useState('')
    const [errors, setErrors] = useState('')
    const [Open, setOpen] = useState(false)

    const navigate = useNavigate()
    
    function handleChange(event) {
        setJoinCode(event.target.value)
        console.log(event.target.value)
    }

    async function handleSubmit(event){
        event.preventDefault()
        try{
            const response = await authRequest({method:'post', url:`http://127.0.0.1:8000/api/challenges/join/`,data:{ joinCode:joinCode }})
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
        <>
        <button className={className} onClick={()=>setOpen(true)}>Join a Challenge</button>
        
        <CustomModal isOpen={Open} onClose={()=>setOpen(false)}>
            <div className='header'>
                 <span>Join a Challenge </span>
                 <hr />   
            </div>
            <form onSubmit={handleSubmit} className='content-modal'>
                <div className='join-code-div'>
                    <label htmlFor="join-code">Enter the join code of desired challenge</label>
                    <input value={joinCode} onChange={handleChange} type="number" name="join-code" id="join-code" />
                </div>
                <button type='submit'>Join</button>
            </form>
        </CustomModal>
        </>
    )
}

export default JoinChallenge
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { authRequest } from '../../lib/auth'
import CustomModal from '../CustomModal/CustomModal'
import toast from 'react-hot-toast';

function JoinChallenge({className}) {
    const [joinCode, setJoinCode] = useState('')
    const [Open, setOpen] = useState(false)

    const navigate = useNavigate()
    
    function handleChange(event) {
        setJoinCode(event.target.value)
    }

    async function handleSubmit(event){
        event.preventDefault()
        try{
            const response = await authRequest({method:'post', url:`http://127.0.0.1:8000/api/challenges/join/`,data:{ joinCode:joinCode }})
            if(response.status === 201){
                toast.success('You joined successfull! be ready to be competitive 😆')
                navigate(`/challenges/${response.data.challenge}`)
            }
        } catch(error){
            const firstError = Object.values(error.response.data)[0]
            
            //because i want it to display a custom message, when user enters a challenge they're already in
            firstError.includes('The fields challenge, user must make a unique set.')
            ? 
            toast('You are already a member!',{icon: '🫤',}) 
            : 
            toast.error(firstError || 'failed. Please try again.')
        }
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
                    <h2 htmlFor="join-code">Enter the challenge code to join 😁</h2>
                    <input value={joinCode} onChange={handleChange} type="number" name="join-code" id="join-code" />
                </div>
                <button type='submit'>Join</button>
            </form>
        </CustomModal>
        </>
    )
}

export default JoinChallenge
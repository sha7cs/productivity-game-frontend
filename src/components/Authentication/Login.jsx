import axios from 'axios'
import React, { useState } from 'react'
import { getUserFromToken, saveTokens } from '../../lib/auth'
import { useNavigate } from 'react-router'

function Login({ setUser }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate()

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/login/`, formData)
            saveTokens(response.data.access, response.data.refresh)
            setUser(getUserFromToken())
            navigate('/challenges')
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
            <form onSubmit={handleSubmit}>
                <div className='username-div'>
                    <label htmlFor="username">Username</label>
                    <input value={formData.username} onChange={handleChange} type="text" name='username' id='username' />
                </div>

                <div className='password-div'>
                    <label htmlFor="password">password</label>
                    <input value={formData.password} onChange={handleChange} type="password" name='password' id='password' />
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login
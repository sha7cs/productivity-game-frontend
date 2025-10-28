import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        first_name:''
    })
    const [errors, setErrors] = useState()
    const navigate = useNavigate()

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        console.log(formData)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            await axios.post('http://127.0.0.1:8000/api/signup/', formData)
            navigate('/login')
        } catch (error) {
            console.log(error)
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
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='email-div'>
                    <label htmlFor="email">Email</label>
                    <input value={formData.email} onChange={handleChange} type="email" name="email" id="email" />
                </div>

                <div className='username-div'>
                    <label htmlFor="username">Username</label>
                    <input value={formData.username} onChange={handleChange} type="text" name="username" id="username" />
                </div>

                <div className='first-name-div'>
                    <label htmlFor="first_name">first name</label>
                    <input value={formData.first_name} onChange={handleChange} type="text" name="first_name" id="first_name" />
                </div>

                <div className='password-div'>
                    <label htmlFor="password">Password</label>
                    <input value={formData.password} onChange={handleChange} type="password" name="password" id="password" />
                </div>
                <button type='submit'>sign up</button>
            </form>
        </div>
    )
}

export default SignUp
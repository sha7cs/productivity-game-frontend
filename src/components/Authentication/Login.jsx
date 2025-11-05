import axios from 'axios'
import React, { useState , useContext} from 'react'
import { getUserFromToken, saveTokens } from '../../lib/auth'
import { useNavigate } from 'react-router'
import { UserContext } from '../../App'
import './auth.sass'
import toast from 'react-hot-toast';

function Login() {
    const { user , setUser} = useContext(UserContext)
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
            toast.success(`Welcome ${user?.user?.username || ''}!`)
            navigate('/challenges')
        } catch (error) {
            const message = error.response?.data?.error || 'Login failed. Please try again.'
            setErrors(message)
            toast.error(message)
        }
    }

    if (user) toast.success(`Welcome ${user.user.username || ''}!`)
    return (
        <div className='auth-page'>
            <div className='circle1'></div>
            <div className='circle2'></div>
            <div className='circle3'></div>
            <div className='circle4'></div>

            <h1>Welcome Back!</h1>
            <form onSubmit={handleSubmit} className='auth-form shadow-pop-br'>
                <div className='username-div login'>
                    <label htmlFor="username">Username</label>
                    <input value={formData.username} onChange={handleChange} type="text" name='username' placeholder='please enter your username here'/>
                </div>

                <div className='password-div login'>
                    <label htmlFor="password">password</label>
                    <input value={formData.password} onChange={handleChange} type="password" name='password' placeholder='please enter your password here'/>
                </div>

                <button className='login-btn'type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login
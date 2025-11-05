import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import ChallengeList from './components/ChallengeList/ChallengeList'
import ChallengeDetail from './components/ChallengeDetail/ChallengeDetail'
import GoalForm from './components/GoalForm/GoalForm'
import DeleteGoal from './components/GoalForm/DeleteGoal'
import Login from './components/Authentication/Login'
import NavBar from './components/NavBar/NavBar'
import { getUserFromToken } from './lib/auth'
import SignUp from './components/Authentication/SignUp'
import ChallengeForm from './components/ChallengeForm/ChallengeForm'
import DeleteChallenge from './components/ChallengeForm/DeleteChallenge'
import JoinChallenge from './components/JoinChallenge/JoinChallenge'
import { authRequest } from './lib/auth'
import { createContext } from 'react'
import WelcomePage from './components/WelcomePage/WelcomePage'
import ProtectedRoute from './components/Authentication/ProtectedRoute'
import HomePage from './components/Homepage/HomePage'
import PublicRoute from './components/Authentication/PublicRoute'
import toast, { Toaster } from 'react-hot-toast';

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState(getUserFromToken())

  async function getUserProfile() {
    try {
      const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/user-profile/` })
      setUser(response.data)
    } catch (errors) {
      console.log(errors)
      toast.error(message);
    }
  }
  useEffect(() => {
    getUserProfile()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, getUserProfile }}>
      <Router>
        {user ? // only appear if user logged in 
          <NavBar setUser={setUser} user={user} />
          :
          null
        }
        <div className='background'>
          <div className='circle1 bg-pan-left '></div>
          <div className='circle2 bg-pan-left '></div>
          <div className='circle3 bg-pan-left '></div>
          <div className='circle4 bg-pan-left '></div>
        </div>

        <Toaster position="top-center" reverseOrder={false} /> 

        <Routes>
          <Route path='/' element={<PublicRoute><WelcomePage /></PublicRoute>} />
          <Route path='/homepage' element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
          <Route path='/challenges' element={<ProtectedRoute> <ChallengeList user={user} /> </ProtectedRoute>} />
          <Route path='/challenges/:challengeId' element={<ProtectedRoute><ChallengeDetail user={user} /> </ProtectedRoute>} />
          <Route path='/challenges/add' element={<ProtectedRoute><ChallengeForm user={user} /> </ProtectedRoute>} />
          <Route path='/challenges/:challengeId/edit' element={<ProtectedRoute> <ChallengeForm /> </ProtectedRoute>} />
          <Route path='/challenges/:challengeId/add-goal' element={<ProtectedRoute><GoalForm /></ProtectedRoute>} />
          <Route path='/challenges/:challengeId/edit-goal/:goalId' element={<ProtectedRoute><GoalForm /></ProtectedRoute>} />
          <Route path='/challenges/:challengeId/delete-goal/:goalId' element={<ProtectedRoute><DeleteGoal /></ProtectedRoute>} />
          <Route path='/challenges/:challengeId/confirm-delete' element={<ProtectedRoute><DeleteChallenge /></ProtectedRoute>} />
          <Route path='/challenges/join' element={<ProtectedRoute><JoinChallenge /></ProtectedRoute>} />
          {/* Auth */}
          <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
          <Route path='/signup' element={<PublicRoute><SignUp /></PublicRoute>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
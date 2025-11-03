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
export const UserContext = createContext()


function App() {
  const [user, setUser] = useState(getUserFromToken())

  async function getUserProfile() {
    try {
      const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/user-profile/` })
      setUser(response.data)
    } catch (errors) {
      console.log(errors)
    }
  }
  useEffect(() => {
    getUserProfile()
  }, [])
  
  return (
    <UserContext.Provider value={{ user, setUser, getUserProfile }}>
      <Router>
        <NavBar setUser={setUser} user={user} />
        <Routes>
          <Route path='/' element={<WelcomePage/>}/>
          <Route path='/challenges' element={<ProtectedRoute> <ChallengeList user={user} /> </ProtectedRoute>} />
          <Route path='/challenges/:challengeId' element={<ProtectedRoute><ChallengeDetail user={user} /> </ProtectedRoute>} />
          <Route path='/challenges/add' element={<ProtectedRoute><ChallengeForm user={user}/> </ProtectedRoute>} />
          <Route path='/challenges/:challengeId/edit' element={<ProtectedRoute> <ChallengeForm /> </ProtectedRoute>} />
          <Route path='/challenges/:challengeId/add-goal' element={<ProtectedRoute><GoalForm /></ProtectedRoute>} />
          <Route path='/challenges/:challengeId/edit-goal/:goalId' element={<ProtectedRoute><GoalForm /></ProtectedRoute>} />
          <Route path='/challenges/:challengeId/delete-goal/:goalId' element={<ProtectedRoute><DeleteGoal /></ProtectedRoute>} />
          <Route path='/challenges/:challengeId/confirm-delete' element={<ProtectedRoute><DeleteChallenge /></ProtectedRoute>} />
          <Route path='/challenges/join' element={<ProtectedRoute><JoinChallenge /></ProtectedRoute>} />
          {/* Auth */}
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
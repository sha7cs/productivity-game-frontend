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
          <Route path='/challenges' element={<ChallengeList user={user} />} />
          <Route path='/challenges/:challengeId' element={<ChallengeDetail user={user} />} />
          <Route path='/challenges/add' element={<ChallengeForm user={user} />} />
          <Route path='/challenges/:challengeId/edit' element={<ChallengeForm />} />
          <Route path='/challenges/:challengeId/add-goal' element={<GoalForm />} />
          <Route path='/challenges/:challengeId/edit-goal/:goalId' element={<GoalForm />} />
          <Route path='/challenges/:challengeId/delete-goal/:goalId' element={<DeleteGoal />} />
          <Route path='/challenges/:challengeId/confirm-delete' element={<DeleteChallenge />} />
          <Route path='/challenges/join' element={<JoinChallenge />} />
          {/* Auth */}
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
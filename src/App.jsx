import React, { useState } from 'react'
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

function App() {
  const [user,setUser] = useState(getUserFromToken())
  return (
    <Router>
      <NavBar setUser={setUser} user={user}/>
      <Routes>
        <Route path='/challenges' element={<ChallengeList />} />
        <Route path='/challenges/:challengeId' element={<ChallengeDetail />} />
        <Route path='/challenges/add' element={<ChallengeForm user={user}/>} />
        <Route path='/challenges/:challengeId/edit' element={<ChallengeForm />} />
        <Route path='/challenges/:challengeId/add-goal'element={<GoalForm/>} />
        <Route path='/challenges/:challengeId/edit-goal/:goalId'element={<GoalForm/>} />
        <Route path='/challenges/:challengeId/delete-goal/:goalId'element={<DeleteGoal/>} />
        <Route path='/challenges/:challengeId/confirm-delete' element={<DeleteChallenge />} />      
        {/* Auth */}
        <Route path='/login' element={<Login setUser={setUser} />}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
  )
}

export default App
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import ChallengeList from './components/ChallengeList/ChallengeList'
import ChallengeDetail from './components/ChallengeDetail/ChallengeDetail'
import GoalForm from './components/GoalForm/GoalForm'
import ConfirmDelete from './components/GoalForm/ConfirmDelete'
import Login from './components/Authentication/Login'
import NavBar from './components/NavBar/NavBar'
import { getUserFromToken } from './lib/auth'
import SignUp from './components/Authentication/SignUp'

function App() {
  const [user,setUser] = useState(getUserFromToken())
  return (
    <Router>
      <NavBar setUser={setUser} user={user}/>
      <Routes>
        <Route path='/challenges' element={<ChallengeList />} />
        <Route path='/challenges/:challengeId' element={<ChallengeDetail />} />
        <Route path='/challenges/:challengeId/add-goal'element={<GoalForm/>} />
        <Route path='/challenges/:challengeId/edit-goal/:goalId'element={<GoalForm/>} />
        <Route path='/challenges/:challengeId/delete-goal/:goalId'element={<ConfirmDelete/>} />
        {/* Auth */}
        <Route path='/login' element={<Login setUser={setUser} />}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
  )
}

export default App
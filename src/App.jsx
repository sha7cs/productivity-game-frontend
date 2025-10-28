import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import ChallengeList from './components/ChallengeList/ChallengeList'
import ChallengeDetail from './components/ChallengeDetail/ChallengeDetail'
import GoalForm from './components/GoalForm/GoalForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/challenges' element={<ChallengeList />} />
        <Route path='/challenges/:challengeId' element={<ChallengeDetail />} />
        <Route path='/challenges/:challengeId/add-goal'element={<GoalForm/>} />
        <Route path='/challenges/:challengeId/edit-goal/:goalId'element={<GoalForm/>} />
      </Routes>
    </Router>
  )
}

export default App
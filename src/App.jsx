import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import ChallengeList from './components/ChallengeList/ChallengeList'
import ChallengeDetail from './components/ChallengeDetail/ChallengeDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/challenges' element={<ChallengeList />} />
        <Route path='/challenges/:challengeId' element={<ChallengeDetail />} />
      </Routes>
    </Router>
  )
}

export default App
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import ChallengeList from './components/ChallengeList/ChallengeList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/challenges' element={<ChallengeList />} />
      </Routes>
    </Router>
  )
}

export default App
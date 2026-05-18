import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'

function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-[#fafaf8]">
        <Routes>
          <Route
            path="/"
            element={
              onboardingComplete ? (
                <Navigate to="/home" />
              ) : (
                <Onboarding onComplete={() => setOnboardingComplete(true)} />
              )
            }
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

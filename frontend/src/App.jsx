import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('loggedIn') === 'true')

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} />} />
          <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

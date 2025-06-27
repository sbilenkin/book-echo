import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import MyReviews from './MyReviews'
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('loggedIn') === 'true')
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '')

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login onLogin={() => {
            setLoggedIn(true)
            setUsername(sessionStorage.getItem('username') || '')
          }} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={loggedIn ? <Home loggedIn={loggedIn} username={username} /> : <Navigate to="/login" />}
          />
          <Route path="/my-reviews" element={loggedIn ? <MyReviews loggedIn={loggedIn} /> : <Navigate to="/login" />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App

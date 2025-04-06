import { useEffect, useState } from 'react'
import './App.css'
import { SignUp, Login, Homepage } from './pages'
import { Route, Routes } from 'react-router-dom'

function App() {

  const [token, setToken] = useState(false)

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }

  }, [])

  return (
    <div>
      <Routes>
        <Route path={'/signup'} element={<SignUp />}/>
        <Route path={'/'} element={<Login setToken={setToken}/>}/>
        { token ? <Route path={'/homepage'} element={<Homepage token={token}/>}/> : ""}
      </Routes>
    </div>
  )
}

export default App

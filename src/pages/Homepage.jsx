import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

function Homepage({token}) {
    let navigate = useNavigate()

    function handleLogout() {
        sessionStorage.removeItem('token')
        navigate('/')
    }

  return (
    
    <div>
        <Navbar />
        <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
        <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Homepage

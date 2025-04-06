import { useNavigate } from "react-router-dom"

function Homepage({token}) {
    let navigate = useNavigate()

    function handleLogout() {
        sessionStorage.removeItem('token')
        navigate('/')
    }

  return (
    <div>
        <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
        <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Homepage

import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Navbar.css"

function Navbar() {

    let navigate = useNavigate()
    
        function handleLogout() {
            sessionStorage.removeItem('token')
            navigate('/')
        }

    return (
    <nav className="nav">
        <Link to="/homepage"><img src="/src/assets/logo.PNG" alt="Leche Plan Logo" /></Link>
        <Link to="/homepage">Homepage</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/plans">Plans</Link>
        <button onClick={handleLogout}>Logout</button>
    </nav>
    )
}

export default Navbar
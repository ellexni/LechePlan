import { Link } from "react-router-dom"

function Navbar() {
    return (
    <nav className="nav">
        <Link to="/homepage">Homepage</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/plans">Plans</Link>
    </nav>
    )
}

export default Navbar
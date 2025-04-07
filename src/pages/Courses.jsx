import Navbar from "../components/Navbar"

function Courses({token}) {
    return (
        <div>
            <Navbar />
            <h3>{token.user.user_metadata.full_name}'s Courses</h3>
        </div>
    )
}

export default Courses
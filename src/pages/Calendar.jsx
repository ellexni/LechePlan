import Navbar from "../components/Navbar"

function Calendar({token}) {
    return (
        <div>
            <Navbar />
            <h3>{token.user.user_metadata.full_name}'s Calendar</h3>
        </div>
    )
}

export default Calendar
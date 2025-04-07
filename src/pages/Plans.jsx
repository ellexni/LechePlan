import Navbar from "../components/Navbar"

function Plans({token}) {
    return (
        <div>
            <Navbar />
            <h3>{token.user.user_metadata.full_name}'s Plans</h3>
        </div>
    )
}

export default Plans
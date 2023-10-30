import Navbar from "../components/Navbar"
import UserDetails from "../components/UserDetails"

const Profile = () => {
  return (
    <div>
      <Navbar/>
      <div className="flex items-start justify-around m-10">
      <UserDetails/>
      </div>
    </div>
  )
}

export default Profile
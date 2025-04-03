import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"
import { useAuth0 } from "@auth0/auth0-react"
import UserHistoryPage from "./UserHistoryPage"

const HomePage = () => {
  const {isAuthenticated} = useAuth0()
  return (
    <div className="h-screen max-w-full mt-6 mx-10">
        <div>
            <Navbar/>
        </div>
        <div className="flex justify-center items-center mt-20 lg:px-80 md:px-32">
        <SearchBar/>
        </div>
        <div>
          {isAuthenticated && <UserHistoryPage/>}
        </div>
    </div>
  )
}

export default HomePage

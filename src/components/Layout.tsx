import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"
import LoginButton from "./LoginButton"
import {useAuth0} from '@auth0/auth0-react'

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  const {isAuthenticated} = useAuth0()
  return (
    <div className="h-screen max-w-full mt-6 mx-10">
        <div>
            <Navbar/>
        </div>
        <div className="flex justify-center items-center mt-20 lg:px-80 md:px-32">
        <SearchBar/>
        </div>
        <div className="mt-10">{children}</div>
        <div className="mt-3 flex justify-center items-center">
          {!isAuthenticated && <LoginButton/>}
        </div>
    </div>
  )
}

export default Layout

import Logo from "./Logo"
import { ModeToggle } from "./ModeToggle"
import {useAuth0} from '@auth0/auth0-react'
import UserDetail from "./UserDetail"

const Navbar = () => {
  const { isAuthenticated} = useAuth0()
  return (
    <div className="flex gap-3 justify-between md:mx-4 items-center">
        <Logo/>
        <div className="flex gap-4">
            {isAuthenticated && <UserDetail/>}
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Navbar

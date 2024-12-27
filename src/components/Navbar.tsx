import Logo from "./Logo"
import { ModeToggle } from "./ModeToggle"

const Navbar = () => {
  return (
    <div className="flex gap-3 justify-between md:mx-4 items-center">
        <Logo/>
        <div>
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Navbar

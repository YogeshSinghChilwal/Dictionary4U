import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="h-screen max-w-full mt-6 mx-10">
        <div>
            <Navbar/>
        </div>
        <div className="flex justify-center items-center mt-20 lg:px-80 md:px-32">
        <SearchBar/>
        </div>
        <div className="mt-10">{children}</div>
    </div>
  )
}

export default Layout

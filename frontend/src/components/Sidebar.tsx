import Logo from "../icons/Logo"
import TwitterIcon from "../icons/TwitterIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import SidebarItem from "./SidebarItem"

const Sidebar = () => {
  return (
    <div className="h-screen bg-white border-gray-100 border-r w-72 fixed left-0 top-0">
        <div className="flex items-center text-2xl font-bold pt-6 pl-4">
            <div className="pr-2 text-purple-600">
                <Logo size="7" />
            </div>
            Brainly
        </div>

        <div className="pt-8 pl-6">
            <SidebarItem text="X.com" icon={<TwitterIcon size="lg" />} />
            <SidebarItem text="Youtube" icon={<YoutubeIcon size="lg" />} />
        </div>
    </div>
  )
}

export default Sidebar
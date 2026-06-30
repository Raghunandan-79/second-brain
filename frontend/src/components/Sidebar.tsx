import Logo from "../icons/Logo"
import TwitterIcon from "../icons/TwitterIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import LogoutIcon from "../icons/LogoutIcon"
import SidebarItem from "./SidebarItem"
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authorization");
    navigate("/signin");
  };

  return (
    <div className="h-screen bg-white border-gray-100 border-r w-72 fixed left-0 top-0 flex flex-col justify-between pb-6">
        <div>
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

        <div className="pl-6">
            <SidebarItem text="Logout" icon={<LogoutIcon size="lg" />} onClick={handleLogout} />
        </div>
    </div>
  )
}

export default Sidebar
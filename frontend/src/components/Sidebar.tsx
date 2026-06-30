import Logo from "../icons/Logo"
import TwitterIcon from "../icons/TwitterIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import LogoutIcon from "../icons/LogoutIcon"
import SidebarItem from "./SidebarItem"
import { useNavigate } from "react-router-dom"

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPublic?: boolean;
}

const AllIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
  </svg>
);

const Sidebar = ({ activeTab, setActiveTab, isPublic = false }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authorization");
    navigate("/signin");
  };

  const handleJoin = () => {
    navigate("/signup");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex flex-row justify-around items-center z-50 md:h-screen md:w-72 md:fixed md:left-0 md:top-0 md:flex-col md:justify-between md:pb-6 md:border-r md:border-t-0 md:border-gray-100">
        <div className="w-full">
            <div className="hidden md:flex items-center text-2xl font-bold pt-6 pl-4">
                <div className="pr-2 text-purple-600">
                    <Logo size="7" />
                </div>
                Brainly
            </div>

            <div className="flex flex-row justify-around w-full md:flex-col md:pt-8 md:pl-6 md:gap-2">
                <SidebarItem 
                  text="All" 
                  icon={<AllIcon />} 
                  active={activeTab === "all"} 
                  onClick={() => setActiveTab("all")} 
                />
                <SidebarItem 
                  text="X.com" 
                  icon={<TwitterIcon size="lg" />} 
                  active={activeTab === "twitter"} 
                  onClick={() => setActiveTab("twitter")} 
                />
                <SidebarItem 
                  text="Youtube" 
                  icon={<YoutubeIcon size="lg" />} 
                  active={activeTab === "youtube"} 
                  onClick={() => setActiveTab("youtube")} 
                />
                <div className="md:hidden flex items-center">
                    {isPublic ? (
                        <SidebarItem text="Join" icon={<span className="text-lg">✨</span>} onClick={handleJoin} />
                    ) : (
                        <SidebarItem text="Logout" icon={<LogoutIcon size="lg" />} onClick={handleLogout} />
                    )}
                </div>
            </div>
        </div>

        <div className="hidden md:block w-full pl-6">
            {isPublic ? (
                <SidebarItem text="Join Brainly" icon={<span className="text-lg">✨</span>} onClick={handleJoin} />
            ) : (
                <SidebarItem text="Logout" icon={<LogoutIcon size="lg" />} onClick={handleLogout} />
            )}
        </div>
    </div>
  )
}

export default Sidebar
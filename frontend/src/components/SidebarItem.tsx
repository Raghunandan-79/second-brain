import type { ReactElement } from "react";

const SidebarItem = ({ text, icon, onClick, active }: {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
  active?: boolean;
}) => {
  return (
    <div 
      onClick={onClick} 
      className={`flex flex-col md:flex-row items-center justify-center md:justify-start py-1 md:py-2 px-3 md:pl-4 md:pr-4 cursor-pointer rounded md:max-w-48 transition-all duration-150 ${
        active 
          ? "bg-purple-100 text-purple-700 font-semibold" 
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <div className="md:pr-2 text-xl md:text-lg">
        {icon}
      </div>

      <div className="text-[10px] md:text-base mt-0.5 md:mt-0">
        {text}
      </div>
    </div>
  )
}

export default SidebarItem
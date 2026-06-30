import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
}

const variantClasses = {
    "primary": "bg-purple-600 text-white cursor-pointer",
    "secondary": "bg-purple-200 text-purple-600 cursor-pointer"
}

const defaultStyles = "px-4 py-2 rounded-md font-normal flex items-center"

const Button = ({ variant, text, startIcon, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles}>
        <div className="pr-2">
          {startIcon}
        </div>
        {text}
    </button>
  )
}

export default Button   
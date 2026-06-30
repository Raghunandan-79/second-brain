import { useState } from "react"
import CrossIcon from "../icons/CrossIcon"
import Input from "./Input"

// controlled component
const CreateContentModal = ({ open, onClose }) => {
  return (
    <div>
        {open && <div className="w-screen h-screen bg-slate-200 fixed top-0 left-0
        opacity-60 flex justify-center">
            <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end">
                        <CrossIcon size="lg" />
                    </div>

                    <div>
                        <Input placeholder="Enter text"/>
                    </div>
                </span>
            </div>
        </div>}
    </div>
  )
}

export default CreateContentModal
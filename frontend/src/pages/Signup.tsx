import { useRef } from "react"
import Button from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, {
                username,
                password
            });

            // 2. Replace alert with success toast
            toast.success("You have signed up successfully!");
            navigate("/signin")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Signup failed. Please try again.");
            }
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input reference={usernameRef} type={"text"} placeholder="username" />
                <Input reference={passwordRef} type={"password"} placeholder="password" />

                <div className="flex justify-center pt-4">
                    <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true} />
                </div>
                <div className="text-center pt-4 text-sm text-gray-600">
                    Already have an account?{" "}
                    <button 
                        onClick={() => navigate("/signin")} 
                        className="text-blue-600 hover:underline focus:outline-none font-medium cursor-pointer"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Signup

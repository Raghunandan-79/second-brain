import axios from "axios";
import Button from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signin`, {
                username,
                password
            });

            const jwt = response.data.token;
            localStorage.setItem("authorization", jwt);
            // 2. Replace alert with success toast
            toast.success("You have signed in successfully!");
            navigate("/dashboard")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Signin failed. Please try again.");
            }
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input reference={usernameRef} type="text" placeholder="username" />
                <Input reference={passwordRef} type="password" placeholder="password" />

                <div className="flex justify-center pt-4">
                    <Button onClick={signin} loading={false} variant="primary" text="Signin" fullWidth={true} />
                </div>
                <div className="text-center pt-4 text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button 
                        onClick={() => navigate("/signup")} 
                        className="text-blue-600 hover:underline focus:outline-none font-medium cursor-pointer"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Signin

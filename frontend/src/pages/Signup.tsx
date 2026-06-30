import Button from "../components/Button"
import { Input } from "../components/Input"

const Signup = () => {
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input placeholder="username" />
                <Input placeholder="password" />

                <div className="flex justify-center pt-4">
                    <Button loading={false} variant="primary" text="Signup" fullWidth={true} />
                </div>
            </div>
        </div>
    )
}

export default Signup

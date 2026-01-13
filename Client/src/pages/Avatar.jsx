import { RxAvatar } from "react-icons/rx";
import useAuthStore from "../store/useAuthStore";

function Avatar() {
    const { authUser } = useAuthStore();

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white shadow-2xl w-full max-w-lg h-80 rounded-2xl flex flex-col items-center justify-center gap-4">
                
                <RxAvatar className="text-9xl text-gray-400" />

                <div className="text-center space-y-1">
                    <p className="font-semibold">
                        Username: <span className="font-normal">{authUser?.username}</span>
                    </p>
                    <p>
                        Email: {authUser?.email}
                    </p>
                    <p className="text-green-600 font-medium">
                        Status: Active
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Avatar;

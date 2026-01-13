import { RxAvatar } from "react-icons/rx";
import useAuthStore from "../store/useAuthStore";

function Avatar() {
    const { authUser } = useAuthStore();
    console.log(authUser);
   
    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="flex justify-center ">
                <div className="bg-white shadow-2xl w-full max-w-lg flex justify-center h-80 rounded-2xl">
                    <RxAvatar className="text-9xl items-center flex justify-center" />
                    <div className="flex">
                      <p>{authUser?.username}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Avatar
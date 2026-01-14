import { FcTodoList } from "react-icons/fc";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useTodoStore from "../store/useTodoStore";

function Navbar() {
    const navigate = useNavigate();
    const { logout, isAuth } = useAuthStore();
    const { resetTodo } = useTodoStore()
    const handleLogout = async () => {
        try {
            await logout();
            resetTodo();
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("user not logout", error)
        }
    }
    return (
        <>
            {isAuth && (
                <div className='p-5 flex justify-between bg-white'>
                    <div className='text-4xl flex cursor-pointer'>
                        <Link to="/">
                            <FcTodoList />
                        </Link>
                    </div>
                    <div className='flex gap-5'>
                        <div className='text-4xl'>
                            <Link to="/Avatar">
                                <RxAvatar />
                            </Link>
                        </div>
                        <button
                            onClick={() => handleLogout()}
                            className='bg-blue-500 rounded px-5 hover:bg-blue-600 cursor-pointer'>
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar;
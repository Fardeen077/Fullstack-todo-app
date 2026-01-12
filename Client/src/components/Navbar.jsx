import { FcTodoList } from "react-icons/fc";
import { RxAvatar } from "react-icons/rx";
import { Link, } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

function Navbar() {
    const { logout, isAuth } = useAuthStore();
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("user not logout", error)
        }
    }
    return (
        <>
            {isAuth && (
                <div className='p-5 flex justify-between'>
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
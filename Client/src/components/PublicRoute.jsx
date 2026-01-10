import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore"

function PublicRoute({children}) {
    const isAuth = useAuthStore((state)=> state.isAuth);

    if(isAuth) return <Navigate to="/" replace/>
    return children;
}

export default PublicRoute
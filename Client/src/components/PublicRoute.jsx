import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore"

function PublicRoute({children}) {
    const isAuth = useAuthStore((set)=> set.isAuth);

    if(isAuth) return <Navigate to="/home" replace/>
    return children;
}

export default PublicRoute
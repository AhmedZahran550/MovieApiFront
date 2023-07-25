
import { Navigate } from "react-router-dom";
import useAuth from '../../Context/AuthContext';



export default function Protected(props) {
    const {user} = useAuth()
    if (!user & !localStorage.getItem('token')) {
        return <Navigate to={'/login'} />;
    }
    return props.children;


}

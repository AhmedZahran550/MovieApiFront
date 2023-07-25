import { Navigate } from "react-router-dom";


export default function AuthRouter(props) {
if (!localStorage.getItem('authToken')) {
 return  <Navigate to={'/login'}/>
}
return props.children;


}

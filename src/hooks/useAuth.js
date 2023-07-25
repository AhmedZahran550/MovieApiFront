import { useContext} from 'react';
import { AuthContext } from '../Context/AuthContext.jsx';


export default function useAuth() {

    const context = useContext(AuthContext);
    return {
       ...context
    };
}

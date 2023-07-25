import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { createContext } from 'react';
import { useMemo } from 'react';
export const AuthContext = createContext(null)
export default function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const  saveUser = () => {
    const decoded = jwtDecode(JSON.stringify(localStorage.getItem("token")));
     setUser(decoded);
    };


 useEffect(() => {
  if (localStorage.getItem("token")) {
      saveUser();
  }
  
});

const context = useMemo(
    () => ({
      signOut: async () => {
        // send api call to back end to sign out
        localStorage.removeItem("token");
        setUser(null);
      },
    }),[]);


return <AuthContext.Provider value={{user , ...context , saveUser}}>
{props.children}
</AuthContext.Provider>

}

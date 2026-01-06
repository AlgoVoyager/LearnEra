import {useState,useEffect, createContext} from 'react'
import axios from 'axios';
const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(undefined);
    const [loadingUser, setLoadingUser] = useState(true);
    const [errorUser, setErrorUser] = useState(null);
    const handleLogout = () =>{
      localStorage.removeItem("token");
      setUser(undefined);
    }
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
        if (token) {
          try {
            setLoadingUser(true)
            console.log("Fetching user...",token)
            const res = await axios.get("v1/user/me", {
              headers: {
                token: token,
              },
            });
            setUser(res.data.userDetails)
            console.log(res)
          } catch (error) {
            console.error("Error fetching user:", error);
            setErrorUser(error.response.data.message)
          }
          finally{
            setLoadingUser(false)
          }
        } 
    };
    useEffect(() => {
      fetchUser()
    },[])
  return (
    <>
        <UserContext.Provider value={{user, setUser, loadingUser, errorUser,fetchUser, handleLogout}}>
            {children}
        </UserContext.Provider>
    </>
  )
}

export {UserContext, UserContextProvider}
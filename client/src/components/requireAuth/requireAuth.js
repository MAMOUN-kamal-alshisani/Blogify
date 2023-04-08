// import { createContext,useState } from "react";

// export const authContext = createContext()

// export const AuthContextProvider = ({children})=>{
//  const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || null))


// return(
// <authContext.Provider value={{currentUser}}>
//     {children}
// </authContext.Provider>
    
//     )
// }


import { useLocation, Navigate,Outlet } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";

const RequireAuth =({children})=>{
    // const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || null))
    // const token = useSelector(selectCurrentToken)
    const [cookies,setCookies] = useCookies('user')

const location = useLocation()

    return(
        cookies.user? children: <Navigate to={'/signin'} state={{from:location}} replace/>
    )
}


export default RequireAuth
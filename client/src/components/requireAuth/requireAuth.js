

import { useLocation, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const RequireAuth =({children})=>{

    const [cookies] = useCookies('user')
const location = useLocation()

    return(
        cookies.user? children: <Navigate to={'/signin'} state={{from:location}} replace/>
    )
}


export default RequireAuth
import { useState } from "react"
import {useAuthContext} from '../context/AuthContext';
import axios from "axios";

const useLogout =()=>{
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const logout= async ()=>{
        setLoading(true);
        try {
            const res = await axios.post("/api/auth/logout")
            const data =  res.data;
            if(data.error)
                {
                    throw new error(data.error);
                }
            localStorage.removeItem("user");
            setAuthUser(null);
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false);
        }
    }
    return {loading,logout};
}

export default useLogout
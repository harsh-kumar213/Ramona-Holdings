import {useState} from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const login= async (userName,password)=>{
        const success = handleInputErrors(userName, password);
        console.log(userName,password)
		if (!success) return;
        setLoading(true);
        try {
            const res = await axios.post("/api/auth/login",{userName,password});
            const data =  res.data;
            
            if(data.error)
                {
                    throw new error(data.error);
                }
            // store the user in the local storage
            localStorage.setItem("user",JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            console.log("error in login hook",error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading,login};
}

export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		console.log("Please fill in all fields");
		return false;
	}

	return true;
}
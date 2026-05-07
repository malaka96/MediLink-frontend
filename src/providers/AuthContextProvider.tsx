import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/Type";
import API from "../services/apis/Api";
import { AuthContext } from "../context/AuthContext";

type AuthContextProviderProp = {
    children: ReactNode;
}

const AuthContextProvider = ({children}: AuthContextProviderProp) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() =>{
        API.get("/user/details")
        .then(res => {setUser(res.data);console.log("user is logged in auth context provider");})
        .catch(() => setUser(null))
        .finally(() => setIsLoading(false));
    },[]);

    const contextValue = {
        user,
        setUser,
        isLoading,
        setIsLoading
    }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider
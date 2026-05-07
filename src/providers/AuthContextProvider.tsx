import { useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import type { User } from "../types/Type";
import API from "../services/apis/Api";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../services/apis/AuthApi";

type AuthContextProviderProp = {
    children: ReactNode;
}

const AuthContextProvider = ({children}: AuthContextProviderProp) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() =>{
        let isMounted = true;

        (async () => {
            try {
                const res = await API.get("/api/users/me");
                setUser(res.data);
                // eslint-disable-next-line no-console
                console.log("user is logged in auth context provider");
            } catch (err) {
                if (!isMounted) return;
                setUser(null);

                const status = axios.isAxiosError(err) ? err.response?.status : undefined;
                const isAuthFailure = status === 401 || status === 403;

                if (isAuthFailure) {
                    try {
                        await logout();
                    } catch {
                        // ignore
                    }

                    if (window.location.pathname !== "/login") {
                        window.location.replace("/login");
                    }
                }
            } finally {
                //if (!isMounted) return;
                setIsLoading(false);
            }
        })();

        return () => {
            isMounted = false;
        };
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

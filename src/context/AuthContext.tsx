import { createContext } from "react";
import type { User } from "../types/Type";

type AuthContextType = {
    user: User | null;
    setUser: (value: User | null) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
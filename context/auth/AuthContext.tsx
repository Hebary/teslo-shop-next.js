import { IUser } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
    isLogged: boolean;
    user?: IUser

    // Methods
    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean, message?: string }>;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
import { IUser } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
    isLogged: boolean;
    user?: IUser
}

export const AuthContext = createContext({} as ContextProps);
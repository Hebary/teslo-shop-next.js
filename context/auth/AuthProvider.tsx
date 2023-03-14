import { useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '../../interfaces/user';


interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface AuthState {
    isLogged: boolean;
    user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
   isLogged: false
   
}

export const AuthProvider: React.FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

   return (
    <AuthContext.Provider
        value={{
                ...state,

                //Methods
            }}>
        {children}
    </AuthContext.Provider>
    )
}

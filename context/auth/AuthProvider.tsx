import { useReducer } from 'react';
import Cookie from 'js-cookie';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces/';
import { tesloApi } from '@/api';


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

    const loginUser = async ( email: string, password: string ): Promise<boolean>=> {
        
        try {
            const { data } = await tesloApi.post('/auth/login', { email, password })    
            const { user, token} = data;
            
            Cookie.set('token', token);

            dispatch({
                type: '[AUTH]-LOG_IN',
                payload: user
            })

            return true;
        } catch (error) {
            return false;
        }

    }



    return (
        <AuthContext.Provider
            value={{
                    ...state,

                    //Methods
                    loginUser
                }}>
            {children}
        </AuthContext.Provider>
    )
}

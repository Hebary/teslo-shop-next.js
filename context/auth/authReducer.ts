import { IUser } from '@/interfaces';
import { AuthState } from './';


type AuthActionType = 
| {type: '[AUTH]-LOG_IN', payload: IUser}
| {type: '[AUTH]-LOG_OUT'}


export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {


   switch (action.type) {
       case '[AUTH]-LOG_IN':
            return{
              ...state,
              isLogged: true,
              user: action.payload
           }
        case '[AUTH]-LOG_OUT':
            return{
                ...state,
                isLogged: false,
                user: undefined
            }

        default: 
            return state; 
    }
}
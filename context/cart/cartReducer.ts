import { CartState } from './';
import { ICartProduct } from '@/interfaces';


type CartActionType = 
| { type: '[CART]-LOAD_FROM_COOKIES', action: ICartProduct[] }


export const cartReducer = (state: CartState, action: CartActionType): CartState => {


   switch (action.type) {
       case '[CART]-LOAD_FROM_COOKIES':
            return{
              ...state,
           }

    default: 
            return state; 
    }
}
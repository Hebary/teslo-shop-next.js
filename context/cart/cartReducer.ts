import { CartState } from './';
import { ICartProduct } from '@/interfaces';


type CartActionType = 
| { type: '[CART]-LOAD_FROM_COOKIES', payload: ICartProduct[] }
| { type: '[CART]-UPDATE_CART_PRODUCTS', payload: ICartProduct[] }


export const cartReducer = (state: CartState, action: CartActionType): CartState => {


   switch (action.type) {
       case '[CART]-LOAD_FROM_COOKIES':
            return{
              ...state,
              cart: [...action.payload]
           }
        case '[CART]-UPDATE_CART_PRODUCTS':
          return {
            ...state,
            cart: [...action.payload]
          }

    default: 
            return state; 
    }
}
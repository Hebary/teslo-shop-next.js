import { CartState } from './';
import { ICartProduct } from '@/interfaces';


type CartActionType = 
| { type: '[CART]-LOAD_FROM_COOKIES', payload: ICartProduct[] }
| { type: '[CART]-UPDATE_CART_PRODUCTS', payload: ICartProduct[] }
| { type: '[CART]-UPDATE_PRODUCT_IN_CART', payload: ICartProduct }
| { type: '[CART]-REMOVE_PRODUCT_FROM_CART', payload: ICartProduct }
| { 
    type: '[CART]-UPDATE_ORDER_SUMMARY', 
    payload: {
      numberOfItems: number,
      subtotal: number,
      tax: number
      total:number
    }

  }


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
      case '[CART]-UPDATE_PRODUCT_IN_CART':
        return {
          ...state,
          cart: state.cart.map((product) => {
            if (product._id !== action.payload._id) return product;
            if (product.size !== action.payload.size) return product;
            return action.payload;
          })
        }
      case '[CART]-REMOVE_PRODUCT_FROM_CART':
        return{
          ...state,
          cart: state.cart.filter((product) => !(product._id === action.payload._id && product.size === action.payload.size))
        }
      case '[CART]-UPDATE_ORDER_SUMMARY':
        return{
          ...state,
          ...action.payload
        }

      default: 
          return state; 
    }
}
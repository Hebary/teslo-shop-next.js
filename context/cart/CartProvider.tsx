import { ICartProduct } from '@/interfaces';
import { useReducer } from 'react';
import { CartContext, cartReducer } from './';


interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface CartState {
    cart: ICartProduct[]
}

const CART_INITIAL_STATE: CartState = {
   cart: []
}

export const CartProvider: React.FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    
    const addProductToCart = (product: ICartProduct) => {

        const productInCart = state.cart.some( p => p._id ===product._id && p.size === product.size );
        
        if(!productInCart) return dispatch({ type: '[CART]-UPDATE_CART_PRODUCTS', payload: [...state.cart, product] })
        
        // if product is already in cart, update quantity
        const updatedCart = state.cart.map(p => {
            if(p._id !== product._id ) return p;
            if(p.size !== product.size) return p;

            p.quantity += product.quantity;

            return p;
        });

        dispatch({ type: '[CART]-UPDATE_CART_PRODUCTS', payload: updatedCart })
    }


   return (
    <CartContext.Provider
        value={{
                ...state,
                addProductToCart

            }}>
        {children}
    </CartContext.Provider>
    )
}

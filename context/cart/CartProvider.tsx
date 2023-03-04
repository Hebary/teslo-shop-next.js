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

   return (
    <CartContext.Provider
        value={{
                ...state
            }}>
        {children}
    </CartContext.Provider>
    )
}

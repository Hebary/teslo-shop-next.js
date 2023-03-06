import { createContext } from 'react';
import { ICartProduct, ISize } from '@/interfaces';


interface ContextProps {
    cart: ICartProduct[]

    //methods
    addProductToCart: (product: ICartProduct) => void
    updateCartProduct: (product: ICartProduct) => void
    removeProductFromCart: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps);
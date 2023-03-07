import { createContext } from 'react';
import { ICartProduct, ISize } from '@/interfaces';


interface ContextProps {
    
    cart: ICartProduct[]
    //summary quantities
    
    numberOfItems: number 
    subtotal :number 
    tax: number 
    total: number 
    //methods
    
    addProductToCart: (product: ICartProduct) => void
    updateCartProduct: (product: ICartProduct) => void
    removeProductFromCart: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps);
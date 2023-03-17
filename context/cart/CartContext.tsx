import { createContext } from 'react';
import { ICartProduct, ISize } from '@/interfaces';
import { ShippingAddress } from './';


interface ContextProps {
    
    cart: ICartProduct[]
    //summary quantities
    
    shippingAddress?: ShippingAddress

    numberOfItems: number 
    subtotal :number 
    tax: number 
    total: number 
    isLoaded:boolean
    //methods
    

    addProductToCart: (product: ICartProduct) => void
    updateCartProduct: (product: ICartProduct) => void
    removeProductFromCart: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps);
import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '@/interfaces';


interface ContextProps {
    cart            : ICartProduct[];
    shippingAddress?: ShippingAddress;

    //summary quantities
    numberOfItems   : number;
    subtotal        : number;
    tax             : number;
    total           : number;
    isLoaded        : boolean;

    //methods
    addProductToCart: (product: ICartProduct) => void
    updateCartProduct: (product: ICartProduct) => void
    removeProductFromCart: (product: ICartProduct) => void
    updateAddress: (address: ShippingAddress) => void
    createOrder: () => Promise<void>
}

export const CartContext = createContext({} as ContextProps);
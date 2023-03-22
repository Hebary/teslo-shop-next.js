import { ICartProduct } from '@/interfaces';
import { useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import Cookie from 'js-cookie';

interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface ShippingAddress {
    name     : string
    lastname : string
    address  : string
    address2 : string
    phone    : string
    zip      : string
    city     : string
    country  : string
}


export interface CartState {
    cart            : ICartProduct[],
    numberOfItems   : number,
    subtotal        : number,
    tax             : number,
    total           : number
    isLoaded        :boolean
    shippingAddress?: ShippingAddress
}


const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subtotal :0,
    tax: 0,
    total: 0,

    shippingAddress: undefined

}

export const CartProvider: React.FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        try {
            const cart = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ) : [];
            dispatch({ type:'[CART]-LOAD_FROM_COOKIES', payload: cart })
        } catch (error) {
            dispatch({ type:'[CART]-LOAD_FROM_COOKIES', payload: [] })
        }    
    }, [])
    

    useEffect(() => {
        if(state.cart.length>0){
            //this line makes the reload of navigator keeps items on cart
            Cookie.set('cart', JSON.stringify(state.cart));
        }
    }, [state.cart])

    useEffect(() => {

        const numberOfItems = state.cart.reduce((prev, curr) => prev + curr.quantity, 0)
        const subtotal = state.cart.reduce((prev, curr) => prev + ( curr.price * curr.quantity ), 0)
        const taxRate = Number(process.env.NEXT_PUBLIC_TAXRATE || 0)
        
        const orderSummary = {
            numberOfItems,
            subtotal,
            tax: subtotal * taxRate,
            total: subtotal * (taxRate + 1)
        }
        dispatch({type:'[CART]-UPDATE_ORDER_SUMMARY', payload: orderSummary })
    }, [state.cart])
    
    
    useEffect(() => {

        if(Cookie.get('name')) {

            const shippingAddress = {
                name    : Cookie.get('name')     || '',
                lastname: Cookie.get('lastname') || '',
                address : Cookie.get('address')  || '',
                address2: Cookie.get('address2') || '',
                phone   : Cookie.get('phone')    || '',
                zip     : Cookie.get('zip')      || '',
                city    : Cookie.get('city')     || '',
                country : Cookie.get('country')  || ''
            }
            
            dispatch({ type:'[CART]-LOAD_SHIPPING_ADDRESS', payload: shippingAddress})
        }
    }, [])


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

    const updateCartProduct = (product: ICartProduct) => {
        dispatch({type:'[CART]-UPDATE_PRODUCT_IN_CART', payload: product });
    }

    const removeProductFromCart = (product: ICartProduct) => {
        dispatch({type:'[CART]-REMOVE_PRODUCT_FROM_CART', payload: product });
    }

    const updateAddress = (address: ShippingAddress) => {
        Cookie.set('name', address.name);
        Cookie.set('lastname', address.lastname);
        Cookie.set('address', address.address);
        Cookie.set('address2', address?.address2 || '');
        Cookie.set('phone', address.phone);
        Cookie.set('zip', address.zip);
        Cookie.set('city', address.city);
        Cookie.set('country', address.country);
        dispatch({type:'[CART]-UPDATE_SHIPPING_ADDRESS', payload: address });
    }

   return (
    <CartContext.Provider
        value={{
                ...state,
                addProductToCart,
                updateCartProduct,
                removeProductFromCart,
                updateAddress,
            }}>
        {children}
    </CartContext.Provider>
    )
}

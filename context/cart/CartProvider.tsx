import { ICartProduct, IOrder, ShippingAddress } from '@/interfaces';
import { useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import Cookies from 'js-cookie';
import { tesloApi } from '@/api';
import axios from 'axios';

interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface CartState {
    cart            : ICartProduct[],
    numberOfItems   : number,
    subtotal        : number,
    tax             : number,
    total           : number
    isLoaded        : boolean
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
            const cart = Cookies.get('cart') ? JSON.parse( Cookies.get('cart')! ) : [];
            dispatch({ type:'[CART]-LOAD_FROM_COOKIES', payload: cart })
        } catch (error) {
            dispatch({ type:'[CART]-LOAD_FROM_COOKIES', payload: [] })
        }    
    }, [])
    

    useEffect(() => {
        if(state.cart.length>0){
            //this line makes the reload of navigator keeps items on cart
            Cookies.set('cart', JSON.stringify(state.cart));
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
        if(Cookies.get('name')) {
            const shippingAddress = {
                name    : Cookies.get('name')     || '',
                lastname: Cookies.get('lastname') || '',
                address : Cookies.get('address')  || '',
                address2: Cookies.get('address2') || '',
                phone   : Cookies.get('phone')    || '',
                zip     : Cookies.get('zip')      || '',
                city    : Cookies.get('city')     || '',
                country : Cookies.get('country')  || ''
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
        Cookies.set('name', address.name);
        Cookies.set('lastname', address.lastname);
        Cookies.set('address', address.address);
        Cookies.set('address2', address?.address2 || '');
        Cookies.set('phone', address.phone);
        Cookies.set('zip', address.zip);
        Cookies.set('city', address.city);
        Cookies.set('country', address.country);
        dispatch({type:'[CART]-UPDATE_SHIPPING_ADDRESS', payload: address });
    }

    const createOrder = async ():Promise<{ hasError: boolean, message: string  }> => {
        
        if(!state.shippingAddress) throw new Error('Shipping address is required');


        const body:IOrder = {
            orderItems: state.cart.map(p => ({
                ...p,
                size: p.size!,
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems  : state.numberOfItems,
            subtotal       : state.subtotal,
            tax            : state.tax,
            total          : state.total,
            isPaid         : false,
        }
        
        try {
            const { data } = await tesloApi.post<IOrder>('/orders', body);
            console.log({data});

            // dispatch({type:'[CART]-CLEAR_CART'});
            
            return { 
                hasError: false, 
                message: data._id!
            }

        } catch (error) {
            if(axios.isAxiosError(error)){
                return { 
                    hasError: true, 
                    message: error.response?.data.message || error.message
                } 
            } 
                return {
                    hasError: true,
                    message:'Error creating order'
                }
            }
        }


   return (
    <CartContext.Provider
        value={{
                ...state,
                addProductToCart,
                updateCartProduct,
                removeProductFromCart,
                updateAddress,
                createOrder
            }}>
        {children}
    </CartContext.Provider>
    )
}

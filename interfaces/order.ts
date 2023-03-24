import { IUser } from './';

export interface IOrder {
    _id?           : string;
    user?          : IUser | string;
    items          : OrderItem[];
    shippingAddress: ShippingAddress
    paymentMethod? : string
    numberOfItems? : number
    subtotal       : number;
    tax            : number;
    total          : number;
    isPaid?        : boolean;
    paidAt?        : string;
}

export interface OrderItem {
    _id     : string;
    title   : string;
    size    : string;
    quantity: number;
    price   : number;
    slug    : string;
    image   : string;
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
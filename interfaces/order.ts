import { IUser, ISize } from './';

export interface IOrder {
    _id?           : string;
    user?          : IUser | string;
    orderItems     : IOrderItem[];
    shippingAddress: ShippingAddress
    paymentMethod? : string
    numberOfItems  : number
    subtotal       : number;
    tax            : number;
    total          : number;
    isPaid         : boolean;
    paidAt?        : string;
}

export interface IOrderItem {
    _id     : string;
    title   : string;
    size    : ISize;
    quantity: number;
    slug    : string;
    image   : string;
    price   : number;
    gender  : string;
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
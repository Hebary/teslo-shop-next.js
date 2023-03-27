import { db } from '@/database';
import { IOrder } from '@/interfaces';
import { Order, Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

type Data = 
| { message  : string }
| IOrder
| IOrder[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return createOrder(req, res);            
        case 'GET':
            return getOrders(req, res);            
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { orderItems, total } = req.body as IOrder;
    
    //user session check
    const session: any = await getSession({ req });

    if(!session) {
        return res.status(401).json({ message: 'Unauthorized, you should sign in' });
    }

    //build array with id products to bring the matches from db using find
    const productsIds = orderItems.map(item =>  item._id);
    await db.connect();
    
    const dbProducts = await Product.find({ _id: { $in: productsIds } });

    try {
        //calculate subtotal from orderItems and dbProducts 
        const subTotal = orderItems.reduce((prev, current) => {
            const currentPrice = dbProducts.find(p => p.id === current._id)!.price;
            
            if(!currentPrice) throw new Error('please check your cart, product not found');

            return (currentPrice * current.quantity) + prev
        
        }, 0);

        const taxRate = Number(process.env.NEXT_PUBLIC_TAXRATE || 0)
        const backendTotal = subTotal * ( taxRate + 1 );

        if(total !== backendTotal) throw new Error('please check your cart, total price is not correct');

        //If all is ok, create the order in db
        const userId = session.user._id;
        
        const newOrder = new Order({
            ...req.body,
            isPaid: false,
            user: userId,
        })
 
        await newOrder.save();
        
        return res.status(201).json(newOrder)

    } catch (error: any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({ message: error.message || 'Something went wrong, check server logs' });
    }

}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
        
        await db.connect();
        const orders = await Order.find().sort({ createdAt: -1 });
        await db.disconnect();
    
        return res.status(200).json(orders);
}


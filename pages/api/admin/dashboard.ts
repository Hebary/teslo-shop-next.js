import { db } from '@/database';
import { IOrder } from '@/interfaces';
import { Order, Product, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    orders            : number
    paidOrders        : number
    notPaidOrders     : number
    numberOfClients   : number
    numberOfProducts  : number
    productsOutOfStock: number
    lowInventory      : number    
} 

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getStatsFromOrders(req, res);            
        default:
            break;
    }
}


const getStatsFromOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
        await db.connect();

        const [
            orders,
            paidOrders,
            numberOfClients,
            numberOfProducts,
            productsOutOfStock,
            lowInventory,

        ] = await Promise.all([
                Order.find().count(),
                Order.find({ isPaid: true }).count(),
                User.find({ role: 'client'}).count(),
                Product.find().count(),
                Product.find({ inStock: 0 }).count(),
                Product.find({ inStock: { $lte:10 } }).count(),
            ]);

        await db.disconnect();
        
        return res.status(200).json({
            orders,
            paidOrders,
            numberOfClients,
            numberOfProducts,
            productsOutOfStock,
            lowInventory,
            notPaidOrders: orders - paidOrders
        });
    }
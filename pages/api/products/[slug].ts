import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../interfaces/products';
import { Product } from '../../../models';
import { db } from '../../../database';

type Data = 
| { message: string }
| IProduct
export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProduct(req, res);            
        default:
            return res.status(400).json({message:'Bad request'});
    }

}

const getProduct = async (req:NextApiRequest, res:NextApiResponse) => {
    
    const { slug } = req.query;
    await db.connect();
    
    const dbProduct = await Product.findOne({ slug })
        .select('title price tags description images inStock sizes -_id')
        .lean();

    if(!dbProduct) {
        return res.status(404).json({message:'Product not found'});
    }

    dbProduct.images = dbProduct.images.map( (image: string) => {
        return image.includes('https') ? image : `${process.env.HOST_NAME}/products/${image}`;
    })

    await db.disconnect();
    res.status(200).json(dbProduct);
}
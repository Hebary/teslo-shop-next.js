import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary'
import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = 
| { message: string}
| IProduct[]
| IProduct

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getProducts( req, res );
        case 'PUT': 
            return updateProduct( req, res );   
        case 'POST': 
            return createProduct( req, res );   

        default:
            return res.status(400).json({ message: 'Bad request' })
    }
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();
    const products = await Product.find()
        .lean()
        .sort({ title:'desc' });

    await db.disconnect();
    
    const updatedProducts = products.map( (product) => {
        product.images = product.images.map( (image: string) => {
            return image.includes('https') ? image : `${process.env.HOST_NAME}/products/${image}`;
        })
        return product;
    })

    return res.status(200).json(updatedProducts);
}
const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { _id = '', images = [] } = req.body as IProduct;

    if(!isValidObjectId(_id)){
        return res.status(400).json({ message: 'Bad request, is not a valid ID' });
    }

    if(images.length<2) {
        return res.status(400).json({ message: 'Bad request, you need to upload at least 2 images' });
    }



    try {

        await db.connect();
        const product = await Product.findById(_id);
        
        if(!product) {
            await db.disconnect();
            return res.status(400).json({ message: 'Bad request, product not found' });
        }

        product.images.forEach( async (image) => {
            if(!images.includes(image)){
                const [ fileId, extension] = image.substring(image.lastIndexOf('/')+1).split('.');
                // console.log({fileId,extension,image})
                await cloudinary.uploader.destroy(`${fileId}`);
            }
        })

        await product.updateOne(req.body);
        await db.disconnect();
        return res.status(200).json(product);
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(400).json({ message: 'Bad request, check server logs' });

    }
}

const createProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
             
        const { images = [] } = req.body as IProduct;
    
        if(images.length<2) {
            return res.status(400).json({ message: 'Bad request, you need to upload at least 2 images' });
        }

        
        try {
            await db.connect();

            const productInDb = await Product.findOne({ slug: req.body.slug });

            if(productInDb) {
                return res.status(400).json({ message: 'Bad request, slug already exists' });
            }

            const product = new Product(req.body);

            await product.save();

            await db.disconnect();

            return res.status(201).json(product);

        } catch (error) {
            await db.disconnect();
            console.log(error);
            return res.status(400).json({ message: 'Bad request, check server logs' });
        }                
}


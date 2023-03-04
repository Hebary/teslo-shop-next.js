import { db } from './';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';

interface ProductSlug {
    slug: string;
}

export const dbProducts = {

    getProductBySlug: async(slug: string): Promise<IProduct | null> => {
        await db.connect();
        const product = await Product.findOne({ slug })
            .lean();
        await db.disconnect();
        if(!product) return null;
        return JSON.parse(JSON.stringify( product ));
    },

    getAllProductSlugs: async(): Promise<ProductSlug[]> => {
        await db.connect();
        const slugs = await Product.find()
            .select( 'slug -_id' )
            .lean();
        await db.disconnect();
        return slugs 
    },

    getProductsBySearch: async(search: string): Promise<IProduct[]> => {
        await db.connect();
        const products = await Product.find({ $text: { $search: search } })
            .select( 'title images price inStock slug -_id')
            .lean();
        await db.disconnect();
        return  JSON.parse(JSON.stringify(products));
    },
    getAllProducts: async(): Promise<IProduct[]> => {
        await db.connect();
        const products = await Product.find()
            .select( 'title images price inStock slug -_id')
            .lean();
        await db.disconnect();
        return  JSON.parse(JSON.stringify(products));
    }
}


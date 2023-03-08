import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '@/database'
import { Product, User } from '@/models'

type Data = {
    message: string
}


export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    if(process.env.NODE_ENV === 'production') {
       res.status(401).json({ message: "You don't have access to this service" })
    }
    try {
        await db.connect()
        
        await Product.deleteMany();
        await User.deleteMany()
        
        const { products } = seedData.initialData;
        const { users } = seedData.initialData;
        
        await Product.insertMany(products);
        await User.insertMany(users);
        await db.disconnect()

        res.status(200).json({ message: 'Successfull Seed Process!' });
    } catch(error) {
        console.log(error)
    }
    
}
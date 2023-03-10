import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { db } from '@/database'
import { User } from '@/models'
import { utils } from '@/utils';

type Data = 
| { message: string }
| { 
    token: string 
    user: {
            name: string
            email: string
            role: string
        }
  }
  

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return createAccount(req, res)
    
        default:
            return res.status(404).json({ message: 'Bad request' })
    }
}

const createAccount = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { name='', email='', password='' } = req.body as { name: string, email: string, password: string }
    
    

    if(password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' })    
    }

    if(name.length < 2) {
        return res.status(400).json({ message: 'Name must be at least 2 characters' })    
    }

  
    if(! utils.isValidEmail(email) ) {
        return res.status(400).json({ message: 'Email is not valid' })    
    }

    await db.connect();
    const user = await User.findOne({ email })
    
    if (user) {
        await db.disconnect();
        return res.status(400).json({ message: 'User already exists' })
    }

    const newUser = new User({ 
            name, 
            email: email.toLowerCase(), 
            password: bcrypt.hashSync(password),
            role: 'client'
        })

    try {
        await newUser.save({ validateBeforeSave: true})

    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong, check for server logs' })
    }
    
    await db.disconnect();

    const { role, _id } = newUser;
    
    return res.status(200).json( {
        token: utils.signToken(_id, email),
        user:{
            name,
            email,
            role
        }
    })
}
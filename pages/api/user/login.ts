import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { db } from '@/database'
import { User } from '@/models'
import { utils } from '@/utils'

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
            return loginUser(req, res)
    
        default:
            return res.status(404).json({ message: 'Bad request' })
    }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { email="", password="" } = req.body
    
    await db.connect();
    
    const user = await User.findOne({ email });
    
    await db.disconnect();

    if(!user) {
        await db.disconnect();
        return res.status(404).json({ message: 'User not found' })
    }
    
    if( !bcrypt.compareSync(password, user.password!) ) {
        return res.status(400).json({ message: 'Password is incorrect' })
    }
    
    const { role, name, _id } = user;

    return res.status(200).json( {
        token: utils.signToken(_id, email),
        user:{
            name,
            email,
            role
        }
    })
}
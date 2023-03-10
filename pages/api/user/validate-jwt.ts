import type { NextApiRequest, NextApiResponse } from 'next'
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
        case 'GET':
            return checkJWT(req, res)
    
        default:
            return res.status(404).json({ 
                message: 'Bad request' 
        })
    }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { token = "" } = req.cookies
    
    let user_id = ''

    try {
       user_id = await utils.isValidToken(token); 
    } catch (error) {
        console.log(error)
        console.log(token)
        return res.status(401).json({ message: 'Invalid token' })
    }
    await db.connect();
    
    const user = await User.findById({ _id:user_id }).lean();
    
    await db.disconnect();

    if(!user) {
        await db.disconnect();
        return res.status(404).json({ message: 'User not found' })
    }
    
    
    const { email, _id, role, name } = user;

    return res.status(200).json({
        token: utils.signToken(_id, email),
        user:{
            name,
            email,
            role
        }
    })
}
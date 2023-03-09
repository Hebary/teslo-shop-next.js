import jwt from 'jsonwebtoken'
import { IUser } from "@/interfaces";

export const utils = {

    format: (num: number) => {
        const formater = new Intl.NumberFormat('en-US', 
            { 
                style: 'currency', 
                currency: 'USD',
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2, 
            }
        );
    return formater.format(num);
    },

    signToken: (_id: string, email: string) => {
        if( ! process.env.JWT_SECRET ) throw new Error('JWT_SECRET not found')
        
        return jwt.sign(
            
            { _id, email }, 
            
            process.env.JWT_SECRET,
            
            { expiresIn: '1d' }
        )
    }
}
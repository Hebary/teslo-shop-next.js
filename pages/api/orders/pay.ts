import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return payOrder(req, res);
            
            
    
        default:
            return  res.status(400).json({ message: 'Bad request' })
    }
}

const getPaypalBearerToken = async ():Promise< string | null > => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');

    try {
        const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body,{
            headers: {
                Authorization: `Basic ${PAYPAL_SECRET}` ,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })

        return data.access_token;
    } catch (error) {
        if(axios.isAxiosError(error)) {
            console.log(error.response?.data)
        }
        console.log(error)
        return null;
    }
}
const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const paypalBearerToken = await getPaypalBearerToken();

    if(!paypalBearerToken) return res.status(500).json({ message: 'Error getting paypal token' });

    res.status(200).json({ message: paypalBearerToken?.toString() })

}
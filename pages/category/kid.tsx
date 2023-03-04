import { NextPage } from 'next';
import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';

import { useProducts } from '@/hooks';

interface Props {
}

const KidPage: NextPage<Props> = ({}) => {
    const { products, isLoading, isError } = useProducts('/products?gender=kid');

   return (
        <ShopLayout title={'Teslo Shop - Kid'} pageDescription={'Find the Best Teslo Kid Products Here'}>
            <Typography variant='h4' className='red-hat-font' sx={{ my:3 , ml:.5}}>Kids</Typography>
            {
            isLoading 
                ? <FullScreenLoading/>
                : <ProductList 
                    products={ products }
                />
            }
            
        </ShopLayout>
    )
}

export default KidPage;
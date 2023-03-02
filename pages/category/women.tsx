import { NextPage } from 'next';
import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';

import { useProducts } from '@/hooks';

interface Props {
}

const WomenPage: NextPage<Props> = ({}) => {
    const { products, isLoading, isError } = useProducts('/products?gender=women');

   return (
        <ShopLayout title={'Teslo Shop - Women'} pageDescription={'Find the Best Teslo Women Products Here'}>
            <Typography variant='h4' sx={{ my:3 , ml:.5}}>Women</Typography>
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

export default WomenPage;
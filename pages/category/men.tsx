import { NextPage } from 'next';
import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';

import { useProducts } from '@/hooks';

interface Props {
}

const MenPage: NextPage<Props> = ({}) => {
    const { products, isLoading, isError } = useProducts('/products?gender=men');

   return (
        <ShopLayout title={'Teslo Shop - Men'} pageDescription={'Find the Best Teslo Men Products Here'}>
            <Typography variant='h4' sx={{ my:3 , ml:.5}}>Men</Typography>
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

export default MenPage;
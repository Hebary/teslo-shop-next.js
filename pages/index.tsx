import { NextPage } from 'next';
import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';

import { useProducts } from '@/hooks';

interface Props {
}

const HomePage: NextPage<Props> = ({}) => {
    const { products, isLoading } = useProducts('/products');

   return (
        <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the Best Teslo Products Here'}>
            <Typography variant='h4' sx={{ my:3 , ml:.5}}>All Products</Typography>

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

export default HomePage;
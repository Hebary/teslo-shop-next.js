import { NextPage } from 'next';
import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material'
import { initialData } from '@/database/products';
import { ProductList } from '@/components/products';
import { IProduct } from '@/interfaces';

interface Props {
}

const HomePage: NextPage<Props> = ({}) => {
   return (
        <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find Teslo Best Products Here'}>
            <Typography component='h1' variant='h1'>Teslo Store</Typography>
            <Typography variant='h2' sx={{ mb: 1, ml:.5}}>All Products</Typography>
            
            <ProductList 
                products={initialData.products as IProduct[]}
            />
            
        </ShopLayout>
    )
}

export default HomePage;
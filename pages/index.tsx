import { NextPage } from 'next';
import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material'


interface Props {
}

const HomePage: NextPage<Props> = ({}) => {
   return (
        <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find Teslo Best Products Here'}>
            <Typography component='h1' variant='h1'>Teslo Store</Typography>
            <Typography variant='h2' sx={{ mb: 1, ml:.5}}>All Products</Typography>
        </ShopLayout>
    )
}

export default HomePage;
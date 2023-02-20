import { NextPage } from 'next';
import { ShopLayout } from '@/components/layouts';
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import { initialData } from '@/database/products';

interface Props {
}

const HomePage: NextPage<Props> = ({}) => {
   return (
        <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find Teslo Best Products Here'}>
            <Typography component='h1' variant='h1'>Teslo Store</Typography>
            <Typography variant='h2' sx={{ mb: 1, ml:.5}}>All Products</Typography>

            <Grid container spacing={4}>
                {
                    initialData.products.map(product => (
                        <Grid item xs={6} sm={4} key={product.slug}>
                            <Card>
                                <CardActionArea title="View Product">
                                    <CardMedia
                                        component={'img'}
                                        alt={product.title}
                                        image={ `products/${product.images[0] }` }
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </ShopLayout>
    )
}

export default HomePage;
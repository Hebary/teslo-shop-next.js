import { NextPage } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { initialData } from '@/database/products';
import { ProductSlideshow } from '@/components/products';
import { ShopLayout } from '@/components/layouts';
import { ItemCounter } from '@/components/ui';

const product = initialData.products[14];


interface Props {
}

const ProductPage: NextPage<Props> = ({}) => {
 
    return (
        <ShopLayout title={ `${product.title}` } pageDescription={` ${product.description}` }>
            <Grid container spacing={ 3 }>
                
                <Grid item xs={ 12 } sm={ 7 }>
                    <ProductSlideshow images={product.images}/>
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>

                    <Box display='flex' flexDirection='column'>
                        {/* Titles */}
                        <Typography variant='h1' component='h1'>{ product.title }</Typography>
                        <Typography variant='subtitle1' component='h2'>{`$ ${product.price}` }</Typography>
                    </Box>

                    <Box sx={{ my:2 }}>
                    {/* Quantity */}
                        <Typography variant='subtitle2' component='h2'>Quantity</Typography>
                        <ItemCounter stock={product.inStock}/>
                    </Box>

                    <Button className='circular-btn' fullWidth>Add to Cart</Button>

                    {/* <Chip label="Sorry, this product is not available."/> */}

                    <Box sx={{ my:2 }}>
                        <Typography variant='subtitle2' component='h2'>Description</Typography>
                        <Typography variant='body2' component='h2'>{ product.description }</Typography>
                    
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default ProductPage;
// triunphantly new username ??
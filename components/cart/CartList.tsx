import { initialData } from "@/database/products"
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import NextLink from 'next/link';
import { ItemCounter } from "../ui";




interface Props {
    editable?: boolean;
}

const productsInCart = [
    initialData.products[31], 
    initialData.products[7],    
    initialData.products[24] 
];

export const CartList: React.FC<Props> = ({ editable = false }) => {


   return (
        <Box sx={{ mt:2 }}> 
            {
                productsInCart.map(product => (
                    <Grid container spacing={ 2 } sx={{mb:1}} key={product.slug}>
                        <Grid item xs={ 3 }>
                            <NextLink href='/product/slug' passHref > 
                                <Link component='span'>
                                    <CardActionArea>
                                        <CardMedia
                                            image = { `products/${product.images[0] }` }
                                            component='img'
                                            sx={{ borderRadius: 5}}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={ 7 }>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{ product.title }</Typography>
                                <Typography variant='body1'>Size: <strong>{ 'L' }</strong></Typography>

                                {
                                    editable ? <ItemCounter stock={0}/>
                                    : <Typography variant='body1'>Quantity: <strong>{ 1 }</strong></Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={ 2 } display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{`$ ${product.price}` }</Typography>
                            { 
                                editable &&
                                <Button variant='text' color='secondary'>
                                    Remove
                                </Button>
                            }
                        </Grid>
                    </Grid>
                ))
            }   
        </Box>
    )
}

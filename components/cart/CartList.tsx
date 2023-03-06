import { useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import { CartContext } from "@/context";
import { ItemCounter } from "../ui";
import { ICartProduct } from '@/interfaces';




interface Props {
    editable?: boolean;
}



export const CartList: React.FC<Props> = ({ editable = false }) => {
    
        const { cart: productsInCart, updateCartProduct } = useContext(CartContext);

        const onUpdatedQuantity = (product: ICartProduct, quantity: number) => {
            product.quantity = quantity;
            updateCartProduct(product);
        }
    
    return (
        <Box sx={{ mt:2 }}> 
            {
                productsInCart.map(product => (
                    <Grid container spacing={ 2 } sx={{mb:1}} key={ product.slug + product.size }>
                        <Grid item xs={ 3 }>
                            <NextLink href={`/product/${ product.slug }`} passHref > 
                                <Link component='span'>
                                    <CardActionArea>
                                        <CardMedia
                                            image = { `/products/${product.image }` }
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
                                <Typography variant='body1'>Size: <strong>{ product.size }</strong></Typography>

                                {
                                    editable 
                                    ? <ItemCounter 
                                        currentValue={ product.quantity } 
                                        maxValue={ 10 } 
                                        updatedQuantity={(newValue)=> onUpdatedQuantity(product, newValue) }
                                     />
                                    : <Typography variant='body1'>Quantity: <strong>{ product.quantity }</strong></Typography>
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

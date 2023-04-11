import { useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import { CartContext } from "@/context";
import { ItemCounter } from "../ui";
import { ICartProduct, IOrderItem } from '@/interfaces';




interface Props {
    editable?: boolean;
    products?: IOrderItem[]
}



export const CartList: React.FC<Props> = ({ editable = false, products=[] }) => {
    
        const { cart, updateCartProduct, removeProductFromCart } = useContext(CartContext);

        const onUpdatedQuantity = (product: ICartProduct, quantity: number) => {
            product.quantity = quantity;
            updateCartProduct(product);
        }

        const cartProducts = products.length > 0 ? products : cart;
    
    return (
        <Box sx={{ mt:2 }}> 
            {
                cartProducts.map(product => (
                    <Grid container spacing={ 2 } sx={{mb:1}} key={ product.slug + product.size }>
                        <Grid item xs={ 3 }>
                            <NextLink href={`/product/${ product.slug }`} passHref > 
                                <Link component='span'>
                                    <CardActionArea>
                                        <CardMedia
                                            image = { product.image }
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
                                        updatedQuantity={(newValue)=> onUpdatedQuantity(product as ICartProduct, newValue) }
                                     />
                                    : <Typography variant='body1'>Quantity: <strong>{ product.quantity }</strong></Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={ 2 } display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{`$ ${product.price}` }</Typography>
                            { 
                                editable &&
                                <Button
                                    onClick={ () => removeProductFromCart( product as ICartProduct )  } 
                                    variant='text' 
                                    color='secondary'
                                >
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

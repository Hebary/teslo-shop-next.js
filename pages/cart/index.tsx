import { NextPage } from 'next';
import { Typography, Grid, Card, CardContent, Divider, Box, Button } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { CartList, OrderSummary } from '@/components/cart';



interface Props {
}

const Cart: NextPage<Props> = ({}) => {
   
   
    return (
        <ShopLayout title={'Cart Resume - Checkout'} pageDescription='Cart and order resume'>
            <Typography variant='h1' component='h1'  sx={{ mb: 1.5 }}>Cart - Summary</Typography>
            <Grid container spacing={ 2 }>
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList editable />
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2' component='h2'>Order</Typography>
                            <Divider sx={{ my: 1 }}/>
                            <OrderSummary/>
                            <Box sx={{ mt: 3 }}>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Checkout
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default Cart;
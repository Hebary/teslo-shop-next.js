import { NextPage } from 'next';
import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { CartList, OrderSummary } from '@/components/cart';
import { CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';





interface Props {
}

const OrderPage: NextPage<Props> = ({}) => {
    return (
        <ShopLayout title={'summary of order 1215231923'} pageDescription='summary client order'>
            <Box display='flex' alignItems='center' sx={{ mb: 2 }} justifyContent='start' gap={2}>

                <Typography variant='h1' component='h1'>Order 1215231923</Typography>

                {/* <Chip 
                    variant='outlined' 
                    label='Outstanding' 
                    color='error' 
                    icon={ <CreditCardOutlined/> }
                /> */}
                <Chip 
                    variant='outlined' 
                    label='Paid order' 
                    color='success' 
                    icon={ <CreditScoreOutlined/> }
                />
            </Box>

            <Grid container>
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList />
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2' component='h2'>Order</Typography>
                            <Divider sx={{ my: 1 }}/>
                            <Box display={'flex'} justifyContent='space-between' alignItems='center'>
                            <Typography variant='subtitle1'>Shipping Address</Typography>
                                <NextLink href='/checkout/address' passHref legacyBehavior >
                                    <Link underline='always' variant='subtitle2'>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography variant='body1'>
                                Bernardo D&apos;Addario
                            </Typography>
                            
                            <Typography variant='body1'>
                                 1234 Main St, New York, NY 10001
                            </Typography>
                            
                            <Typography variant='body1'>
                                +54 3 546 650 023
                            </Typography>
                            
                            <Divider sx={{ my: 1 }}/>

                            <Box display={'flex'} justifyContent='end' >
                                <NextLink href='/cart' passHref legacyBehavior >
                                    <Link underline='always' variant='subtitle2'>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary/>
                            <Box sx={{ mt: 3 }}>
                                    {/* TODO */}
                                    {/* Payment methods */}
                                <Chip 
                                    variant='outlined' 
                                    label='Paid order' 
                                    color='success' 
                                    icon={ <CreditScoreOutlined/> }
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default OrderPage;
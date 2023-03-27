import { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Link, Chip } from '@mui/material';
import { getSession } from 'next-auth/react';
import { CreditScoreOutlined } from '@mui/icons-material';
import { ShopLayout } from '@/components/layouts';
import { CartList, OrderSummary } from '@/components/cart';
import { IOrder } from '@/interfaces';
import { tesloApi } from '@/api';
import { dbOrders } from '@/database';
import { Order } from '@/models';





interface Props {
    order: IOrder 
}

const OrderPage: NextPage<Props> = ({order}) => {
    
    console.log(order)

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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({req, query, params}) => {
    
    const { id = '' } = query as { id: string };
    
    const session: any = await getSession({ req });

    if(!session) {
        return {
            redirect : {
                destination: `/auth/login?p=/orders/${ id }`,
                permanent: false
            }
        }
    }

    const order = await dbOrders.getOrderById( id );

    
    if(!order) {
        return {
            redirect : {
                destination: '/order/history',
                permanent: false
            }
        }
    }

    if(order.user !== session.user._id) {
        return {
            redirect : {
                destination: '/order/history',
                permanent: false
            }
        }
    }


    return {
        props: {
            order
        }
    }
}


export default OrderPage;
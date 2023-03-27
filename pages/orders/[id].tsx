import { NextPage, GetServerSideProps } from 'next';
import { Typography, Grid, Card, CardContent, Divider, Box, Link, Chip } from '@mui/material';
import { getSession } from 'next-auth/react';
import { CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { ShopLayout } from '@/components/layouts';
import { CartList, OrderSummary } from '@/components/cart';

import { IOrder } from '@/interfaces';
import { dbOrders } from '@/database';
import { countries } from '../../utils/countries';



interface Props {
    order: IOrder 
}

const OrderPage: NextPage<Props> = ({ order }) => {
    
    const { _id, shippingAddress, numberOfItems, subtotal, tax, total } = order;

    return (
        <ShopLayout title={'summary of order '+_id} pageDescription='summary client order' >
            <Box display='flex' alignItems='center' sx={{ mb: 4 }} justifyContent='start' gap={2}>

                <Typography variant='h1' component='h1' >Order {_id}</Typography>

                { 
                    !order.isPaid ? (
                        <Chip 
                            variant='outlined' 
                            label='Outstanding' 
                            color='error' 
                            icon={ <CreditCardOutlined/> }
                        /> 
                    ) :
                    
                    (   <Chip 
                            variant='outlined' 
                            label='Paid order' 
                            color='success' 
                            icon={ <CreditScoreOutlined/> }
                        />
                    )
                }

            </Box>

            <Grid container spacing={2} className='fadeIn' >
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList products={ order.orderItems }/>
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2' component='h2'>
                                Order Resume({numberOfItems} {numberOfItems > 1 ? 'items' : 'item'})
                            </Typography>
                            <Divider sx={{ my: 1 }}/>
                            <Box display={'flex'} justifyContent='space-between' alignItems='center'>
                                <Typography variant='subtitle1'>Shipping Address</Typography>
                            </Box>

                            <Typography variant='body1'>
                                {shippingAddress?.name} {shippingAddress?.lastname}
                            </Typography>
                            
                            <Typography variant='body1'>
                                 {shippingAddress?.address}, {shippingAddress.address2 && `, ${shippingAddress.address2}` }
                            </Typography>
                            <Typography variant='body1'>
                                 {countries.filter(c => c.code === shippingAddress.country)[0].name}, {shippingAddress.country}, {shippingAddress.city}, {shippingAddress.zip}
                            </Typography>
                            
                            <Typography variant='body1'>
                                {shippingAddress.phone}
                            </Typography>
                            
                            <Divider sx={{ my: 1 }}/>


                            <OrderSummary 
                                orderValues={
                                    {
                                        numberOfItems,
                                        subtotal,
                                        tax,
                                        total
                                    }
                                }                 

                            />

                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                {
                                order.isPaid ?     
                                    <Chip 
                                        variant='outlined' 
                                        label='Paid order' 
                                        color='success' 
                                        icon={ <CreditScoreOutlined/> }
                                    />
                                    :
                                    <h4>go to payment</h4>
                                }
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
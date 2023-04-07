import { NextPage, GetServerSideProps } from 'next';
import { Typography, Grid, Card, CardContent, Divider, Box, Chip,  } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';


import { AdminLayout, ShopLayout } from '@/components/layouts';
import { CartList, OrderSummary } from '@/components/cart';

import { IOrder } from '@/interfaces';
import { dbOrders } from '@/database';
import { countries } from '../../../utils/countries';



interface Props {
    order: IOrder 
}

const OrderPage: NextPage<Props> = ({ order }) => {
    


    const { _id, shippingAddress, numberOfItems, subtotal, tax, total } = order;

    

    return (
        <AdminLayout title={'View order'} subtitle={'Order ID: '+_id} icon={<AirplaneTicketOutlined sx={{fontSize:36}}/>}  >
            
            
            <Box display='flex' alignItems='center' sx={{ mb: 4, mx:3 }} justifyContent='start' gap={2}>

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
                                 {countries.filter((c) => c.code === shippingAddress.country)[0].name}, {shippingAddress.country}, {shippingAddress.city}, {shippingAddress.zip}
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


                                <Box display={'flex'} flexDirection='column' sx={{display:'flex', flex:1}} >

                                
                                    {order.isPaid ?     
                                        <Chip 
                                            variant='outlined' 
                                            label='Paid order' 
                                            color='success' 
                                            icon={ <CreditScoreOutlined/> }
                                        />
                                        :
                                        <Chip 
                                            variant='outlined' 
                                            label='Outstanding' 
                                            color='error' 
                                            icon={ <CreditCardOffOutlined/> }
                                        />
                                        
                                    }
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    
    const { id = '' } = params as { id: string };
    console.log(id);

    const order = await dbOrders.getOrderById( id );

    
    if(!order) {
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
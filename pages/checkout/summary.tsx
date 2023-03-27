import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { CartList, OrderSummary } from '@/components/cart';
import { CartContext } from '@/context';
import { countries } from '@/utils/countries';


const SummaryPage: NextPage = () => {

    const router = useRouter();
    
    const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext)
    
    const [isPosting, setIsPosting] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if( !Cookies.get('name')){
            router.push('/checkout/address')
        }  
    
    }, [router])
    
    if(!shippingAddress) return (<></>);
    
    const { name, lastname, phone, address2 = '', address, city, zip, country } = shippingAddress!;

    const onCreateOrder = async () => {
        setIsPosting(true);
        const { hasError, message } = await createOrder();
        if(hasError){
            setIsPosting(false);
            setErrorMessage(message);
            return;
        }
        router.replace(`/orders/${message}`);
    }

    return (
        <ShopLayout title={'Summary'} pageDescription='Client Summary Order'>
            <Typography variant='h1' component='h1'  sx={{ mb:1.5 }}>Order Summary</Typography>
            <Grid container>
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList />
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2' component='h2'>Order Resume ({numberOfItems} { numberOfItems===1 ? 'Item' : 'Items'})</Typography>
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
                                { name } { lastname }
                            </Typography>
                            
                            <Typography variant='body1'>
                                 {address} {', '+ address2 ? address2 : ''} 
                            </Typography>
                            
                            <Typography variant='body1'>
                                {zip} {city} {countries.filter(c=>c.code===country)[0].name}
                            </Typography>
                            
                            <Typography variant='body1'>
                                { phone }
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
                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column' gap={1}>
                                <Button 
                                    color='secondary' 
                                    className='circular-btn' 
                                    fullWidth
                                    onClick={ onCreateOrder }
                                    disabled = { isPosting }
                                    >
                                    Confirm order
                                </Button>

                                <Chip
                                    label={ errorMessage }
                                    variant='outlined'
                                    color='error'
                                    sx={{ display: errorMessage ? 'flex' : 'none' }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}



export default SummaryPage;
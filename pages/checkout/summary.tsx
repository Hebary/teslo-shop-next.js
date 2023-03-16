import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { CartList, OrderSummary } from '@/components/cart';
import { utils } from '@/utils';





interface Props {
}

const SummaryPage: NextPage<Props> = ({}) => {
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
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Confirm order
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { token='' } = req.cookies;
    
    let isValidToken = false; 

    try {
        await utils.isValidToken(token);
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }

    if( !isValidToken ) {
        return{
            redirect: {
                destination: '/auth/login?p=/checkout/summary',
                permanent: false
            }
        }
    }
    return {
        props: {
            
        }
    }
}



export default SummaryPage;
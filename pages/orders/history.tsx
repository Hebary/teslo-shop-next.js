import { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';

import { getSession } from 'next-auth/react';

import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ShopLayout } from '@/components/layouts';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';



interface Props {
    orders: IOrder[]
}

const History: NextPage<Props> = ({ orders }) => {


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'fullname', headerName: 'Full Name', width: 300 },
        
        {
            field:'Payment status',
            description:'Shows if the order has been paid',
            headerName:'Pay status',
            width: 200,
            renderCell: (params: GridRenderCellParams ) => {
                return (
                    params.row.paid ? <Chip color='success' variant='outlined'  label='Paid'/>: <Chip color='error'  variant='outlined' label='Outstanding'/>
                )
            }
        },

        {
            field:'Shipping Address',
            description:'Shows the order shipping address',
            width: 200,
            renderCell: (params: GridRenderCellParams ) => {
                return (
                    params.row.address && <Chip color='primary' variant='outlined'  label={`${params.row.address}`}/>
                )
            }
        },
        {
            field:'total', headerName:'Total', width: 200, description:'Shows the order total', align:'center', headerAlign:'center'
        },
        
        
        {
            field:'Actions',
            headerName:'Actions',
            description:'Shows the order ID and the link to the order',
            width: 200,
            sortable: false,
            renderCell: (params: GridRenderCellParams ) => {
                return (
                    <NextLink 
                        href={`/orders/${params.row.orderId}`} 
                        legacyBehavior 
                        passHref>
                            <Link 
                                color='primary' 
                                underline='none' 
                                sx={{cursor:'pointer'}} >
                                    View order 
                            </Link>
                    </NextLink>
                )
            }
        }
    
    ];


    const rows = orders.map((order, i) => ({
            id: i+1,
            paid: order.isPaid,
            fullname: `${order.shippingAddress.name} ${order.shippingAddress.lastname}`,
            address: order.shippingAddress.address,
            country: order.shippingAddress.country,
            total: order.total,
            orderId: order._id
        }))


   return (
        <ShopLayout title={'Orders history'} pageDescription={'History client orders '}>
            <Typography variant='h1' sx={{mb: 3}} component='h1'>
                Orders History
            </Typography>
            <Grid container>
                <Grid item xs={ 12 } className='fadeIn' sx={{ height:650, width:'100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>

        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({ req });

    if(!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }
    
    const orders = await dbOrders.getOrdersByUserId(session.user._id);

    return {
        props: {
            orders
        }
    }
}

export default History;
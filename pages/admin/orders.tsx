import { NextPage } from 'next';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Chip, Grid, Link } from '@mui/material';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import useSWR from 'swr';

import { AdminLayout } from '@/components/layouts';
import { IOrder, IUser } from '@/interfaces';
import { FullScreenLoading } from '@/components/ui';


const columns: GridColDef[] = [
    {field: 'id', headerName: 'Order ID', width: 200},
    {field: 'name', headerName: 'Name', width: 200, align:'center'},
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'total', headerName: 'Total', width: 150},
    {
        field: 'isPaid',
        headerName: 'Paid',
        renderCell: ({row}: GridRenderCellParams) => {
            return row.isPaid 
                ? <Chip color='success' variant='outlined' label='Paid'/>
                : <Chip color='error' variant='outlined' label='Outstanding'/> 
        }
    },
    { field: 'totalItems', headerName: 'Num. of Products', width: 150, align:'center' },
    { field: 'createdAt', headerName: 'Created At', width: 250  },

    {
        field: 'check',
        headerName: 'View Order',
        renderCell: ({row}: GridRenderCellParams) => {
            return (
                <Link underline='always' href={`/admin/orders/${row.id}`} >
                    View Order
                </Link>
            )
        }
    },
];


const Orders: NextPage = ({}) => {
    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');
    
    if(!data && !error) return (<FullScreenLoading/>);

    const rows = data!.map((order) => ({
        id        : order._id,
        email     : (order.user as IUser).email,
        name      : (order.user as IUser).name,
        total     : order.total,
        isPaid    : order.isPaid,
        totalItems: order.orderItems.length,
        createdAt : order.createdAt,
        
    }))

    return (
        <AdminLayout
            title='Orders'
            subtitle='Orders Panel Admin'
            icon={<ConfirmationNumberOutlined sx={{mt: 0.5,fontSize:35}}/>}
        >   
        
        <Grid container >
                <Grid item xs={ 12 } className='fadeIn' sx={{my:'20px', height:'650px', width:'100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>

             
        </AdminLayout>
    )
}

export default Orders;
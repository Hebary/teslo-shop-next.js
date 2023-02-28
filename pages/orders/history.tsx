import { ShopLayout } from '@/components/layouts';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { NextPage } from 'next';
import NextLink from 'next/link';



interface Props {
}

const History: NextPage<Props> = ({}) => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'fullname', headerName: 'Full Name', width: 300 },
        
        {
            field:'paid',
            headerName:'Pay status',
            description:'Shows if the order has been paid',
            width: 200,
            renderCell: (params: GridRenderCellParams ) => {
                return (
                    params.row.paid ? <Chip color='success' variant='outlined'  label='Paid'/>: <Chip color='error'  variant='outlined' label='Outstanding'/>
                )
            }
        },
        {
            field:'actions',
            headerName:'Actions',
            description:'Shows the order ID and the link to the order',
            width: 200,
            sortable: false,
            renderCell: (params: GridRenderCellParams ) => {
                return (
                    <NextLink href={`/orders/${params.row.id}`} passHref>
                        <Link color='secondary' underline='none' component='span' sx={{cursor:'pointer'}} >
                            <Typography variant='body2' color='black'>
                                View order 
                            </Typography>
                        </Link>
                    </NextLink>
                )
            }
        }
    
    ];
    const rows = [
        { id:'1', paid:true, fullname:"Bernardo D'Addario" },
        { id:'2', paid:false, fullname:"Jorge Rios" },
        { id:'3', paid:true, fullname:"Laura Torres" },
        { id:'4', paid:false, fullname:"Juan Perez" }
    ];
   return (
        <ShopLayout title={'Orders history'} pageDescription={'History client orders '}>
            <Typography variant='h1' sx={{mb: 3}} component='h1'>
                Orders History
            </Typography>
            <Grid container>
                <Grid item xs={ 12 } sx={{ height:650, width:'100%' }}>
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

export default History;
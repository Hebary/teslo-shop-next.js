import { NextPage } from 'next';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { CardMedia, Chip, Grid, Link } from '@mui/material';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import useSWR from 'swr';

import { AdminLayout } from '@/components/layouts';
import { IProduct } from '@/interfaces';
import { FullScreenLoading } from '@/components/ui';


const columns: GridColDef[] = [
    { field: 'img', headerName: 'Image', 
        renderCell:({ row }: GridRenderCellParams) => {
            return (
                <Link href={`/product/${row.slug}`} target='_blank' rel='nonreferrer'>
                    <CardMedia
                        sx={{objectFit:'cover'}}
                        component='img'
                        image={`/products/${row.img}`}
                    />
                </Link>
            )

        } 
    },
    { field: 'title', headerName: 'Title', width: 250, align:'center' },
    { field: 'gender', headerName: 'Gender', width: 150 },
    { field: 'type', headerName: 'Type', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'sizes', headerName: 'Sizes', width: 200 },
    {   
        field: 'inStock',
        headerName: 'Inventory',
        renderCell: ({ row }: GridRenderCellParams) => {
            return row.inStock > 0 
                ? <Chip color='success' variant='outlined' label={row.inStock}/>
                : <Chip color='error' variant='outlined' label={row.inStock}/> 
        }
    },

    
];


const Products: NextPage = () => {
    const { data, error } = useSWR<IProduct[]>('/api/admin/products');
    
    if(!data && !error) return (<FullScreenLoading/>);

    const rows = data!.map((product) => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        inStock:product.inStock,
        gender: product.gender,
        type: product.type,
        price: '$ '+product.price,
        slug: product.slug,
        sizes: product.sizes.join(', '),

    }));

    return (
        <AdminLayout
            title={`Products ${ data?.length }`}
            subtitle='Products Panel Admin'
            icon={<ConfirmationNumberOutlined sx={{ mt: 0.5, fontSize: 35 }}/>}
        >   
        
        <Grid container >
            <Grid item xs={ 12 } className='fadeIn' sx={{ my:'20px', height:'650px', width:'100%' }}>
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

export default Products;
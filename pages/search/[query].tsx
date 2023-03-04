import { NextPage,GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { FullScreenLoading } from '@/components/ui';
import { ProductList } from '../../components/products';
import { IProduct } from '@/interfaces';
import { dbProducts } from '../../database';



interface Props {
    productsBySearch: IProduct[]
    foundProducts: boolean
    query: string
}

const SearchPage: NextPage<Props> = ({ productsBySearch, foundProducts, query }) => {

    return (
        <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Search the Best Teslo Products Here'}>
            <Typography  variant='h5' sx={{ mt:3 }}>Product search{productsBySearch.length < 52 ? `: ${productsBySearch.length} results` : ''}</Typography>
            <Box display='flex' gap={1} alignItems='center' sx={{mb:5}}>
                {
                    foundProducts 
                        ?   <Typography  variant='body1' sx={{ml:.5, my:1 }}>Results for</Typography> 
                        :   <Typography  variant='body1' sx={{ml:.5, my:1 }}>No results for</Typography>
                }
                <Typography  variant='subtitle1' sx={{ my:1 }}> &#x2192; {` ' ${query} ' `}</Typography>
            </Box>
            
            <ProductList products={ productsBySearch }/>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps<Props> = async ({params}) => {
    const { query='' } = params as { query: string };

    if(query.length === 0){
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }
    
    let productsBySearch = await dbProducts.getProductsBySearch(query);
    const foundProducts = productsBySearch.length > 0;
    if(!foundProducts){
        productsBySearch = await dbProducts.getAllProducts();
    }

    return {
        props: {
            productsBySearch,
            foundProducts,
            query
        }
    }
}

export default SearchPage;
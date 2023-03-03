import { NextPage,GetServerSideProps } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { FullScreenLoading } from '@/components/ui';
import { ProductList } from '../../components/products';
import { IProduct } from '@/interfaces';
import { dbProducts } from '../../database';



interface Props {
    productsBySearch: IProduct[]
}

const SearchPage: NextPage<Props> = ({ productsBySearch }) => {

    return (
        <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Search the Best Teslo Products Here'}>
            <Typography  variant='h4' sx={{ my:3 , ml:.5}}>{` Search results: ${ productsBySearch.length } `}</Typography>
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
    
    if(!productsBySearch){
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }

    return {
        props: {
            productsBySearch
        }
    }
}

export default SearchPage;
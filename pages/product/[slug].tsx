import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ProductSlideshow, SizeSelector } from '@/components/products';
import { ShopLayout } from '@/components/layouts';
import { ItemCounter } from '@/components/ui';
import { IProduct } from '@/interfaces';
import { dbProducts } from '@/database';
import { ParsedUrlQuery } from 'querystring';



interface Props {
    product: IProduct
}

interface Params extends ParsedUrlQuery {
    slug: string
}

const ProductPage: NextPage<Props> = ({ product }) => {
 
    return (
        <ShopLayout title={ `${product.title}` } pageDescription={` ${product.description}` }>
            <Grid container spacing={ 3 }>
                
                <Grid item xs={ 12 } sm={ 7 }>
                    <ProductSlideshow images={product.images}/>
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>

                    <Box display='flex' sx={{my:2}} flexDirection='column'>
                        {/* Titles */}
                        <Typography variant='h1' component='h1'>{ product.title }</Typography>
                        <Typography variant='subtitle1' sx={{mt:.5}} component='h2'>{`$ ${product.price}` }</Typography>
                    </Box>
                    
                    <SizeSelector selectedSizes={''} availableSizes={product.sizes} />

                    <Box sx={{ my:2 }}>
                    {/* Quantity */}
                        <Typography variant='subtitle2' component='h2'>Quantity</Typography>
                        <ItemCounter stock={product.inStock}/>
                    </Box>
                    
                    
                    <Button className='circular-btn' fullWidth>Add to Cart</Button>

                    {/* <Chip label="Sorry, this product is not available."/> */}

                    <Box sx={{ my:2 }}>
                        <Typography variant='subtitle2' sx={{mb:1.5}} component='h2'>Description</Typography>
                        <Typography variant='body2' component='h2'>{ product.description }</Typography>
                    
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths<Params> = async (ctx) => {
    const slugs = await dbProducts.getAllProductSlugs() // your fetch function here 
    return {
        paths: slugs.map(({ slug }) => ({
            params: {
                slug
            }
        })),
        fallback: "blocking"
    }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
    const { slug = '' } = params as { slug: string };
    const product = await dbProducts.getProductBySlug(slug) // your fetch function here 

    if (!product) {
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }

    return {
        props: {
            product,
        },
        revalidate: 86400
    }
}


export default ProductPage;
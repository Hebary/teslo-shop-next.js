import { Grid } from "@mui/material"
import { IProduct } from '@/interfaces';
import { ProductCard } from "./";


interface Props {
    products: IProduct[]
}

export const ProductList: React.FC<Props> = ({products}) => {
   return (
        <Grid container spacing={4} className='fadeInUp' >
            {
                products.map(product => (
                    <ProductCard 
                        key={product.slug} 
                        product={product} 
                    />
                ))
            }
        </Grid>
    )
}

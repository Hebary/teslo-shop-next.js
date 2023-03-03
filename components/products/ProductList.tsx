import { Grid } from "@mui/material"
import { IProduct } from '@/interfaces';
import { ProductCard } from "./";
import { ProductSearchResult } from '../../interfaces/products';


interface Props {
    products: IProduct[]
}

export const ProductList: React.FC<Props> = ({products}) => {
   return (
        <Grid container spacing={4} >
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

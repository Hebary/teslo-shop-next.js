import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import { IProduct } from "@/interfaces"




interface Props {
    product: IProduct
}

export const ProductCard: React.FC<Props> = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false);

    const productImage = useMemo(() => (
             isHovered 
            ? product.images[1] 
            : product.images[0]
            ),
            [product.images, isHovered]
        );

    return (
        <Grid
            item xs={6} sm={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card>
                <CardActionArea title="View Product">
                    <CardMedia
                        component={'img'}
                        alt={product.title}
                        image={ `products/${ productImage }` }
                        className='fadeIn'
                    />
                </CardActionArea>
            </Card>

            <Box sx={{ mt:1 }} className='fadeIn' >
                <Typography fontWeight={500} sx={{ mb:1 }}>{product.title}</Typography>
                <Typography fontWeight={700}> {` $ ${product.price}` }</Typography>
            </Box>
        </Grid>
    )
}

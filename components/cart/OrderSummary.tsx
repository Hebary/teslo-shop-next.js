import { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from '@/context';
import { utils } from '@/utils';




export const OrderSummary: React.FC = () => {

    const { numberOfItems, subtotal, tax, total } = useContext(CartContext);
    
    return (
        <Grid container>
            <Grid item sx={{ mt:1 }} xs={ 6 } >
                <Typography >Selected</Typography>    
            </Grid>     

            <Grid item sx={{ mt:1 }} xs={ 6 } display='flex' justifyContent='end'>
                <Typography>{ numberOfItems }{ numberOfItems > 1 ? ' items' : ' item' }</Typography>    
            </Grid>                 

            <Grid item  xs={ 6 }>
                <Typography >Subtotal</Typography>    
            </Grid>                 

            <Grid item  xs={ 6 } display='flex' justifyContent='end'>
                <Typography >{ utils.format(subtotal) }</Typography>    
            </Grid>             

            <Grid item  xs={ 6 }>
                <Typography >{`Taxes (${ Number(process.env.NEXT_PUBLIC_TAXRATE) * 100 }) %`}</Typography>    
            </Grid>                 

            <Grid item  xs={ 6 } display='flex' justifyContent='end'>
                <Typography >{ utils.format(tax) }</Typography>    
            </Grid>                 

            <Grid item sx={{ mt: 1 }}  xs={ 6 }>
                <Typography variant='subtitle1' >Total</Typography>    
            </Grid>                 

            <Grid item sx={{ mt:1 }} xs={ 6 } display='flex' justifyContent='end'>
                <Typography variant='subtitle1' >{ utils.format(total) }</Typography>    
            </Grid>                 

        </Grid>
    )
}

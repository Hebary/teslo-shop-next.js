import { Grid, Typography, Divider } from '@mui/material';




export const OrderSummary: React.FC = () => {


return (
        <Grid container>
            <Grid item sx={{mt:1}} xs={ 6 } >
                <Typography >Selected products</Typography>    
            </Grid>     

            <Grid item sx={{ mt:1 }} xs={ 6 } display='flex' justifyContent='end'>
                <Typography>3</Typography>    
            </Grid>                 

            <Grid item  xs={ 6 }>
                <Typography >Subtotal</Typography>    
            </Grid>                 

            <Grid item  xs={ 6 } display='flex' justifyContent='end'>
                <Typography >{`$${ 155.45}`}</Typography>    
            </Grid>             

            <Grid item  xs={ 6 }>
                <Typography >Taxes (10%)</Typography>    
            </Grid>                 

            <Grid item  xs={ 6 } display='flex' justifyContent='end'>
                <Typography >{`$${ 10.15}`}</Typography>    
            </Grid>                 

            <Grid item sx={{mt:1}}  xs={ 6 }>
                <Typography variant='subtitle1' >Total</Typography>    
            </Grid>                 

            <Grid item sx={{mt:1}} xs={ 6 } display='flex' justifyContent='end'>
                <Typography variant='subtitle1' >{`$${ 165.60}`}</Typography>    
            </Grid>                 

        </Grid>
    )
}

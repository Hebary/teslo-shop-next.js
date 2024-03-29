import { CreditCardOffOutlined } from "@mui/icons-material";
import { Card, CardContent, Grid, Typography } from "@mui/material";




interface Props {
    title: string | number;
    subtitle: string;
    icon: JSX.Element
}

export const SummaryTile: React.FC<Props> = ({ title, subtitle, icon }) => {
   return (
        <Grid item xs={12} sm={4} md={3}>
            <Card sx={{display:'flex'}} >
                <CardContent sx={{ width:50, mb:4, display:'flex', justifyContent:'center', alignItems:'center' }}>
                    {icon}
                </CardContent> 
                <CardContent sx={{flex:'1 0 auto', display:'flex', flexDirection:'column'}}>
                    <Typography className='red-hat-font' variant='h4'>{ title }</Typography> 
                    <Typography className='red-hat-font' fontSize='15px' fontWeight={'bold'} variant='caption'>{ subtitle }</Typography> 
                </CardContent> 
            </Card>
        </Grid>
    )
}

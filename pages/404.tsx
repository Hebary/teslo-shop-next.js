import { NextPage } from 'next';
import { ShopLayout } from '@/components/layouts';
import { Box, Typography } from '@mui/material';



interface Props {
}

const Page404: NextPage<Props> = ({}) => {
   return (
        <ShopLayout title='Something Went Wrong' pageDescription='Nothing to show here'>
            <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                height='calc(100vh - 200px)'
                sx={{flexDirection:{xs:'column', sm:'row'}}}
                >
                <Typography variant='h1' fontSize={40} fontWeight={400} >404 |</Typography>
                <Typography variant='h1' fontSize={20} sx={{ml:.8}} fontWeight={400} >Page could not be found.</Typography>
            </Box>
        </ShopLayout>
    )
}

export default Page404;
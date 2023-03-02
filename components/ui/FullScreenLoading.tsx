import { Box, CircularProgress, Typography } from "@mui/material"




interface Props {
}

export const FullScreenLoading: React.FC<Props> = ({}) => {
   return (
             <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center'
                gap={2} 
                height='calc(100vh - 200px)'
                flexDirection='column'
            >
                <Typography className='red-hat-font' variant='h2'>Loading...</Typography>
                <CircularProgress thickness={ 3 }/>
                
            </Box>
    )
}

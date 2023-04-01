
import { Box } from '@mui/system';
import { AdminNavbar } from '../admin/AdminNavbar';
import { Typography } from '@mui/material';

interface Props {
    title?: string
    subtitle?: string
    icon? : JSX.Element
    children: React.ReactElement | React.ReactElement[]
}


export const AdminLayout: React.FC<Props> = ({ children, title = '', subtitle = '', icon }) => {
   return (
    <>
        <nav>
            <AdminNavbar/>
        </nav>
       <main style={{ 
                    margin: '80px auto',
                    maxWidth: '1440px',
                    padding: '0 20px', 
                }}>
                    <Box display='flex' flexDirection='column'>
                        <Typography variant='h1' component ='h1'> 
                            { icon }
                            { title }
                        </Typography>
                        <Typography variant='h2' sx={{mb:1}} >
                            { subtitle }
                        </Typography>
                    </Box>
                    <Box className='fadeIn'>
                        { children }
                    </Box>
       </main>
    </>
   )
}
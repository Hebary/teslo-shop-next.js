
import { Box } from '@mui/system';
import { AdminNavbar } from '../admin/AdminNavbar';
import { Typography } from '@mui/material';
import { Sidemenu } from '../ui';

interface Props {
    title: string
    subtitle: string
    icon? : JSX.Element
    children: React.ReactElement | React.ReactElement[]
}


export const AdminLayout: React.FC<Props> = ({ children, title, subtitle, icon }) => {
   return (
    <>
        <nav>
            <AdminNavbar/>
        </nav>

        <Sidemenu/>

        <main style={{ 
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0 20px', 
            }}>
                <Box display='flex' flexDirection='column'>
                    <Typography variant='h4' display='flex' alignItems='center' className='red-hat-font' sx={{ mb:1}}>
                        { icon }
                        {' '}{ title }
                    </Typography>
                    <Typography variant='h5' className='red-hat-font' sx={{ ml: 3}}>
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
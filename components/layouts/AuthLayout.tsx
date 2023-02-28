import Head from 'next/head';
import { Box } from '@mui/material';

interface Props {
    title?: string
    children: React.ReactElement | React.ReactElement[]
}

export const AuthLayout: React.FC<Props> = ({ children, title = '' }) => {
   return (
    <>
       <Head>
          <title>{ title }</title>
       </Head>
        
       <main style={{ padding: '10px 20px' }}>
            <Box display='flex' justifyContent='center' alignItems='center' height={'calc(100vh - 100px)'}>
                {children}
            </Box>
       </main>
    </>
   )
}
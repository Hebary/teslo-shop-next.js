import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Toolbar, Typography, Link, Box, IconButton } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import { UIContext } from '@/context';



interface Props {
}

export const AdminNavbar: React.FC<Props> = ({}) => {

    const { toggleMenu } = useContext(UIContext);

    return (
        <AppBar>
            <Toolbar  color='black'>
                <NextLink href='/' passHref legacyBehavior>
                    <Link display='flex' alignItems='center'>
                        <Typography sx={{ fontSize: '22px' }} className='red-hat-font'>Teslo</Typography>
                        <Typography sx={{ ml: 0.5, fontSize:'22px' }} fontWeight='light' className='red-hat-font'>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1}/>
                
                <IconButton onClick={toggleMenu}>
                    <MenuOutlined color='primary'/>
                </IconButton>
        
            </Toolbar>
        </AppBar>
    )
}

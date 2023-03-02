import NextLink from 'next/link';
import { useRouter } from 'next/router'
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge } from '@mui/material';
import { ShoppingCartOutlined, SearchOutlined, MenuOutlined } from '@mui/icons-material';
import { useContext } from 'react';
import { UIContext } from '@/context';



interface Props {
}

export const Navbar: React.FC<Props> = ({}) => {

    const router = useRouter();
    const { toggleMenu } = useContext(UIContext);

    return (

        <AppBar>
            <Toolbar  color='black'>
                <NextLink href='/' passHref legacyBehavior>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Teslo</Typography>
                        <Typography sx={{ ml: 0.5, fontSize:'22px' }} fontWeight='light' className='red-hat-font'>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1}/>

                <Box gap={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <NextLink href='/category/women' passHref legacyBehavior>
                        <Link>
                            <Button color={router.pathname==='/category/women' ? 'primary' : 'info'}>
                                Women
                            </Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/men' passHref legacyBehavior>
                        <Link>
                            <Button color={router.pathname==='/category/men' ? 'primary' : 'info'}>
                                Men
                            </Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/kid' passHref legacyBehavior>
                        <Link>
                            <Button color={router.pathname==='/category/kid' ? 'primary' : 'info'}>
                                Kids
                            </Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1}/>
                <Box display='flex' alignItems='center' gap={1}>

                    <IconButton>
                        <SearchOutlined color='primary'/>
                    </IconButton>

                    <NextLink href='/cart' passHref legacyBehavior>
                        <Link>
                            <Badge badgeContent={2} color='secondary' >
                                <ShoppingCartOutlined/>
                            </Badge>
                        </Link>
                    </NextLink>

                    <IconButton onClick={toggleMenu}>
                        <MenuOutlined color='primary'/>
                    </IconButton>
            
                </Box>
            </Toolbar>
        </AppBar>
    )
}

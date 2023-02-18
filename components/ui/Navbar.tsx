import NextLink from 'next/link';
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge } from '@mui/material';
import { ShoppingCartOutlined, SearchOutlined } from '@mui/icons-material';



interface Props {
}

export const Navbar: React.FC<Props> = ({}) => {
   return (

        <AppBar>
            <Toolbar  color='black'>
                <NextLink href='/' passHref legacyBehavior>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Teslo</Typography>
                        <Typography sx={{ ml: 0.5, mt: 0.3 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1}/>

                <Box display='flex' gap={1}>
                    <NextLink href='/category/woman' passHref legacyBehavior>
                        <Link>
                            <Button>
                                Woman
                            </Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/men' passHref legacyBehavior>
                        <Link>
                            <Button>
                                Men
                            </Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/kid' passHref legacyBehavior>
                        <Link>
                            <Button>
                                Kids
                            </Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1}/>

                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                
                <NextLink href='/cart' passHref legacyBehavior>
                    <Link>
                        <Badge badgeContent={2} color='secondary' >
                            <ShoppingCartOutlined/>
                        </Badge>
                    </Link>
                </NextLink>
                
                <Button>
                    Menu
                </Button>
            
            </Toolbar>
        </AppBar>
    )
}

import NextLink from 'next/link';
import { useRouter } from 'next/router'
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge, Input, InputAdornment } from '@mui/material';
import { ShoppingCartOutlined, SearchOutlined, MenuOutlined, ClearOutlined } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { UIContext } from '@/context';



interface Props {
}

export const Navbar: React.FC<Props> = ({}) => {

    const {pathname, push} = useRouter();
    const { toggleMenu } = useContext(UIContext);
    const [search, setSearch] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearch = () => {
        if(search.trim().length === 0) return;
            push(`/search/${ search }`);
    }

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

                <Box gap={3} className='fadeIn' sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'flex' } }}>
                    <NextLink href='/category/women' passHref legacyBehavior>
                        <Link>
                            <Button color={ pathname==='/category/women' ? 'primary' : 'info' }>
                                Women
                            </Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/men' passHref legacyBehavior>
                        <Link>
                            <Button color={ pathname==='/category/men' ? 'primary' : 'info' }>
                                Men
                            </Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/kid' passHref legacyBehavior>
                        <Link>
                            <Button color={ pathname==='/category/kid' ? 'primary' : 'info' }>
                                Kids
                            </Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1}/>
                
                <Box display='flex' alignItems='center' gap={1}>

                {/* sm */}

                {
                isSearchVisible ?
                    (
                        <Input
                            sx={{ display: { xs: 'none', sm: 'flex'} }}
                            className='fadeIn'
                            type='text'
                            autoFocus   
                            value={search}
                            onChange={ (e) => setSearch( e.target.value ) }
                            onKeyUp={ (e) => e.key === 'Enter' && onSearch()}
                            placeholder="Search..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ ()=> setIsSearchVisible(!isSearchVisible) }
                                    >
                                     <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        /> 
                    ) 
                :   
                    (
                        <IconButton
                            onClick={ ()=> setIsSearchVisible(!isSearchVisible) }
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                            className='fadeIn'

                        >
                            <SearchOutlined color='primary' />
                        </IconButton>
                    )
                }

                    {/* xs */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggleMenu}
                >
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

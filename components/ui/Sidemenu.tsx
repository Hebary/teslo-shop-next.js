import { useContext, useState } from "react"
import { useRouter } from 'next/router'
import { AuthContext, UIContext } from "@/context"
//Components
import { 
    Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader 
} from "@mui/material"
// Icons
import { 
    AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, DashboardOutlined, EscalatorWarningOutlined, FemaleOutlined, 
    LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined 
} from "@mui/icons-material"



export const Sidemenu: React.FC = () => {

    const { isMenuOpen, toggleMenu } = useContext(UIContext);

    const { isLogged, user, logout } = useContext(AuthContext)
    
    const { push, asPath }= useRouter()    
    
    const [search, setSearch] = useState('');
    
           
    const onSearch = () => {
        if(search.trim().length === 0) return;
            navigateTo(`/search/${ search }`);
    }

    const navigateTo = (path: string) => { 
        toggleMenu();
        push(path);
    }
    

    return (
        <Drawer
            open={ isMenuOpen }
            onClose={ toggleMenu }
            anchor='right'
            sx={{ backdropFilter:'blur(4px)', transition: 'all .7s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        type='text'
                        autoFocus   
                        value={search}
                        onChange={ (e) => setSearch( e.target.value ) }
                        onKeyUp={ (e) => e.key === 'Enter' ? onSearch() : null}
                        placeholder="Search..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ onSearch }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>
                { isLogged &&
                    <>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountCircleOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Profile'} />
                        </ListItemButton>
                    
                        <ListItemButton
                            onClick={ ()=> navigateTo('/orders/history') }
                        >
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'My Orders'} />
                        </ListItemButton>
                    </>
                }

                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick={ ()=> navigateTo('/category/men') }
                >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Men'} />
                </ListItemButton>

                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick={ ()=> navigateTo('/category/women') }
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Women'} />
                </ListItemButton>

                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick={ ()=> navigateTo('/category/kid') }
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Kids'} />
                </ListItemButton>

                {
                    !isLogged ?
                    <ListItemButton
                        onClick={ ()=> navigateTo(`/auth/login?p=${ asPath }`)}
                    >
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Log in'} />
                    </ListItemButton>
                    :
                    <ListItemButton
                        onClick={ logout }
                            >
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                        <ListItemText primary={'Log out'} />
                    </ListItemButton>
                }


                {/* Admin */}

                <Divider />
                { isLogged && user?.role === 'admin' &&
                <>
                    <ListSubheader>Admin Panel</ListSubheader>

                    <ListItemButton
                        onClick ={ ()=> navigateTo('/admin')}
                    >
                        <ListItemIcon>
                            <DashboardOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItemButton>
                    
                    <ListItemButton>
                        <ListItemIcon>
                            <CategoryOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Products'} />
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Orders'} />
                    </ListItemButton>

                    <ListItemButton
                        onClick ={ ()=> navigateTo('/admin/users')}
                    >
                        <ListItemIcon>
                            <AdminPanelSettings/>
                        </ListItemIcon>
                        <ListItemText primary={'Users'} />
                    </ListItemButton>
                </>
                }
            </List>
        </Box>      
        </Drawer>
    )
}

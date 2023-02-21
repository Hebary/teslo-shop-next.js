import { 
    Box, 
    Divider, 
    Drawer, 
    IconButton, 
    Input, 
    InputAdornment, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    ListSubheader 
} from "@mui/material"

// Icons
import { 
    AccountCircleOutlined, 
    AdminPanelSettings, 
    CategoryOutlined, 
    ConfirmationNumberOutlined, 
    EscalatorWarningOutlined, 
    FemaleOutlined, 
    LoginOutlined, 
    MaleOutlined, 
    SearchOutlined, 
    VpnKeyOutlined 
} from "@mui/icons-material"
import { useMemo, useState } from "react";


interface Props {

}

export const Sidemenu: React.FC<Props> = ({}) => {
    
        
   
    return (
        <Drawer
            open={ false }
            anchor='right'
            sx={{ backdropFilter:'blur(4px)', transition: 'all .7s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        type='text'
                        placeholder="Search..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                <ListItemButton>
                    <ListItemIcon>
                        <AccountCircleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Perfil'} />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mis Ordenes'} />
                </ListItemButton>


                <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItemButton>

                <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Woman'} />
                </ListItemButton>

                <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Kids'} />
                </ListItemButton>


                <ListItemButton>
                    <ListItemIcon>
                        <VpnKeyOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Sign In'} />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <LoginOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Sign Out'} />
                </ListItemButton>


                {/* Admin */}
                <Divider />
                <ListSubheader>Admin Panel</ListSubheader>

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

                <ListItemButton>
                    <ListItemIcon>
                        <AdminPanelSettings/>
                    </ListItemIcon>
                    <ListItemText primary={'Users'} />
                </ListItemButton>
            </List>
        </Box>      
        </Drawer>
    )
}

import { NextPage } from "next"
import { ShopLayout } from "@/components/layouts"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';


interface Props {
}

const Address: NextPage<Props> = ({}) => {
   return (
        <ShopLayout title='Checkout - Address' pageDescription='client address pre-check'>
            <Typography component='h2' fontWeight={500} fontSize={28} className='red-hat-font' variant='h2' sx={{ mb: 3 }} >Complete your address</Typography>
            <Grid container spacing={ 2 }>
                <Grid item xs={ 12 } sm={6}>
                    <TextField fullWidth variant='filled' label='Name'/>
                </Grid>
                
                <Grid item xs={ 12 } sm={6}>
                    <TextField fullWidth variant='filled' label='Lastname'/>
                </Grid>

                <Grid item xs={ 12 } sm={6}>
                    <TextField fullWidth variant='filled' label='Address'/>
                </Grid>
                
                <Grid item xs={ 12 } sm={6}>
                    <TextField fullWidth variant='filled' label='Address (2) optional'/>
                </Grid>

                <Grid item xs={ 12 } sm={6}>
                    <TextField fullWidth variant='filled' label='Postal Code'/>
                </Grid>

                <Grid item xs={ 12 } sm={6}>
                    <TextField fullWidth variant='filled' label='City'/>
                </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth >
                            <Select
                                variant='filled'
                                label='country'
                                value={1}
                            >
                                <MenuItem value={1}>Costa Rica</MenuItem>
                                <MenuItem value={2}>España</MenuItem>
                                <MenuItem value={3}>Colombia</MenuItem>
                                <MenuItem value={4}>Ecuador</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField label='phone' variant='filled' fullWidth />
                    </Grid>

            </Grid>
                <Box display='flex'  justifyContent='center' sx={{ mt:5, mx:55 }}>
                    <Button variant='contained' fullWidth sx={{ p:1 }} className='circular-btn' color='primary' >
                        Check My Order
                    </Button>
                </Box>
        </ShopLayout>
    )
}

export default Address


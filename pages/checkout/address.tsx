import { useContext } from "react";
import { NextPage } from "next"
import { useRouter } from 'next/router'

import { useForm } from "react-hook-form";
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import Cookies from "js-cookie";

import { ShopLayout } from "@/components/layouts"
import { countries } from "@/utils/countries";
import { CartContext, ShippingAddress } from "@/context";


type FormData = {
    name     : string;
    lastname : string;
    address  : string;
    address2?: string;
    phone    : string;
    zip      : string;
    city     : string;
    country  : string; 
}

const getAddressFromCookies = (): FormData => {
    return {
        name     :  Cookies.get('name') || '',
        lastname :  Cookies.get('lastname') || '',
        address  :  Cookies.get('address') || '',
        address2 :  Cookies.get('address2') || '',
        phone    :  Cookies.get('phone') || '',
        zip      :  Cookies.get('zip') || '',
        city     :  Cookies.get('city') || '',
        country  :  Cookies.get('country') || ''
    }
}

const Address: NextPage = () => {
    
    const { updateAddress } = useContext(CartContext);

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });
    
    const onAddressSubmit = async (data: FormData) => {
        updateAddress(data as ShippingAddress);
        router.push('/checkout/summary')
    }

    return (
        <ShopLayout title='Checkout - Address' pageDescription='client address pre-checkout'>
        <form onSubmit={handleSubmit(onAddressSubmit)}>
            <Typography component='h2' fontWeight={500} fontSize={28} className='red-hat-font' variant='h2' sx={{ mb: 3 }} >Complete your address</Typography>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 } sm={6}>
                        <TextField 
                            fullWidth 
                            variant='filled' 
                            label='Name'
                            {...register('name', { required: 'Name is required' })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={6}>
                        <TextField 
                            {...register('lastname', { required: 'Lastname is required' })}
                            error={!!errors.lastname}
                            helperText={errors.lastname?.message} 
                            fullWidth 
                            variant='filled' 
                            label='Lastname'
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={6}>
                        <TextField 
                            fullWidth 
                            variant='filled' 
                            label='Address'
                            {...register('address', { required: 'Address is required' })}
                            error={!!errors.address}
                            helperText={errors?.address?.message}    
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={6}>
                        <TextField 
                            fullWidth 
                            variant='filled' 
                            label='Address (2)'
                            {...register('address2')}

                            />
                    </Grid>

                    <Grid item xs={ 12 } sm={6}>
                        <TextField 
                            fullWidth 
                            variant='filled' 
                            label='Postal Code'
                            {...register('zip', { required: 'Postal Code is required' })}
                            error={!!errors.zip}
                            helperText={errors?.zip?.message}
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={6}>
                        <TextField 
                        fullWidth 
                        variant='filled' 
                        label='City'
                        {...register('city', { required: 'City is required' })}
                        error={!!errors.city}
                        helperText={errors?.city?.message }
                        />
                    </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth >
                                <TextField
                                    select
                                    variant='filled'
                                    label='country'
                                    defaultValue={ Cookies.get('country') || countries[0].code }
                                    {...register('country', { required: 'Country is required' })}
                                    error={!!errors.country}
                                    helperText={errors?.country?.message}
                                >
                                    {
                                        countries.map( (country) => (
                                            <MenuItem key={country.code} value={country.code}>
                                                {country.name}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField 
                                {...register('phone', { required: 'Phone is required' })}
                                error={!!errors.phone}
                                helperText={errors?.phone?.message}
                                label='phone' 
                                variant='filled' 
                                fullWidth />
                        </Grid>
                </Grid>
                <Box display='flex' justifyContent='center' sx={{ mt:5 }}>
                    <Button type='submit' variant='contained' sx={{ width:'50%', p: 1 }} className='circular-btn' color='primary' >
                        Check My Order
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// - The only way in Next.js versions 12 or below: Server processing the same content 
// over and over again but that won't change for long and if it does, it will be minimal.
// thats why i m using middleware.ts in the root


// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//     const { token='' } = req.cookies;
    
//     let isValidToken = false; 

//     try {
//         await utils.isValidToken(token);
//         isValidToken = true;
//     } catch (error) {
//         isValidToken = false;
//     }

//     if( !isValidToken ) {
//         return{
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false
//             }
//         }
//     }
//     return {
//         props: {
            
//         }
//     }
// }



export default Address


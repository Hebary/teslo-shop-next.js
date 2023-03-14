import { useState } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from '@/components/layouts';
import { utils } from '@/utils';
import { tesloApi } from '@/api';


type FormData = {
    email: string;
    password: string;
}

const Login: NextPage = ({}) => {
 
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    
    const [error, setError] = useState(false);

    const onLogin = async ({ email, password }: FormData) => {
        
        setError(false);
 
        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;
            console.log({ token, user })
        } catch (error) {
            setError(true);
            setTimeout(() => setError(false), 3000);
            
        }
        // TODO: navegar a la pagina en la que el ususario estaba. 
    }

   return (
        <AuthLayout title='Login page'>

            <form onSubmit={ handleSubmit(onLogin) }>
                <Box  sx={{ width:'350px' }}>
                        <Grid container spacing={ 3 }>

                            <Grid item xs={ 12 }>
                                <Typography variant='h1' component='h1' fontWeight={ 400 } sx={{ ml:1 }}>Login</Typography>
                                
                                <Chip
                                    
                                    label='Please check your credentials'
                                    color='error'
                                    className='fadeIn'
                                    icon= {<ErrorOutline/>}
                                    variant='outlined'
                                    sx={{ display: error ? 'flex' : 'none' , mt:1 }}
                                />

                            </Grid>

                            <Grid item xs={ 12 } >
                                <TextField 
                                    type='email'
                                    {...register('email',{
                                        required: 'Email is required',
                                        validate: utils.isEmail
                                    })}
                                    error={ !!errors.email }
                                    helperText={errors.email?.message}
                                    variant='filled' 
                                    fullWidth 
                                    label='Email' />
                            </Grid>

                            <Grid item xs={ 12 } >
                                <TextField
                                    {...register('password',{
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6, message:'Password must be at least 6 characters'
                                        }
                                    })} 
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    variant='filled' 
                                    type={'password'} 
                                    fullWidth 
                                    label='Password' />
                            </Grid>

                            <Grid item xs={ 12 } display='flex' justifyContent='center'>
                                <Button type='submit' color='secondary' fullWidth className='circular-btn' size='large' >
                                    Sign in
                                </Button>
                            </Grid>

                            <Grid item xs={ 12 } display='flex' justifyContent='end'>
                                <NextLink href='register' passHref>
                                    <Link component='span'>
                                        <Typography variant='body2' color='black'>
                                            Don&apos;t have an account? Register
                                        </Typography>
                                    </Link>
                                </NextLink>
                            </Grid>

                        </Grid>
                    </Box>
            </form>
        </AuthLayout>
    )
}

export default Login;
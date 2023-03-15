import { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import { NextPage } from 'next';
import NextLink from 'next/link';
import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { tesloApi } from '@/api';
import { AuthLayout } from '@/components/layouts';
import { utils } from '@/utils';
import { AuthContext } from '@/context';


type FormData =  {
    name: string;
    email: string;
    password: string;
}

const RegisterPage: NextPage = () => {
    
    const { registerUser } = useContext(AuthContext);
    
    const { replace, query } = useRouter()    

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    
    const [error, setError] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    
    const onRegister = async ({ name, email, password }: FormData) => {
        
        const { hasError, message } = await registerUser(name, email, password);
        setError(false);
        console.log(hasError)
        if(hasError) {
            setError(true);
            setErrorMessage(message!)
            setTimeout(() => setError(false), 3000);
            return;
        }
        const destination = query.p?.toString() || '/';
        replace(destination);
    }

    return (
        <AuthLayout title='Register Page'>
            <form onSubmit={ handleSubmit(onRegister) }>
                <Box  sx={{ width:'350px' }}>
                    <Grid container spacing={ 3 }>
                        
                        <Grid item xs={ 12 }>
                            <Typography variant='h1' component='h1' fontWeight={400} sx={{ml:1}}>Create account</Typography>
                        
                            <Chip
                                label='We already have an account with that email'
                                color='error'
                                className='fadeIn'
                                icon= {<ErrorOutline/>}
                                variant='outlined'
                                sx={{ display: error ?  'flex' : 'none' , mt:1 }}
                            />
                        </Grid>
                        
                        <Grid item xs={ 12 } >
                            <TextField 
                                variant='filled'
                                fullWidth
                                error={ !!errors.name }
                                helperText={errors.name?.message}
                                label='Full name' 
                                {...register('name',{
                                    required: 'Name is required',
                                    minLength: {
                                        value: 2, message:'Name must be at least 2 characters' 
                                    }
                                })}
                            />
                        </Grid>

                        <Grid item xs={ 12 } >
                            <TextField 
                                variant='filled' 
                                fullWidth 
                                error = {!!errors.email}
                                helperText={errors.email?.message}
                                label='Email' 
                                {...register('email',{
                                    required: 'Email is required',
                                    validate: utils.isEmail
                                })}
                            />
                        </Grid>

                        <Grid item xs={ 12 } >
                            <TextField 
                                variant='filled' 
                                type={'password'}
                                error={ !!errors.password }
                                helperText={errors.password?.message}
                                fullWidth 
                                label='Password' 
                                {...register('password',{
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6, message:'Password must be at least 6 characters'
                                    }
                                })}
                            />
                        </Grid>

                        <Grid item xs={ 12 } display='flex' justifyContent='center'>
                            <Button
                                type='submit' 
                                color='secondary' 
                                fullWidth 
                                className='circular-btn' 
                                size='large' >
                                Create account
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } display='flex' justifyContent='end'>
                            <NextLink 
                                href={query.p ? `/auth/login?p=${ query.p }` : `/auth/login`} 
                                passHref
                                >
                                <Link component='span'>
                                    <Typography variant='body2' color='black'>
                                        Already have an account? Login
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

export default RegisterPage;
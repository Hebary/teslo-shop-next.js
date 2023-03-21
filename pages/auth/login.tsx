import { useEffect, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { getSession, signIn, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '@/components/layouts';
import { utils } from '@/utils';
import { BuiltInProviderType } from 'next-auth/providers';


type FormData = {
    email: string;
    password: string;
}

const Login: NextPage = () => {
    
    const { query } = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    
    const [error, setError] = useState(false);

    const [providers, setProviders] = useState< Record< LiteralUnion< BuiltInProviderType, string >, ClientSafeProvider > | null > (null);

    useEffect(() => {
        getProviders().then( prov => {
            setProviders(prov);
        })
        
    }, [])
    

    const onSignIn = async ({ email, password }: FormData) => {
        
        setError(false);
        await signIn('credentials',{email, password});
        // const validLogin = await loginUser(email, password);
        // if (!validLogin) {
        //     setError(true);
        //     setTimeout(() => setError(false), 3000);
        //     return;
        // }

        // // navigate to previous url 
        // const destination = query.p?.toString() || '/';
        // replace(destination);
    }

   return (
        <AuthLayout title='Sign In Page'>

            <form onSubmit={ handleSubmit(onSignIn) }>
                <Box  sx={{ width:'350px' }}>
                        <Grid container spacing={ 3 }>

                            <Grid item xs={ 12 }>
                                <Typography variant='h4'  className='red-hat-font' component='h1' fontWeight={ 500 } sx={{ ml:1, letterSpacing:2 }}>Sign in</Typography>
                                
                                <Chip
                                    
                                    label='Please check your credentials'
                                    color='error'
                                    className='fadeIn'
                                    icon= {<ErrorOutline/>}
                                    variant='outlined'
                                    sx={{ display: error ? 'flex' : 'none' , mt: 1 }}
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
                                <NextLink 
                                    href={query.p ? `/auth/register?p=${ query.p }` : `/auth/register`} 
                                    passHref>
                                    <Link component='span'>
                                        <Typography variant='body2' color='black'>
                                            Don&apos;t have an account? Register
                                        </Typography>
                                    </Link>
                                </NextLink>
                            </Grid>

                            <Grid item xs={ 12 } display='flex' flexDirection='column' justifyContent='end'>
                                <Divider sx={{ width: '100%', mb: 3 }} />
                                {
                                    providers && Object.values(providers).map( ({id, name}) => {
                                        if(id === 'credentials') return null;
                                        return (
                                            <Button
                                                key={id}
                                                variant='outlined'
                                                sx={{mb: 1, ":hover":{backgroundColor: 'primary.main', color: 'white'}}}
                                                fullWidth
                                                color='primary'
                                            >
                                                {`Sign in with ${name}`}
                                            </Button>
                                    ) })
                                }
                            </Grid>

                        </Grid>
                    </Box>
            </form>
        </AuthLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    const session  = await getSession({ req }); 
    const { p = '/' } = query;
    if(session){
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}

export default Login;
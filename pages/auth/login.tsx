import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '@/components/layouts';



interface Props {
}

type FormData = {
    email: string;
    password: string;
}

const Login: NextPage<Props> = ({}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const onLogin = (data: FormData) => {
        console.log({data});
    }
   return (
        <AuthLayout title='Login page'>

            <form onSubmit={ handleSubmit(onLogin) }>
                <Box  sx={{ width:'350px' }}>
                        <Grid container spacing={ 3 }>

                            <Grid item xs={ 12 }>
                                <Typography variant='h1' component='h1' fontWeight={400} sx={{ml:1}}>Login</Typography>
                            </Grid>

                            <Grid item xs={ 12 } >
                                <TextField 
                                    type='email'
                                    {...register('email')}
                                    variant='filled' 
                                    fullWidth 
                                    label='Email' />
                            </Grid>

                            <Grid item xs={ 12 } >
                                <TextField
                                    {...register('password')} 
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
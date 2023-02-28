import { NextPage } from 'next';
import NextLink from 'next/link';
import { AuthLayout } from '@/components/layouts';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';



interface Props {
}

const Login: NextPage<Props> = ({}) => {
   return (
        <AuthLayout title='Login page'>
                <Box  sx={{ width:'350px' }}>
                    <Grid container spacing={ 3 }>
                        
                        <Grid item xs={ 12 }>
                            <Typography variant='h1' component='h1' fontWeight={400} sx={{ml:1}}>Login</Typography>
                        </Grid>

                        <Grid item xs={ 12 } >
                            <TextField variant='filled' fullWidth label='Email' />
                        </Grid>

                        <Grid item xs={ 12 } >
                            <TextField variant='filled' type={'password'} fullWidth label='Password' />
                        </Grid>

                        <Grid item xs={ 12 } display='flex' justifyContent='center'>
                            <Button color='secondary' fullWidth className='circular-btn' size='large' >
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
        </AuthLayout>
    )
}

export default Login;
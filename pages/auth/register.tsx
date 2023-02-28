import { NextPage } from 'next';
import NextLink from 'next/link';
import { AuthLayout } from '@/components/layouts';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';


interface Props {
}

const RegisterPage: NextPage<Props> = ({}) => {
   return (
        <AuthLayout title='Register Page'>
                <Box  sx={{ width:'350px' }}>
                    <Grid container spacing={ 3 }>
                        
                        <Grid item xs={ 12 }>
                            <Typography variant='h1' component='h1' fontWeight={400} sx={{ml:1}}>Create account</Typography>
                        </Grid>
                        
                        <Grid item xs={ 12 } >
                            <TextField variant='filled' fullWidth label='Name' />
                        </Grid>

                        <Grid item xs={ 12 } >
                            <TextField variant='filled' fullWidth label='Email' />
                        </Grid>

                        <Grid item xs={ 12 } >
                            <TextField variant='filled' type={'password'} fullWidth label='Password' />
                        </Grid>

                        <Grid item xs={ 12 } display='flex' justifyContent='center'>
                            <Button color='secondary' fullWidth className='circular-btn' size='large' >
                                Create account
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } display='flex' justifyContent='end'>
                            <NextLink href='login' passHref>
                                <Link component='span'>
                                    <Typography variant='body2' color='black'>
                                        Already have an account? Login
                                    </Typography>
                                </Link>
                            </NextLink>
                        </Grid>

                    </Grid>
                </Box>
        </AuthLayout>
    )
}

export default RegisterPage;
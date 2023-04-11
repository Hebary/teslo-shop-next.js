import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AdminLayout } from '../../../components/layouts'
import { IProduct } from '../../../interfaces';
import { dbProducts } from '../../../database';
import { tesloApi } from '@/api';
import { Product } from '@/models';


const validTypes  = ['shirts','pants','hoodies','hats']
const validGender = ['men','women','kid','unisex']
const validSizes = ['XS','S','M','L','XL','XXL','XXXL']

interface Props {
    product: IProduct;
}

interface FormData {
    _id?       : string;
    description: string;
    images     : string[];
    inStock    : number;
    price      : number;
    sizes      : string[];
    slug       : string;
    tags       : string[];
    title      : string;
    type       : string;
    gender     : string;
    createdAt  : string;
    updatedAt  : string;
}


const ProductAdminPage:FC<Props> = ({ product }) => {


    const { register, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product 
    })

    useEffect(() => {
      const subscription = watch(( value, { name, type } ) => {
        if( name === 'title' ){
            const newSlug =  value.title!.trim()
            .replace(' ', '_')
            .replace("'", '')
            .toLowerCase() || '';
            setValue('slug', newSlug, { shouldValidate: true });
        }
    })

    return () => subscription.unsubscribe()
        
    }, [watch, setValue]);

    const [tagValue, setTagValue] = useState('');
    const [onSave, setOnSave] = useState(false);
    
    const router = useRouter();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onChangeSize = (size: string) => {
        const currentSizes = getValues('sizes');
        
        if(currentSizes.includes( size )){
            return setValue('sizes', currentSizes.filter(s=> s !== size), { shouldValidate: true });
        }

        setValue('sizes',[...currentSizes, size], { shouldValidate: true });
    }

    const onNewTag = () => {
        const newTag = tagValue.trim().toLowerCase();
        setTagValue('');
        const currentTags = getValues('tags');

        if( newTag && !currentTags.includes(newTag) ){
            currentTags.push(newTag);
            //  push method force shouldValidate
            // setValue('tags', [...currentTags, newTag], { shouldValidate: true });
        }
    }

    const onDeleteTag = ( tag: string ) => {
        setValue('tags', getValues('tags').filter(t=> t !== tag), { shouldValidate: true });
    }
    

    const onSubmit = async ( form: FormData ) => {
        if( form.images.length < 2 ) return alert('You must upload at least 2 images');

        setOnSave(true);

        try {
            const { data } = await tesloApi({
                url: '/admin/products',
                method: form._id ? 'PUT' : 'POST',
                data: form
            })
            console.log({data})
            if(!form._id){
                router.replace(`/admin/products/${ data.slug }`);
            } else {
                setOnSave(false);
            }
        } catch (error) {
            console.log({error})
        }
    }

    const onSelectedFiles = async({ target }: ChangeEvent<HTMLInputElement>) => {
        if( !target.files || target.files.length===0 ) {
            return;
        }
        
        try {
            for(const file of target.files){
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await tesloApi.post<any>('/admin/upload', formData);
                // console.log(data.secure_url)
                setValue('images', [...getValues('images'), data.secure_url], { shouldValidate: true });
            }


        } catch (error) {
            console.log(error);
        }

    }

    const onDeleteImage = (image: string) => {
        setValue('images', getValues('images').filter(i=> i !== image), { shouldValidate: true });
    }
    return (
        <AdminLayout 
            title={`Product Admin Panel`} 
            subtitle={`On Edit: ${ product.title }`}
            icon={ <DriveFileRenameOutline sx={{ fontSize:30, mt:.5}} /> }
        >
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={ onSave }
                        >
                        Save
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Title"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: 'Title is required',
                                minLength: { value: 3, message: 'Title must have at least 3 caracters' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Description"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('description', {
                                required: 'Description is required'
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="Inventory"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'Stock field is required',
                                min: { value: 0, message: 'Minimal stock value: 0'}
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Price"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'Price field is required',
                                min: { value: 0, message: 'Minimal price value: 0'}
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('type') }
                                onChange={ ({target}) => setValue('type', target.value, { shouldValidate: true} ) }
                            >
                                {
                                    validTypes.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('gender') }
                                onChange={ ({target}) => setValue('gender', target.value, { shouldValidate: true} ) }
                            >
                                {
                                    validGender.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Tallas</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel 
                                        key={size} 
                                        control={<Checkbox checked={getValues('sizes').includes(size)} />} 
                                        label={ size } 
                                        onChange = { () => onChangeSize(size) }
                                        />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'Slug field is required',
                                validate:(val)=> val.trim().includes(' ') ? 'Slug must not have spaces' : undefined
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Tags"
                            variant="filled"
                            value={ tagValue }
                            onChange={ ({target}) => setTagValue(target.value) }
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Press [spacebar] to  add"
                            onKeyDown = { ({code}) => code === 'Space' && onNewTag() }
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Images</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Upload Image    
                            </Button>
                            <input
                                ref={ fileInputRef }
                                type="file"
                                accept="image/*"
                                multiple
                                style={{ display:'none' }}
                                onChange={ onSelectedFiles }
                            />

                            <Chip 
                                label="Both images are required"
                                color='error'
                                variant='outlined'
                                sx={{ display: getValues('images').length < 2 ? 'flex' : 'none' } }
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ img }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button fullWidth color="error"
                                                        onClick={ () => onDeleteImage(img)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;
    

    let product: IProduct | null;

    if( slug === 'new'){
        const tempProduct = JSON.parse(JSON.stringify(new Product()));
        delete tempProduct._id;
        tempProduct.images = ['img1.jpg', 'img2.jpg']
        product = tempProduct;
    } else {
        product = await dbProducts.getProductBySlug(slug.toString());
    }


    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage
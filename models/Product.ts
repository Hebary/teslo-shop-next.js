import mongoose, { Schema, model, Model} from 'mongoose';
import { IProduct } from '../interfaces';


const ProductSchema = new Schema({
    title: { type: String, required: true, default: '' },
    description: { type: String, required: true, default: '' },
    images: [
        { type: String }
    ],
    inStock: { type: Number, required: true, default:0 },
    price: { type: Number, required: true, default:0 },
    sizes: [{ 
        type: String, 
        enum:{
            values: ['XS', 'S', 'M', 'L', 'XL', 'XXL','XXXL'],
            message: '{VALUE} is not supported'
        }
    }],
    slug: { type: String, required: true, unique: true, default:'' },
    tags: [{ type: String }],
    type:[{ 
        type: String, 
        enum:{
            values: ['shirts', 'pants', 'hoodies', 'hats'],
            message: '{VALUE} is not supported'
        },
        default: 'shirts'
    }],
    gender: [{ 
        type: String, 
        enum:{
            values: ['men', 'women', 'kid', 'unisex'],
            message: '{VALUE} is not supported'
        },
        default:'unisex'
    }],
  },{
    timestamps: true
});

ProductSchema.index({ title: 'text', tags: 'text' });

const Product: Model<IProduct> = mongoose.models.Product || model<IProduct>('Product', ProductSchema);

export default Product;
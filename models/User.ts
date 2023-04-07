import mongoose, { Model, model, Schema } from "mongoose";
import { IUser } from "../interfaces";

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role : { 
        type: String,
        enum: ['client', 'admin'],
        default: 'client' ,
        message: '{VALUE} is not a valid role'
    },
},{
    timestamps: true
});


const User: Model<IUser> = mongoose.models.User || model<IUser>('User', userSchema);

export default User;
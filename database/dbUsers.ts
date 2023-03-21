import { User } from '@/models';
import { db } from '.';
import bcrypt from 'bcryptjs';

export const checkUserCredentials = async (email: string, password: string) => {
    await db.connect();
    const user  = await User.findOne({email}).lean();
    await db.disconnect();
    if (!user) {
        return null;
    }

    if( !bcrypt.compareSync(password, user.password!)){
        return null;
    }

    const {role, name, _id } = user;

    return {
        _id,
        email: email.toLowerCase(),
        role,
        name
    } 
}

// this function Compares oauth user with db user 
export const checkUserOAuth = async (oAuthEmail: string, oAuthName: string) => {
    await db.connect();
    const user  = await User.findOne({ email: oAuthEmail }).lean();
    
    if(user){
        await db.disconnect();
        const {role, email, name, _id } = user;
        return {
            _id,
            email: email.toLowerCase(),
            role,
            name
        }
    }

    // if user does not exist in db, create new user
    const newUser = new User({
        email: oAuthEmail,
        name: oAuthName,
        role: 'client',
        password:'@',
    })

    await newUser.save();
    await db.disconnect();
    const {role, email, name, _id } = newUser;
    return {
        _id,
        email: email.toLowerCase(),
        role,
        name
    }
}
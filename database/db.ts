import mongoose from "mongoose"
/*
    0 disconnected, 
    1 connected, 
    2 connecting, 
    3 disconnecting
*/ 
export const mongoConnection = {
    isConnected: 0
} 


export const connect = async () => {
    
    if (mongoConnection.isConnected){
        console.log('Connected to MongoDB (1)');
        return
    }

    if( mongoose.connections.length > 0 ){
        mongoConnection.isConnected = mongoose.connections[0].readyState

        if( mongoConnection.isConnected === 1){
            console.log('Using the previous connection');
        }

        await mongoose.disconnect();
    }
    
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        
        mongoConnection.isConnected = 1
        
        console.log('Connected to MongoDB (2)', process.env.MONGO_URI);
        
    } catch (error) {
        console.log(error);   
    }
}

export const disconnect = () => {
    
    if(process.env.NODE_ENV ==='development') return;
    
    if(mongoConnection.isConnected === 0) return;
        mongoose.disconnect();
        console.log('Disconnected from MongoDB');
} 


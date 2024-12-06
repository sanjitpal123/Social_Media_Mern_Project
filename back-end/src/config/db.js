import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
async function connection()
{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log('Mongodb is connected')
    }catch(error)
    {
        console.log(error)
    }
    
}
export default connection;
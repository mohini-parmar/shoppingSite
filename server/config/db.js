import mongoose from 'mongoose'

export const connectDB = async (DB_URL) =>{
    try{
        const db_option = {
            dbName : "shoppingSite"
        };
       await mongoose.connect(DB_URL,db_option);
       console.log("database connected successfully...");
    }catch(err){
        console.log(err);
    }
}
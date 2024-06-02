import { configDotenv } from "dotenv";
configDotenv()
import mongoose from 'mongoose'
import { DB_NAME } from './constant.js';
import app from './app.js'
async function connectToDB(){
    console.log(process.env.PORT);

    try {
    //connect to db 
    const { connection }=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    if(connection){
        console.log(`db connect to ${connection.host}`);
    }
    
} catch (error) {
    console.log('mongo db connection error',error);
    process.exit(1)
    
}
}
export default connectToDB
const PORT=process.env.PORT||5300;
connectToDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("app listening on port ",PORT);
    })
}).catch((error)=>{
    console.log('mongodb connection error',error);
    throw error;
})
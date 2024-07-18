const mongoose=require('mongoose');
require('dotenv').config();

const connectDB=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO}`).then(()=>{
            console.log("Connected")
        })
    } catch (error) {
           console.log("mongo not able to connect", error)
    }
}


module.exports=connectDB
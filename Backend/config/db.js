import mongoose from "mongoose"

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://pardume:pardume.mongodb19040451@cluster0.ktabq.mongodb.net/YummyBites')
    .then(()=>{
        console.log('DB connected');
    })
}



// mongodb+srv://pardume:pardume.mongobd19040451@cluster0.t1b8o.mongodb.net/?
// pardume.mongobd19040451
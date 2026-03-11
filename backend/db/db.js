import mongoose from "mongoose"

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.Mongo_url)
        console.log("mongodb is connected ")
    } catch (error) { 
        console.log ( "mongo disconnected" ,error.message)
    }
}

export default connectDB;
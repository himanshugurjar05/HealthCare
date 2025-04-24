import mongoose from "mongoose";
import 'dotenv/config'

const MONGOURI = process.env.MONGODB_URI;

export default async function connectDB() {
  try {
    await mongoose.connect(MONGOURI)
    console.log("Connected to mongodb......");
    
  } catch (error) {
    console.log("Err connecting to mongodb", error.message)
  }

}



import mongoose from 'mongoose'
import dotenv from 'dotenv';
//Load Environment files

dotenv.config()
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Problem on COnnect${error}`);
    process.exit(1);
  }
};

 export default connectDB






import mongoose from 'mongoose'
import dotenv from 'dotenv';

import dns from 'node:dns'
dns.setServers(['1.1.1.1', '8.8.8.8']);
dotenv.config();
//console.log(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Problem on Connect${error}`);
    process.exit(1);
  }
};

 export default connectDB





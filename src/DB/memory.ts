import mongoose from 'mongoose';
import { config } from '../config/config';


export const connectDB = () => {
  try {
    mongoose.connect(config.MONGO_URL as string).then(() => {
      console.log('Connected to DB');
    });
  } catch (error) {
    console.log(error);
  }
};
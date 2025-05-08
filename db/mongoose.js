import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Get the MongoDB URI from the environment variable (secret)
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.error('ERROR: MONGO_URI environment variable is required');
      console.error('Please set a valid MongoDB connection string in Replit Secrets');
      return false;
    }
    
    console.log('Connecting to MongoDB using MONGO_URI from environment variables...');
    
    // MongoDB connection options with timeout and retry settings
    const options = {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000
    };
    
    await mongoose.connect(mongoURI, options);
    console.log('Connected to MongoDB successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Check your connection string and network connectivity');
    if (error.name === 'MongooseServerSelectionError') {
      console.error('Could not connect to any MongoDB servers');
    }
    return false;
  }
};

export default connectDB;
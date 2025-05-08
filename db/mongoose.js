import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Use the environment variable MONGO_URI with localhost fallback
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/chess_society';
    
    if (!mongoURI) {
      console.error('ERROR: MONGO_URI environment variable is required');
      console.error('Please set a valid MongoDB connection string in .env file');
      return false;
    }
    
    // Mask the connection string for security but show whether using localhost or remote
    const isLocalhost = mongoURI.includes('localhost');
    console.log(`Connecting to MongoDB ${isLocalhost ? '(localhost)' : '(remote server)'}...`);
    
    // MongoDB connection options with timeout and retry settings
    const options = {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000
    };
    
    await mongoose.connect(mongoURI, options);
    console.log('MongoDB connected successfully');
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
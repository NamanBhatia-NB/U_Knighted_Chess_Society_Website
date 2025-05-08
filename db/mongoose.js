import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Define possible MongoDB URIs in order of preference
    const localMongoURI = 'mongodb://localhost:27017/chess_society';
    const envMongoURI = process.env.MONGO_URI;
    
    // Prioritize local MongoDB if it's available
    let mongoURI = localMongoURI;
    let usingLocal = true;
    
    try {
      // Try to connect to local MongoDB first
      console.log('Attempting to connect to local MongoDB...');
      await mongoose.connect(localMongoURI, { 
        serverSelectionTimeoutMS: 2000, // Short timeout for quick fallback
        connectTimeoutMS: 2000
      });
      console.log('Connected to local MongoDB');
      return true;
    } catch (localError) {
      console.log('Local MongoDB connection failed:', localError.message);
      console.log('Falling back to remote MongoDB...');
      
      // If local fails, use the environment variable
      mongoURI = envMongoURI;
      usingLocal = false;
      
      if (!mongoURI) {
        console.error('ERROR: MONGO_URI environment variable is required as fallback');
        console.error('Please set a valid MongoDB connection string in Replit Secrets');
        return false;
      }
    }
    
    if (!usingLocal) {
      console.log(`Connecting to remote MongoDB...`);
      
      // MongoDB connection options with timeout and retry settings
      const options = {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000
      };
      
      await mongoose.connect(mongoURI, options);
      console.log('Connected to remote MongoDB successfully');
    }
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
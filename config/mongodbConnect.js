import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

let connection;

export const connectToMongoDb = async () => {
  if (!connection) {
    try {
      const mongodburi = process.env.MONGODB_URI;
      connection = await mongoose.connect(mongodburi, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected To Mongo DB Successfully!");
    } catch (error) {
      console.error("Error Connecting to mongodb:", error.message);
    }
  }
  return connection;
};

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected. Reconnecting...');
  connectToMongoDb().catch(console.error);
});



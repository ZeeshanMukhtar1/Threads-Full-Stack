import mongoose from 'mongoose';

// A function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Use mongoose to connect to the MongoDB database using the provided URI
    const conn = await mongoose.connect(process.env.MongoDB_URI, {
      // To avoid warnings in the console, specifying these options
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new server discovery and monitoring engine
    });

    // If the connection is successful, log the connected host
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If there's an error, log the error message and exit the process
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with an error code
  }
};

export default connectDB;

const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

async function connectToDatabase() {
  try {
    // Connect to the MongoDB database using Mongoose
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB Atlas');

    // Return the Mongoose connection object
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
}

console.log('MongoDB URI:', process.env.MONGODB_URI);


module.exports = connectToDatabase;

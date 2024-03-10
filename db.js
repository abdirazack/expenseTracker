const { MongoClient } = require('mongodb');

// Connection URI
const uri = "mongodb+srv://expense:Expense123456@cluster0.7wtmfao.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function connectToDatabase() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Return the client object to be used for database operations
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
}

module.exports = connectToDatabase;

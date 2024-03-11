import mongoose from "mongoose";

const initMongoDbConnection = async (
  host: string,
  port: Number,
  databaseName: string
) => {
  try {
    const MONGODB_URI = `mongodb://${host}:${port}/${databaseName}`;
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`Succesfully connected to mongo database ${databaseName}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default initMongoDbConnection;

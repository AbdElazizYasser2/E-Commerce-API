import mongoose from "mongoose";

const connectionDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log(`Connection Successfully ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
};

export default connectionDB;

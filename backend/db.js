import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

export default connectDB;

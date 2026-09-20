import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    await mongoose.connect(process.env.MONGODB_URI as string);

    return mongoose;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

export default connectDB;

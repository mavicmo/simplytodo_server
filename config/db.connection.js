import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.MONGODB_URL;

//Connect to MongoDb
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected...!"))
  .catch((err) => console.log(`MongoDB connection error :('${err}')`));

mongoose.connection.on("disconnected", (err) => console.log(err));

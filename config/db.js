const mongoose = require("mongoose");
const config = require("config");
const db = process.env.MONGOCONNECT;

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://iwebsoul:ZkK7vXCmICDXqsM6@cluster0.meodf1o.mongodb.net/eikon",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    );
    console.log("💾  ✔ MongoDB connected");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

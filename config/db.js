const mongoose = require("mongoose");
const config = require("config");
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI)
const connectDB = async () => {
  try {
    await mongoose.connect(
      MONGODB_URI,
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

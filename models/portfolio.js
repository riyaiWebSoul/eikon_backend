const mongoose = require("mongoose");
const { Schema } = mongoose;

const portfolioSchema = new Schema({
  images: [String],
  videos: [String],
  logos:[{
    logoImages:[String],
    otherImages:[String],
    iconImages:[String]
}]
  
});

exports.portfolio = mongoose.model("portfolio", portfolioSchema);

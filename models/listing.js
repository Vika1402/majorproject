const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listeningSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String, 
    
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listeningSchema);

module.exports = Listing;

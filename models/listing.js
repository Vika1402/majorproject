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
    default: "https://housing.com/news/wp-content/uploads/2023/03/Cool-home-exterior-designs-in-2023-f-686x400.jpg",
    set: (v) =>
      v === ""
        ? "https://housing.com/news/wp-content/uploads/2023/03/Cool-home-exterior-designs-in-2023-f-686x400.jpg"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listeningSchema);

module.exports = Listing;

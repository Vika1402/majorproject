const mongoose = require("mongoose");
const { type } = require("../schema");
const listingSchema = require("../schema");
const Schema = mongoose.Schema;
const Review = require("./review.js");
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
  reviews: [{ type: Schema.Types.ObjectId }],
});

listingSchema.POST("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listeningSchema);

module.exports = Listing;

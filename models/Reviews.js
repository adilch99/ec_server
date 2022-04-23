const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewsSchema);

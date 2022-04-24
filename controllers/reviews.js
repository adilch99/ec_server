const Reviews = require("../models/Reviews");
const User = require("../models/User");
const { BadRequestError, NotFoundError } = require("../errors/index");

const createReview = async (req, res) => {
  if (!req.body.review) {
    throw new BadRequestError("please provide review");
  }
  const checkReview = await Reviews.aggregate([
    {
      $match: {
        userId: req.body.userId,
        productId: req.body.productId,
      },
    },
  ]);

  if (checkReview.length > 0) {
    throw new BadRequestError("You Already Submited Review");
  }
  const user = await User.findById({ _id: req.body.userId });
  await Reviews.create(req.body);
  await User.findOneAndUpdate(
    { _id: req.body.userId },
    { giftPoints: user.giftPoints + 50 }
  );

  res.status(200).json({ msg: "ok" });
};

const getReviews = async (req, res) => {
  const reviews = await Reviews.find({ productId: req.params.id });
  res.status(200).json({ reviews });
};

module.exports = {
  createReview,
  getReviews,
};

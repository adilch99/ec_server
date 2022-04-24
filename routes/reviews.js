const {
  createReview,
  deleteReview,
  getReviews,
} = require("../controllers/reviews");

const router = require("express").Router();

router.post("/", createReview);
router.get("/:id", getReviews);

module.exports = router;

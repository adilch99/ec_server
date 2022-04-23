const { createReview, deleteReview } = require("../controllers/reviews");

const router = require("express").Router();

router.post("/", createReview);

module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewValidate, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewsController = require("../Controllers/reviews.js");

// Review Routes
// Post Route
router.post("/", reviewValidate, isLoggedIn, wrapAsync(reviewsController.createReview));

// Destroy Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewsController.destroyReview));


module.exports = router;
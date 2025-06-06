const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedin, isReviewAuthor } = require("../middleware.js");

//Review Controller

const reviewController = require("../controllers/reviews.js");

//Create review route

router.post("/",isLoggedin, validateReview, wrapAsync(reviewController.createReview));

//Delete review route

router.delete("/:reviewId", isLoggedin, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
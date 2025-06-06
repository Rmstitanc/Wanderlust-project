const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

//Create Review Controller

module.exports.createReview = async(req, res) => {
    let listing = await Listing.findById(req.params.id);
    let review = await new Review(req.body.review);
    review.author = req.user._id;
    listing.reviews.push(review);

    await review.save();
    await listing.save();
    req.flash("success", "Review created");
    res.redirect(`/listings/${listing._id}`);
}

//Delete Review Controller

module.exports.destroyReview = async(req, res) => {
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted");
    res.redirect(`/listings/${id}`);
}
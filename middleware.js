const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js"); 

// Check user isLogin or not
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectURL = req.originalUrl;
        req.flash("error", "You must be logged in Nestora");
        return res.redirect("/login");
    }
    next();
};

// save Re-direct URL
module.exports.saveRedirectURL = (req, res, next) => {
    if(req.session.redirectURL) {
        res.locals.redirectURL = req.session.redirectURL;
    }
    next();
};

// Check listing Owner
module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the Owner of Nest");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

// Check review author
module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this Nest");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

// listing Validate
module.exports.listingValidate = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

// Review Validate
module.exports.reviewValidate = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};




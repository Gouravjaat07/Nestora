const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js"); 
const router = express.Router({ mergeParams: true });
const {isLoggedIn, isOwner, listingValidate} = require("../middleware.js");

const listingsController = require("../Controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingsController.index)) // Index Route
    .post(isLoggedIn, upload.single('listing[image][url]'), listingValidate,
    wrapAsync(listingsController.createNewListing)); // Create Route

// New Route
router.get("/new", isLoggedIn, listingsController.renderNewForm);

router
    .route("/:id")
    .get(isLoggedIn, wrapAsync(listingsController.showAllListings)) // Show Route
    .put(isLoggedIn, isOwner, upload.single('listing[image][url]'), listingValidate,
    wrapAsync(listingsController.updateListing)) // Update Route
    .delete(isLoggedIn,isOwner, wrapAsync(listingsController.destroyListing)); // Destroy Route

// Edit Route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingsController.renderEditForm));

module.exports = router;
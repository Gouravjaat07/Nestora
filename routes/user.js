const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectURL} = require("../middleware.js");

const usersController = require("../Controllers/users.js");


router
    .route("/signup")
    .get(usersController.renderSignupForm) // Signup Get Route for Rendering Form
    .post(wrapAsync(usersController.signup)); // SignUp Post Route

router
    .route("/login")
    .get(usersController.renderLoginForm) // Login Get Route for Rendering Login Form
    .post(saveRedirectURL, passport.authenticate("local", 
    { failureRedirect: "/login", failureFlash: true }),
    wrapAsync(usersController.login)); // Login Post Route

// Logout Get Route
router.get("/logout", usersController.logout);

module.exports = router;
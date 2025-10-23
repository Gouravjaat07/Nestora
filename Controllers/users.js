const User = require("../models/user.js");

module.exports.renderSignupForm =  (req, res) => {
    try {
         res.render("users/signup.ejs");
    } catch(e) {
        req.flash("error", e.message);
    }
   
};

module.exports.signup = async (req, res, next) => {
    let {username, email, password} = req.body;
    const newUser = new User({username, email});
    try {
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            };
            req.flash("success", "Welcome to Nestora");
            res.redirect("/listings");
        }); 
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm =  (req, res) => {
    try {
        res.render("users/login.ejs");
    } catch(e) {
        req.flash("error", e.message);
    }
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Nestora");
    let redirectURL = res.locals.redirectURL || "/listings";
    res.redirect(redirectURL);
}

module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are Logged Out");
        res.redirect("/listings");
    });
}
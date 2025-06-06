const User = require("../models/user.js");

//  User Signup Form Controller

module.exports.userSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

//Signup User Controller

module.exports.signup = async(req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });

    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

//User Login Form Controller

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

//Login User Controller 

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

//Logout User Controller

module.exports.logout = (req, res) => {
    req.logOut((err) => {
        if(err) {
           return next(err);
        }
        req.flash("success", "You are successfully logged out");
        res.redirect("/listings");
    });
}
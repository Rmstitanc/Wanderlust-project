const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport =  require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");

//User Controller

const userController = require("../controllers/users.js");

//Route combination for "/signup"

router.route("/signup")

    //Signup form render route
    .get(userController.userSignupForm)

    //Signup route
    .post(wrapAsync(userController.signup));

//Route combination for "/login"

router.route("/login")

    //Login form render route
    .get(userController.renderLoginForm)

    //Login route
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login);

//Logout route

router.get("/logout", userController.logout);

module.exports = router; 
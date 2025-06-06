const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedin, isOwner, validateListing} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("c:/Users/Rohit Saha/OneDrive/Desktop/Code_Help/MAJORPROJECT/cloudconfig");
const upload = multer({ storage });


//Listing Controller

const listingController = require("../controllers/listings.js");

//Route combination for "/"

router.route("/")

    //Index route
    .get(wrapAsync(listingController.index))
    
    //create listing
    .post(isLoggedin, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));


//New listing

router.get("/new", isLoggedin, listingController.renderNewform);    

//route combination for "/:id"

router.route("/:id")

    //Show route
    .get(wrapAsync(listingController.showListing))
    //Update route
    .put(isLoggedin, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
    //Delete route
    .delete(isLoggedin, isOwner, wrapAsync(listingController.destroyListing));


//Edit route

router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;
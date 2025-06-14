const Listing = require("../models/listing.js");
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//Index Controller

module.exports.index = async(req, res, next) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
}

//New listing Controller

module.exports.renderNewform = (req, res) => {
    res.render("./listings/new.ejs");
}

//Show Listing Controller

module.exports.showListing = async (req, res, next) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"},}).populate("owner");
    if(!listing) {
        req.flash("error", "Listing doesnot exist!");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs", {listing});
}

//Create Listing Controller

module.exports.createListing = async(req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
    .send()

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = await new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success", "New listing created");
    res.redirect("/listings");
}

//Edit Listing Controller

module.exports.renderEditForm = async(req, res, next) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
        if(!listing) {
        req.flash("error", "Listing doesnot exist!");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("./listings/edit.ejs", {listing, originalImageUrl});
}

//Update Listing Controller

module.exports.updateListing = async(req, res, next) => {
    if(!req.body.listing){
        throw new ExpressError("400", "Enter valid data");
    }
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
}

//Delete Listing Controller 

module.exports.destroyListing = async(req, res, next) => {
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
}
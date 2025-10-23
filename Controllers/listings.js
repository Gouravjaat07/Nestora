const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    let allListing = await Listing.find({});
    res.render("./listing/index.ejs", { allListing });
   
};

module.exports.renderNewForm =  (req, res) => {
    try {
        res.render("./listing/create.ejs");
    } catch(e) {
        req.flash("error", e.message);
    }
    
};

module.exports.createNewListing = async (req, res) => {
    let location = req.body.listing.location;
    let country = req.body.listing.country;
    let centerLocation = `${location}, ${+country}`;

    let coordinates = await geocodingClient.forwardGeocode({
    query: centerLocation,
    limit: 1
    })
    .send()
    const geometry = coordinates.body.features[0].geometry;

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = geometry;
    await newListing.save();
    req.flash("success", "New Nest Created");
    res.redirect("/listings");
};

module.exports.showAllListings = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id)
    .populate({
        path: "review",
        populate: {
            path: "author" } })
    .populate("owner");
    if(!listing) {
        req.flash("error", "Nest you requested for does not exists.");
        res.redirect("/listings");
    };
    res.render("./listing/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Nest you requested for does not exists!");
        res.redirect("/listings");
    };
    let listingImageUrl = listing.image.url;
    let originalImageUrl = listingImageUrl.replace("/upload", "/upload/h_270,w_250,e_blur:60");
    res.render("./listing/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefined" ) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    };
    req.flash("success", "Nest Updated !");
    res.redirect(`/listings/${id}`);

};

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Nest Successfully Deleted");
    res.redirect("/listings");
};


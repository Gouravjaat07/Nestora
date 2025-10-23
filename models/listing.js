const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        filename: { 
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1531558506007-fe311a2f4729?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1531558506007-fe311a2f4729?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D": v,
        },
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    review: [
         {
        type: Schema.Types.ObjectId,
        ref: "Review"
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
        },
        coordinates: {
        type: [Number],
        required: true
        }
    },
    category: {
      type: String,
    }
});

module.exports = mongoose.model("Listing", listingSchema);

// Post MiddleWare
listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({ _id: {$in: listing.review} });
    }
});
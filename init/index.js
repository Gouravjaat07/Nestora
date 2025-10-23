const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require('../models/listing.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/nestora"

main().then(() => {
    console.log("Connected to DB");
}).catch((e) => {
    console.log(e);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

// Creatd DB
const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, owner: "68ccbb6b2500002a5eb86c63"}));
    const data = await Listing.insertMany(initData.data);
    console.log("Data was Initialized");
}

initDB();
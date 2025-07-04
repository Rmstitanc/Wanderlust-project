const mongoose = require("mongoose");
const initData = require("./data.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("../models/listing.js");

//Connection to Database
main()
    .then((res) => {
        console.log("Connection successful");
    })
    .catch((err) => {
        console.log("Connection wasnot successful", err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6833732231b590ffc4775bee"}));
    await Listing.insertMany(initData.data);
    console.log("Data was saved");
};

initDB();
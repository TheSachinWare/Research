const mongoose = require("mongoose");
const initData3 = require("./data_g");
const General = require("../models/General");

const MONGO_URL = "mongodb://127.0.0.1:27017/PHR";

main()
    .then(() => {
        console.log("Connection to DB.");
    }) .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB3 = async() => {
    await General.deleteMany({});
    await General.insertMany(initData3.data_g);
    console.log("Data was initialized.");
}

initDB3();
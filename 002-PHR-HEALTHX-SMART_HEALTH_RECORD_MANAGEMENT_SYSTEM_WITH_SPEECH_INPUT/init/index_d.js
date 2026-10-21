const mongoose = require("mongoose");
const initData1 = require("./data_d");
const Doctor = require("../models/Doctor");

const MONGO_URL = "mongodb://127.0.0.1:27017/PHR";

main()
    .then(() => {
        console.log("Connection to DB.");
    }) .catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB1 = async() => {
    await Doctor.deleteMany({});
    initData1.data_d = initData1.data_d.map((obj) => ( { ...obj, owner : "66f712b0178eaebde51d8d4e"}));
    await Doctor.insertMany(initData1.data_d);
    console.log("Data was intialized.");
};

initDB1();
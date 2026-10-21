const mongoose = require("mongoose");
const initData2 = require("./data_p");
const Patient = require("../models/Patient");

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

const initDB2 = async() => {
    await Patient.deleteMany({});
    initData2.data_p = initData2.data_p.map((obj) => ( { ...obj, owner : "66f715bd175056b3c3854b77"}));
    await Patient.insertMany(initData2.data_p);
    console.log("Data was intialized.");
};

initDB2();
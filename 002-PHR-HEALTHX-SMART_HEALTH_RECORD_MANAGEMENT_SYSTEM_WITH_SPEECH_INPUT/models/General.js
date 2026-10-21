const mongoose = require("mongoose");
const Schema3 = mongoose.Schema;

const listingSchema3 = new Schema3({
    info : String,
});

const General = mongoose.model("General", listingSchema3);
module.exports = General;
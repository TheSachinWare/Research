const mongoose = require("mongoose");
const Schema4 = mongoose.Schema;

const reviewSchema = new Schema4({
    comment : String,
    rating : {
        type : Number,
        min : 1,
        max : 5,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
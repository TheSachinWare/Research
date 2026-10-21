const express = require("express");
const router4 = express.Router({mergeParams : true});
const Doctor = require("../models/Doctor.js");
const Review = require("../models/Review.js");

const wrapAsync = require("../utils/wrapAsync.js");//Error handling tool similar to try-catch.
const ExpressError = require("../utils/ExpressError.js");// Express error handling (we sent error message as we want).
const { doctorSchema, patientSchema, generalSchema, reviewSchema } = require("../schema.js");

const reviewController = require("../controllers/reviews.js");

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errorMsg);
    } else {
        next();
    }
}

router4.post("/", validateReview, wrapAsync(reviewController.createReview));

router4.delete("/:reviewId", wrapAsync(reviewController.destroyReview));

module.exports = router4;
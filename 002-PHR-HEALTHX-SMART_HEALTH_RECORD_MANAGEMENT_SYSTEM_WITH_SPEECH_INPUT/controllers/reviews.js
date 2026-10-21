const Doctor = require("../models/Doctor");
const Review = require("../models/Review");

module.exports.createReview = async(req, res) => {
    let doctor = await Doctor.findById(req.params.id);
    let newReview = new Review(req.body.review);

    doctor.reviews.push(newReview);

    await newReview.save();
    await doctor.save();

    req.flash("success", "New review has been created !");
    // console.log("New Review Saved.");
    // res.send("New Review Saved.");
    res.redirect(`/doctors/${doctor._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let {id, reviewId } = req.params;
    await Doctor.findByIdAndUpdate(id, {$pull: { reviews : reviewId }});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review has been deleted !");
    res.redirect(`/doctors/${id}`);
};
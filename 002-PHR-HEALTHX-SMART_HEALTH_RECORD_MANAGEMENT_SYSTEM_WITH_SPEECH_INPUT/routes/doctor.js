const express = require("express");
const router1 = express.Router();
const Doctor = require("../models/Doctor.js");

const wrapAsync = require("../utils/wrapAsync.js");//Error handling tool similar to try-catch.
const ExpressError = require("../utils/ExpressError.js");// Express error handling (we sent error message as we want).
const { doctorSchema, patientSchema, generalSchema, reviewSchema } = require("../schema.js");

const { isLoggedInD } = require("../middleware.js");
const doctorController = require("../controllers/doctors.js");

const {storage } = require("../cloudConfig.js");
const multer = require('multer'); // Import Multer
const upload = multer({ storage }); // Set upload destination

const validateListing1 = (req, res, next) => {
    let { error } = doctorSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errorMsg);
    } else {
        next();
    }
}

router1.route("/")
    .get( wrapAsync(doctorController.index))
    .post(isLoggedInD, upload.single("doctor[image]"), validateListing1, wrapAsync (doctorController.createDoctor));


router1.get("/new1", isLoggedInD, doctorController.renderNewForm);

router1.route("/:id")
    .get( wrapAsync(doctorController.showDoctor))
    .put(isLoggedInD, upload.single("doctor[image]"), validateListing1,  wrapAsync(doctorController.updateDoctor))//re.body.doctor is js object in which parameters are present, so after deconstructing we convert them into individual values & then we pass it into new updates value.
    .delete(isLoggedInD, wrapAsync (doctorController.destroyDoctor));




router1.get("/:id/edit", isLoggedInD, wrapAsync(doctorController.renderEditForm));

module.exports = router1;
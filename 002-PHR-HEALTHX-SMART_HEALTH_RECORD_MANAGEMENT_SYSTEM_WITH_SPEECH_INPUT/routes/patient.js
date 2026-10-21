const express = require("express");
const router2 = express.Router();
const Patient = require("../models/Patient.js");

const wrapAsync = require("../utils/wrapAsync.js");//Error handling tool similar to try-catch.
const ExpressError = require("../utils/ExpressError.js");// Express error handling (we sent error message as we want).
const { doctorSchema, patientSchema, generalSchema, reviewSchema } = require("../schema.js");

const { isLoggedInP } = require("../middleware.js");
const patientController = require("../controllers/patients.js");

const {storage } = require("../cloudConfig.js");
const multer = require('multer'); // Import Multer
const upload = multer({ storage }); // Set upload destination

const validateListing2 = (req, res, next) => {
    let { error } = patientSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errorMsg);
    } else {
        next();
    }
}

router2.route("/")
    .get( wrapAsync(patientController.index))
    .post( isLoggedInP, upload.single("patient[img]"), validateListing2, wrapAsync(patientController.createPatient));
    

router2.get("/new2", isLoggedInP, patientController.renderNewForm);

router2.route("/:id")
    .get( wrapAsync(patientController.showPatient))
    .put( isLoggedInP, upload.single("patient[img]"), validateListing2,   wrapAsync(patientController.updatePatient))
    .delete( isLoggedInP, wrapAsync( patientController.destroyPatient));

router2.get("/:id/edit", isLoggedInP, wrapAsync(patientController.renderEditForm));

module.exports = router2;
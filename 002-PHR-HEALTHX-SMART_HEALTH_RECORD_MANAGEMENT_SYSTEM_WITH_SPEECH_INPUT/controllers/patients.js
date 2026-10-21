const Patient = require("../models/Patient");

module.exports.index = async(req, res) => {
    const allPatients = await Patient.find({});
    res.render("patients/index2.ejs", { allPatients });
};

module.exports.renderNewForm = (req, res) => {
    res.render("patients/new2.ejs");
};

module.exports.showPatient = async(req, res) => {
    let { id } = req.params;
    const patient = await Patient.findById(id).populate("owner");
    if(!patient){
        req.flash("error", "Patient's account you requested for doesn't exist !");
        res.redirect("/patients");
    }
    // console.log(patient);

    // let originalImgUrl = patient.img.url;
    // originalImgUrl = originalImgUrl.replace("/upload", "/upload/w_250");

    res.render("patients/show2.ejs", { patient});// Passing originalImgUrl.
};

module.exports.createPatient = async(req, res, next) => {
    // if(!req.body.patient){
    //     throw new ExpressError(400, "Send valid data for patients.");
    // }

        // let result = patientSchema.validate(req.body);
        // console.log(result);

        // if(result.error){
        //     throw new ExpressError(400, result.error);
        // }// Goes into 'validateListing2' middleware.
        let url = req.file.path;
        let filename = req.file.filename;
        // console.log(url, " .. ", filename);

        const newPatient = new Patient(req.body.patient);
        console.log(req.user);
        newPatient.owner = req.user._id;
        newPatient.img = { url, filename };
        await newPatient.save();

        req.flash("success", "New Patient's account has been created !");
        res.redirect("/patients");
};

module.exports.renderEditForm = async(req, res) => {
    let {id} = req.params;
    const patient = await Patient.findById(id);
    if(!patient){
        req.flash("error", "Patient's account you requested for doesn't exist !");
        res.redirect("/patients");
    }
    res.render("patients/edit2.ejs", {patient});
};

module.exports.updatePatient = async(req, res) => {
    if(!req.body.patient){
        throw new ExpressError(400, "Send valid data for patients.");
    }

    let {id} = req.params;
    let patient = await Patient.findByIdAndUpdate(id, {...req.body.patient});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        patient.img = { url, filename };
        await patient.save();
    }

    req.flash("success", "Patient's account updated successfully !");
    res.redirect(`/patients/${id}`);
};

module.exports.destroyPatient = async(req, res) => {
    let {id} = req.params;
    let deletedPatient = await Patient.findByIdAndDelete(id);
    console.log(deletedPatient);
    req.flash("success", "Patient's account has been deleted !");
    res.redirect("/patients");
};
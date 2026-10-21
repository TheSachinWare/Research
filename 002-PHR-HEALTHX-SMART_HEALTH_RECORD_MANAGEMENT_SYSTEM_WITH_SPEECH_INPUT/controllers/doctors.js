const Doctor = require("../models/Doctor");

module.exports.index = async(req, res) => {
    const allDoctors = await Doctor.find({});
    res.render("doctors/index1.ejs", {allDoctors});
};

module.exports.renderNewForm = (req, res) => {
    if(!req.isAuthenticated()){
        req.flash("error", "You must be logged in");
        return res.redirect("/loginD");
    }
    res.render("doctors/new1.ejs");
};

module.exports.showDoctor = async (req, res) => {
    let { id } = req.params;
    const doctor = await Doctor.findById(id).populate("reviews").populate("owner");//.populate() method is used to get the data using doctor id.
    if(!doctor){
        req.flash("error", "Doctor's account you requested for doesn't exist !");
        res.redirect("/doctors");
    }
    // console.log(doctor);
    res.render("doctors/show1.ejs", {doctor});
};

module.exports.createDoctor = async(req, res, next) => {
    // let { name, degree, ... } = req.body; // instead of doing this  we are doing following.

    // let doctor = req.body.doctor;
    // new Doctor[doctor];

    // if(!req.body.doctor){
    //     throw new ExpressError(400, "Send valid data for doctors.");
    // }// INstead of soing this for all attributes we are using following.

        // let result = doctorSchema.validate(req.body);
        // console.log(result);

        // if(result.error){
        //     throw new ExpressError(400, result.error);
        // }// Goes into 'validateListing1' middleware.

        let url = req.file.path;
        let filename = req.file.filename;
        // console.log(url, " .. ", filename);
        
        const newDoctor = new Doctor(req.body.doctor);
        console.log(req.user);
        newDoctor.owner = req.user._id;
        newDoctor.image = { url, filename };
        await newDoctor.save();

        req.flash("success", "New Doctor's account has been created !");
        res.redirect("/doctors");
        console.log(req.file);
};

module.exports.renderEditForm = async(req, res) => {
    let {id} = req.params;
    const doctor = await Doctor.findById(id);
    if(!doctor){
        req.flash("error", "Doctor's account you requested for doesn't exist !");
        res.redirect("/doctors");
    }

    // let originalImageUrl = doctor.image.url;
    // originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("doctors/edit1.ejs", {doctor});//Passing originalImageUrl.
};

module.exports.updateDoctor = async(req, res) => {
    if(!req.body.doctor){
        throw new ExpressError(400, "Send valid data for doctors.");
    }

    let {id} = req.params;
    let doctor = await Doctor.findByIdAndUpdate(id, {...req.body.doctor});//Deconstructed re.body.doctor here.

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        doctor.image = { url, filename };
        await doctor.save();
    }
    
    req.flash("success", "Doctor's account updated successfully !");
    res.redirect(`/doctors/${id}`);//redirected to 'show' route.
};

module.exports.destroyDoctor = async(req, res) => {
    let {id} = req.params;
    let deletedDoctor = await Doctor.findByIdAndDelete(id);
    console.log(deletedDoctor);
    req.flash("success", "Doctor's account has been deleted !");
    res.redirect("/doctors");
};

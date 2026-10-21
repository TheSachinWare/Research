const express = require("express");
const router3 = express.Router();
const General = require("../models/General.js");

const wrapAsync = require("../utils/wrapAsync.js");//Error handling tool similar to try-catch.
const ExpressError = require("../utils/ExpressError.js");// Express error handling (we sent error message as we want).
const { doctorSchema, patientSchema, generalSchema, reviewSchema } = require("../schema.js");

const validateListing3 = (req, res, next) => {
    let { error } = generalSchema.validate(req.body.general);
    if(error){
        let errorMsg = error.details.map((el) => el.message).join(",");
        // let errorMsg = error;
        throw new ExpressError(400, errorMsg);
    } else {
        next();
    }
}

router3.get("/", wrapAsync(async(req, res) => {
    const allGenerals = await General.find({});
    res.render("generals/index3.ejs", { allGenerals });
})
);

router3.get("/new3", (req, res) => {
    console.log(req.user);
    
    if(!req.isAuthenticated()){
        req.flash("error", "You must be logged in as Doctor to add First AID information account !");
        return res.redirect("/loginD");
    }
    res.render("generals/new3.ejs");
});

router3.get("/:id", wrapAsync(async(req, res) => {
    let { id } = req.params;
    const general = await General.findById(id);
    if(!general){
        req.flash("error", "First AID Information you requested for doesn't exist !");
        res.redirect("/generals");
    }
    res.render("generals/show3.ejs", {general});
})
);

router3.post("/", validateListing3, wrapAsync(async(req, res, next) => {
    // if(!req.body.general){
    //     throw new ExpressError(400, "Send valid data for generals.");
    // }

        // let result = generalSchema.validate(req.body);
        // console.log(result);

        // if(result.error){
        //     throw new ExpressError(400, result.error);
        // }// Goes into 'validateListing3' middleware.

        const newGeneral = new General(req.body.general);
        await newGeneral.save();
        req.flash("success", "New First AID Information has been created !");
        res.redirect("/generals");
})
);

router3.get("/:id/edit", wrapAsync(async(req, res) => {
    let {id} = req.params;
    const general = await General.findById(id);
    if(!general){
        req.flash("error", "First AID Information you requested for doesn't exist !");
        res.redirect("/generals");
    }
    res.render("generals/edit3.ejs", {general});
})
);

router3.put("/:id", validateListing3, wrapAsync(async(req, res) => {
    if(!req.body.general){
        throw new ExpressError(400, "Send valid data for generals.");
    }

    let {id} = req.params;
    await General.findByIdAndUpdate(id, {...req.body.general});
    req.flash("success", "First AID Information updated successfully !");
    res.redirect(`/generals/${id}`);
})
);

router3.delete("/:id", wrapAsync(async(req, res) => {
    let {id} = req.params;
    let deletedGeneral = await General.findByIdAndDelete(id);
    console.log(deletedGeneral);
    req.flash("success", "First AID Information has been deleted !");
    res.redirect("/generals");
})
);

module.exports = router3;
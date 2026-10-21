const { types } = require("joi");
const mongoose = require("mongoose");
const Schema12 = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchemaP = new Schema12({
    email : {
        type : String,
        required : true
    },

});

userSchemaP.plugin(passportLocalMongoose);

module.exports = mongoose.model("User_p", userSchemaP);
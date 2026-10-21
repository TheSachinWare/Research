const { types } = require("joi");
const mongoose = require("mongoose");
const Schema11 = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchemaD = new Schema11({
    email : {
        type : String,
        required : true
    },

});

userSchemaD.plugin(passportLocalMongoose);//It creates Username, hashing, salting & hash password that's why we plugin directly.

module.exports = mongoose.model("User_d", userSchemaD);
const mongoose = require("mongoose");
const Schema1 = mongoose.Schema;
const Review = require("./Review.js");

const listingSchema1 = new Schema1({
    name : {
        type : String,
        required : true
    },
    image : {
        // type : String,
        // default :  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile&psig=AOvVaw2v31ov29tOLiL4wcGiHJis&ust=1726143773371000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCND4yunwuogDFQAAAAAdAAAAABAE",
        // set : (v) =>
        //     v === ""
        //         ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile&psig=AOvVaw2v31ov29tOLiL4wcGiHJis&ust=1726143773371000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCND4yunwuogDFQAAAAAdAAAAABAE"
        //         : v//ternary operator.
        url : String,
        filename : String
    },
    degree : {
        type : String,
        required : true
    },
    specialization : String,
    clinicName : String,
    clinicCall : Number,
    clinicAdd : String,
    yearsOfEx : Number,
    consultingFees : Number,
    reviews: [
        {
            type : Schema1.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : Schema1.Types.ObjectId,
        ref: "User_d"
    }
});

// Post mongoose middleware.
listingSchema1.post("findOneAndDelete", async(doctor) => {
    if(doctor){
        await Review.deleteMany({_id : { $in: doctor.reviews }});
    }
});

const Doctor = mongoose.model("Doctor", listingSchema1);
module.exports = Doctor;
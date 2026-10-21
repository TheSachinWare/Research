const mongoose = require("mongoose");
const Schema2 = mongoose.Schema;

const listingSchema2 = new Schema2({
    name : {
        type : String,
        required : true
    },
    adhar : {
        type : Number,
        reuired : true,
        unique : true
    },
    dob : String ,
    age : Number,
    gender : String,
    phone : Number,
    email : String,
    address : String,
    emName : String,// em :- emergency.
    emRel : String,
    emCall : Number,
    isMarried : Boolean,
    bloodGr : String,
    occup : String,
    nation : String,
    lang : String,
    famMedHis : String,
    allergy : String,
    allergyNote : String,
    longDisease : String,
    surgeryTyp : String,
    surgeryDate : String,
    surgeon : String,
    surgeryNote : String,
    reasonApp: String,// Appointment reason.
    durationApp : String,
    dateApp : String,
    doctorApp : String,
    noteApp : String,
    vaccineTyp : String,
    vaccineDate : String,
    vaccineDoses : String,
    vaccineCenter : String,
    medicineUsing : String, // Current medication.
    medicineDose : String,
    medicineDays : String, //How many days of course.
    medicineNote : String,
    nowServerity : Number,
    exercise : String,
    sleep : String,
    diet : String,
    pastMedUsing : String, //past medication.
    pastMedReason : String,
    pastMedDose : String,
    pastMedDays : String,
    pastMedNote : String,
    pastServerity : String,
    pastExercise : String,
    pastSleep : String,
    pastDiet : String,
    labResultImg1 : {// Image format
        type : String,
    },
    labResultImg2 : {
        type : String,
    },
    bmi : Number,
    bp : Number,
    heartRate : Number,
    weight : Number,
    height : Number,
    insuranceName : String,
    insuranceSource : String,
    insuranceId : String,
    note : String,
    img : {
        // type : String,
        // default :  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile&psig=AOvVaw2v31ov29tOLiL4wcGiHJis&ust=1726143773371000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCND4yunwuogDFQAAAAAdAAAAABAE",
        // set : (v) =>
        //     v === ""
        //         ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile&psig=AOvVaw2v31ov29tOLiL4wcGiHJis&ust=1726143773371000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCND4yunwuogDFQAAAAAdAAAAABAE"
        //         : v//ternary operator.
        url : String,
        filename : String
    },
    owner : {
        type : Schema2.Types.ObjectId,
        ref : "User_p"
    }
});

const Patient = mongoose.model("Patient", listingSchema2);
module.exports= Patient;
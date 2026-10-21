const Joi = require("joi");

module.exports.doctorSchema = Joi.object({
    doctor: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().allow("", null).default("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile&psig=AOvVaw2v31ov29tOLiL4wcGiHJis&ust=1726143773371000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCND4yunwuogDFQAAAAAdAAAAABAE"),
        degree: Joi.string().required(),
        specialization: Joi.string().allow(null),
        clinicName: Joi.string().allow(null),
        clinicCall: Joi.number().integer().allow(null),
        clinicAdd: Joi.string().allow(null),
        yearsOfEx: Joi.number().integer().min(0).allow(null),
        consultingFees: Joi.number().required().min(0)
    }).required()
});

module.exports.patientSchema = Joi.object({
    patient: Joi.object({
        name: Joi.string().required(),
        adhar: Joi.number().required(), // `unique` will need to be enforced at the database level, not in Joi.
        dob: Joi.string().allow(null),
        age: Joi.number().allow(null),
        gender: Joi.string().allow(null),
        phone: Joi.number().allow(null),
        email: Joi.string().email().allow(null),
        address: Joi.string().allow(null),
        emName: Joi.string().allow(null),
        emRel: Joi.string().allow(null),
        emCall: Joi.number().allow(null),
        isMarried: Joi.boolean().allow(null),
        bloodGr: Joi.string().allow(null),
        occup: Joi.string().allow(null),
        nation: Joi.string().allow(null),
        lang: Joi.string().allow(null),
        famMedHis: Joi.string().allow(null),
        allergy: Joi.string().allow(null),
        allergyNote: Joi.string().allow(null),
        longDisease: Joi.string().allow(null),
        surgeryTyp: Joi.string().allow(null),
        surgeryDate: Joi.string().allow(null),
        surgeon: Joi.string().allow(null),
        surgeryNote: Joi.string().allow(null),
        reasonApp: Joi.string().allow(null),
        durationApp: Joi.string().allow(null),
        dateApp: Joi.string().allow(null),
        doctorApp: Joi.string().allow(null),
        noteApp: Joi.string().allow(null),
        vaccineTyp: Joi.string().allow(null),
        vaccineDate: Joi.string().allow(null),
        vaccineDoses: Joi.string().allow(null),
        vaccineCenter: Joi.string().allow(null),
        medicineUsing: Joi.string().allow(null),
        medicineDose: Joi.string().allow(null),
        medicineDays: Joi.string().allow(null),
        medicineNote: Joi.string().allow(null),
        nowServerity: Joi.number().allow(null),
        exercise: Joi.string().allow(null),
        sleep: Joi.string().allow(null),
        diet: Joi.string().allow(null),
        pastMedUsing: Joi.string().allow(null),
        pastMedReason: Joi.string().allow(null),
        pastMedDose: Joi.string().allow(null),
        pastMedDays: Joi.string().allow(null),
        pastMedNote: Joi.string().allow(null),
        pastServerity: Joi.string().allow(null),
        pastExercise: Joi.string().allow(null),
        pastSleep: Joi.string().allow(null),
        pastDiet: Joi.string().allow(null),
        labResultImg1: Joi.string().allow(null),
        labResultImg2: Joi.string().allow(null),
        bmi: Joi.number().allow(null),
        bp: Joi.number().allow(null),
        heartRate: Joi.number().allow(null),
        weight: Joi.number().allow(null),
        height: Joi.number().allow(null),
        insuranceName: Joi.string().allow(null),
        insuranceSource: Joi.string().allow(null),
        insuranceId: Joi.string().allow(null),
        note: Joi.string().allow(null),
        img: Joi.string().allow("", null).default("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile&psig=AOvVaw2v31ov29tOLiL4wcGiHJis&ust=1726143773371000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCND4yunwuogDFQAAAAAdAAAAABAE")
    }).required()
});

module.exports.generalSchema = Joi.object({
    info: Joi.string().allow(null)
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment : Joi.string().required()
    }).required()
});
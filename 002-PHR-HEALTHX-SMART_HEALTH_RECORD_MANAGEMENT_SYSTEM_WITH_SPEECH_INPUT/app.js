if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
console.log(process.env.SECRET);

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

// const Doctor = require("./models/Doctor.js");
// const Patient = require("./models/Patient.js");
// const General = require("./models/General.js");
// const Review = require("./models/Review.js");

// const { name } = require("ejs");
const path = require("path");
const methodOverride = require("method-override");//For overriding methods.
const ejsMate = require("ejs-mate");// For creating templates/layouts.

// const wrapAsync = require("./utils/wrapAsync.js");//Error handling tool similar to try-catch.
const ExpressError = require("./utils/ExpressError.js");// Express error handling (we sent error message as we want).
// const Joi = require("joi");//Server-side schema validation tool.
// const { doctorSchema, patientSchema, generalSchema, reviewSchema } = require("./schema.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");// When we anything on website, it will pop up a message what we have done & the message will be removed when we reload the website.
//app.use(flash());

const passport = require("passport");//Passport for authentication.
const LocalStrategy = require("passport-local");//Passport-locals for authenticating username & password.
//Passport-local-mongoose :-  To use passport smoothly with mongoDB we are using  this library.
const UserD = require("./models/userD.js");
const UserP = require("./models/userP.js");
// const UserA = require("./models/userA.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/PHR";
const dbUrl = process.env.ATLASDB_URL;

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploads

main()
    .then(() => {
        console.log("Connected to DB.");
    }).catch((err) => {
        console.log(err)
    });

async function main() {
    await mongoose.connect(dbUrl);
}

//Routes.
const doctorsRouter = require("./routes/doctor.js");
const patientsRouter = require("./routes/patient.js");
const generalsRouter = require("./routes/general.js");
const reviewsRouter = require("./routes/review.js");
const userDRouter = require("./routes/userD.js");
const userPRouter = require("./routes/userP.js");
// const userARouter = require("./routes/userA.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded( { extended : true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET
    },
    touchAfter : 24 * 3600
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
})

const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() +  7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true // For preventing from XSS attack.
    }
}


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(UserD.authenticate()));
passport.use(new LocalStrategy(UserP.authenticate()));
// passport.use(new LocalStrategy(UserA.authenticate()));

// passport.serializeUser(UserD.serializeUser());
// passport.deserializeUser(UserP.deserializeUser());
// passport.serializeUser(UserD.serializeUser());
// passport.deserializeUser(UserP.deserializeUser());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UserD.findById(id) || await UserP.findById(id) ;// || await UserA.findById(id).
    done(null, user);
});
// Refactor passport.serializeUser and passport.deserializeUser.

// Configuring passport to use two local strategies: doctor-local and patient-local.
// passport.use('doctor-local', new LocalStrategy(User_d.authenticate()));
// passport.use('patient-local', new LocalStrategy(User_p.authenticate()));

app.use((req, res, next) => {//Middlewre to use flash.
    console.log(req.user);
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demoUserD", async(req, res) => {
//     let fakeUser = new UserD({
//         email : "student@gmail.com",
//         username : "Ware"
//     });

//     let regUserD = await UserD.register(fakeUser, "HelloWorld");
//     res.send(regUserD);
// });

// pbkdf2 hashing algorithm is used.


// Assuming you're using Mongoose to interact with MongoDB
// Route to handle search queries
const Doctor = require("./models/Doctor.js");
const Patient = require("./models/Patient.js");
const General = require("./models/General.js"); // Ensure you have the correct path to your General model.

app.get('/searchD', async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery;

        // Check if searchQuery is undefined or empty.
        if (!searchQuery) {
            console.log("Search query is missing");
            return res.status(400).send("Bad Request: No search query provided");
        }

        console.log("Search query received:", searchQuery);  // Log the query.

        // Search doctors by name or specialization using regex for partial match (case-insensitive).
        const doctors = await Doctor.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { specialization: { $regex: searchQuery, $options: 'i' } }  // Added specialization search
            ]
        });

        // Check if doctors are found.
        if (doctors.length === 0) {
            console.log("No doctors found for query:", searchQuery);
        } else {
            console.log("Doctors found:", doctors);
        }

        // Render the page with search results
        res.render('doctors/index1', { allDoctors: doctors }); // Update this line if needed.
    } catch (err) {
        console.error("Error during search:", err);  // Log the error.
        res.status(500).send('Server Error');
    }
});


app.get('/searchP', async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery;

        // Check if searchQuery is undefined or empty.
        if (!searchQuery) {
            console.log("Search query is missing");
            return res.status(400).send("Bad Request: No search query provided");
        }

        console.log("Search query received:", searchQuery);  // Log the query.

        // Prepare the search criteria.
        const searchCriteria = {
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { email: { $regex: searchQuery, $options: 'i' } },
            ]
        };

        // Only add phone search if searchQuery is a number.
        if (!isNaN(searchQuery)) {
            searchCriteria.$or.push({ phone: Number(searchQuery) }); // Convert to Number.
        }

        // Search patients using the prepared criteria.
        const patients = await Patient.find(searchCriteria);

        // Check if patients are found.
        if (patients.length === 0) {
            console.log("No patients found for query:", searchQuery);
        } else {
            console.log("Patients found:", patients);
        }

        // Render the page with search results.
        res.render('patients/index2', { allPatients: patients });
    } catch (err) {
        console.error("Error during search:", err.message);  // Log the error message.
        res.status(500).send('Server Error: ' + err.message);
    }
});

app.get('/searchG', async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery;

        // Check if searchQuery is undefined or empty.
        if (!searchQuery) {
            console.log("Search query is missing");
            return res.status(400).send("Bad Request: No search query provided");
        }

        console.log("Search query received:", searchQuery);  // Log the query.

        // Search generals using regex for partial match (case-insensitive)
        const generals = await General.find({
            info: { $regex: searchQuery, $options: 'i' } // Case-insensitive search by info
        });

        // Check if generals are found
        if (generals.length === 0) {
            console.log("No first aid information found for query:", searchQuery);
        } else {
            console.log("First aid information found:", generals);
        }

        // Render the page with search results
        res.render('generals/index3', { allGenerals: generals }); // Adjust the render path if necessary
    } catch (err) {
        console.error("Error during search:", err);  // Log the error
        res.status(500).send('Server Error');
    }
});

app.use("/doctors", doctorsRouter);
app.use("/patients", patientsRouter);
app.use("/generals", generalsRouter);
app.use("/doctors/:id/reviews", reviewsRouter);// To send the ':id' of doctors to reviewID so that we can add review.We are using mergeParams.
app.use("/", userDRouter);
app.use("/", userPRouter);
// app.use("/", userARouter);


// Index routes.
// New route.
// Show routes.
//Create route.
//Edit route.
//Update route.
//Delete route.

//Reviews.
// Post review route.
//Delete review route.

// app.get("/testListing1", async (req, res) => {
//     let sampleListing = new Doctor({
//         name : "XYZ",
//         degree : "MBBS",
//     });

//     await sampleListing.save();
//     console.log("Sample was saved.");
//     res.send("Successful Testing.");
// });

// app.get("/testListing2", async(req, res) => {
//     let sampleListing = new Patient({
//         name : "Dr.ABC"
//     });

//     await sampleListing.save();
//     console.log("Sample of patient is saved");
//     res.send("Successful patient testing");
    
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home', 'index.html'));
});


//Chatbot :-
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { required } = require('joi');

app.use(cors());//
app.use(cors({
    origin: 'http://localhost:8080/chatbot', // Change this to the URL of your frontend
    methods: 'GET,POST'
}));

app.use(express.json());// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

console.log(process.env.GEMINI_API_KEY); // This should print the API key

// Serve the index.html file at /chatbot
app.get('/chatbot', (req, res) => {
    res.sendFile(path.join(__dirname, 'chatbot', 'chatbot.html'));
});

// Chat endpoint
app.post('/chat', async (req, res) => {
    const prompt = req.body.prompt;
    console.log(`Received prompt: ${prompt}`);

    try {
    const result = await model.generateContent(prompt, {
        max_output_tokens: 150,
        temperature: 0.7,
    });

    let chatbotMessage = result.response.text().trim();
    chatbotMessage = removeUnwantedPhrasesAndFormatting(chatbotMessage);

    console.log(`Gemini response: ${chatbotMessage}`);
    res.json({ response: chatbotMessage });
    } catch (error) {
    console.error(`Unexpected error: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
    }
});

function removeUnwantedPhrasesAndFormatting(response) {
    const unwantedPhrases = [
        "I'm an AI and can't provide medical advice.",
        "It's crucial you seek immediate medical attention.",
        "Do not attempt to self-treat or delay seeking professional help.",
        "Please prioritize your health and get the necessary medical care.",
        "I'm an AI and cannot provide medical advice.",
        "I am an AI and not a medical professional. I cannot provide medical advice.",
        "I am an AI and cannot provide medical advice. It's crucial to seek immediate medical attention if you're experiencing chest pain.",
        "I am an AI and cannot provide medical advice.",
        "I'm not a medical professional, and I can't provide medical advice.",
    ];
    unwantedPhrases.forEach(phrase => {
        response = response.replace(phrase, '');
    });
    response = response.replace(/\*\*/g, ''); // Remove all instances of '**'
        return response.trim();
}

// --------------------------------------------------------- \\


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statusCode=500, message = "Something Went Wrong..."} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", { err });
});

app.listen(port, () => {
    console.log(`Server is listening to port :- ${port}`);
});

// We are using express-router to make our code in more structured format.
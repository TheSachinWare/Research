const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User_d = require("./models/userD.js");
const User_p = require("./models/userP.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/PHR";

//Routes.
const doctorsRouter = require("./routes/doctor.js");
const patientsRouter = require("./routes/patient.js");
const generalsRouter = require("./routes/general.js");
const reviewsRouter = require("./routes/review.js");
const userDRouter = require("./routes/userD.js");
const userPRouter = require("./routes/userP.js");

const session = require("express-session");
const flash = require("connect-flash");

main()
    .then(() => {
        console.log("Connected to DB.");
    }).catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true // For preventing from XSS attack.
    }
};

// Session middleware comes before flash
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Refactor passport.serializeUser and passport.deserializeUser
passport.serializeUser((user, done) => {
    done(null, { id: user.id, type: user instanceof User_d ? 'doctor' : 'patient' });
});

passport.deserializeUser(async (user, done) => {
    try {
        let foundUser;
        if (user.type === 'doctor') {
            foundUser = await User_d.findById(user.id);
        } else if (user.type === 'patient') {
            foundUser = await User_p.findById(user.id);
        } else {
            throw new Error('Invalid user type');
        }
        done(null, foundUser);
    } catch (err) {
        done(err);
    }
});

// Configuring passport to use two local strategies
passport.use('doctor-local', new LocalStrategy(User_d.authenticate()));
passport.use('patient-local', new LocalStrategy(User_p.authenticate()));

// Middleware for flash messages
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Routes
app.use("/doctors", doctorsRouter);
app.use("/patients", patientsRouter);
app.use("/generals", generalsRouter);
app.use("/doctors/:id/reviews", reviewsRouter);
app.use("/", userDRouter);
app.use("/", userPRouter);

app.get('/', (req, res) => {
    res.render("home/index.ejs");
});

// Error handling for undefined routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// General error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something Went Wrong..." } = err;
    res.status(statusCode).render("error.ejs", { err });
});

// Start server
app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
});
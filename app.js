if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

console.log(process.env.SECRET);

//Requiring Part

const port = 8080;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbUrl = process.env.ATLASDB_URL;
const Listing = require("./models/listing.js");
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/reviews.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport =  require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

//Express router

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

//Setting Path

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended : true }));
app.use(methodoverride("_method"));
app.engine("ejs", ejsMate);

//Sessions


const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret: process.env.SECRET,
    },
    touchAfter : 24*3600,
});

store.on("error", () => {
    console.log("error", error);
});

const sessionOptions =  {   
    store,
    secret : process.env.SECRET,
    resave : false, 
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}


app.use(session(sessionOptions));
app.use(flash());

//Authentication- passport

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connection flash

app.use((req, res, next) => {
    res.locals.succmsg = req.flash("success");
    res.locals.errmsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


//Connection to Database

main()
    .then((res) => {
        console.log("Connection successful");
    })
    .catch((err) => {
        console.log("Connection wasnot successful", err);
    });

async function main(){
    await mongoose.connect(dbUrl);
}

//Root route

app.get("/", (req, res) => {
    res.redirect("/listings");
});

// app.get("/demouser", async(req, res) => {
//     let fakeUser = new User({
//         email: "rtgy@gmail.com",
//         username: "rohiuigit"
//     });

//     let newUser = await User.register(fakeUser, "helloworld");
//     res.send(newUser);
// });




//Listing shortcut

app.use("/listings", listingRouter);

//review shortcut

app.use("/listings/:id/reviews", reviewsRouter);

//User login

app.use("/", userRouter);

//Wrong path

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

//Error handling middleware

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("Error.ejs", { message });
});


//Server starting part

app.listen(port, (req, res) => {
    console.log("Server is listening to the port");
});


/*

app.get("/testlistening", async(req, res) => {
    let sampleListening = new Listing({
        title: "My new villa",
        description: "By the beach",
        price: 1200,
        location: "Goa",
        country: "India"
    });

    await sampleListening.save()
    .then((res) => {
        console.log(res);
    });
    console.log("Saved");
    res.send("working");
});

*/
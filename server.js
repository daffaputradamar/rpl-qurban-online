const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const methodOverride = require("method-override");
const session = require("express-session");
const config = require("./config/database");

const userApiRoute = require("./routes/api/users");
const mosqueApiRoute = require("./routes/api/mosques");

const userRoute = require("./routes/users");
const mosqueRoute = require("./routes/mosques");
const adminRoute = require("./routes/admin");

const app = express();

//enable logger
app.use(logger("dev"));

//use CORS
app.use(cors());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

//bring in models
let Mosque = require("./models/").Mosque;

//load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//use method-override
app.use(methodOverride("_method"));

//use body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static files
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);
app.use(
  "/popper",
  express.static(path.join(__dirname, "node_modules/popper.js/dist"))
);
app.use(
  "/jquery",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(
  "/materialize",
  express.static(path.join(__dirname, "node_modules/materialize-css/dist"))
);

//Express-session middleware
app.use(
  session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
  })
);

//Express-messaging
app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

//Passport config
require("./config/passport")(passport);
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//Api routes
app.use("/api/users", userApiRoute);
app.use("/api/mosques", mosqueApiRoute);

//Web routes
app.use("/users", userRoute);
app.use("/mosques", mosqueRoute);
app.use("/admin", adminRoute);

//Home route
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("app listening in http://localhost:3000");
});

require("dotenv").config({ override: true });
const bcrypt = require("bcryptjs");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
const passport = require("passport");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const User = require("./models/user");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

var indexRouter = require("./routes/index");
const catalogRouter = require("./routes/catalog");

var app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.ConnectionString;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  session({
    secret: process.env.SessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", catalogRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

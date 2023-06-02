const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Member = require("./models/member");

const indexRouter = require("./routes/index");

var app = express();

mongoose.set("strictQuery", false);
const mongoDB = "mongodb://localhost/twoooter";
// Creates default connection to mongoDB and logs errors
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
const db = mongoose.connection;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// passport shit
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const member = await Member.findOne({ email: email });
      if (!member) {
        return done(null, false, { message: "incorrect username" });
      }
      if (member.password !== password) {
        return done(null, false, { message: "incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// creates a session for the user to remain logged in while using twooter
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  try {
    const member = await Member.findById(id);
    done(null, member);
  } catch (err) {
    done(err);
  }
});
app.use(session({ secret: "smth?", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

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

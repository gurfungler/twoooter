const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Member = require("../models/member");

// Gets a member, then compares the hashed passwords
const strategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      const member = await Member.findOne({ email: email });

      if (!member) {
        return done(null, false, { message: "incorrect username" });
      }
      if (!(await bcrypt.compare(password, member.password))) {
        return done(null, false, { message: "incorrect password" });
      }

      return done(null, member);
    } catch (err) {
      return done(err);
    }
  }
);

// passport shit
passport.use(strategy);

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

module.exports = passport;

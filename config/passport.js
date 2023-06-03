const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Gets a member, then compares the hashed passwords
const strategy = new LocalStrategy(async (username, password, done) => {
  try {
    const member = await Member.findOne({ email: email });
    if (!member) {
      return done(null, false, { message: "incorrect username" });
    }
    if (bcrypt.compare(member.password, password)) {
      return done(null, false, { message: "incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

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

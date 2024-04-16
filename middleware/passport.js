const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const user_controller = require("../controller/user_controller");

const localLogin = new LocalStrategy(
  {
    usernameField: "email", // Overrides for email instead of username, default is username so don't need this dict if want username
    passwordField: "password",
  },
  (email, password, done) => {
    console.log("Local strategy verify cb");
    const user = user_controller.getUserByEmailIdAndPassword(
      email,
      password
    );
    console.log("Local strategy verify cb");
    return user // short form if else in ternary
      ? done(null, user) // create session for user (log them in)
      : done(null, false, {
          // don't create a session
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  // Creates session and creates req.user = user
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // Checks if they still exist in db on every request
  // Must check ID to get latest information
  let user = user_controller.getUserById(id);
  if (user) {
    done(null, user); // latest user
  } else {
    done({ message: "User not found" }, null);
  }
});

// passport.use("totp", totpLogin);
passport.use("login", localLogin);

module.exports = passport;

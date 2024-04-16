const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const user_controller = require("../controller/user_controller");

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = user_controller.getUserByEmailIdAndPassword(
      email,
      password
    );
    return user
      ? done(null, user)
      : done(null, false, {
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
passport.use("local", localLogin);

module.exports = passport;

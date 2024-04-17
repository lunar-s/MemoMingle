// passport-local auth
// admin functionality (revoke a session)
// view, edit, delete reminders for the logged-in user
// hide the nav bar if not logged in

// Bonus:
// 1. When a user creates a new reminder, add an option for a "banner keyword".
// 2. When a user views a reminder, there should be a banner image related to that reminder on display.

let { database } = require("../database");
const { createUser } = require("../controller/user_controller");
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  logout: (req, res) => {
    req.logout(req.user, (err) => {
      if (err) return next(err);
      res.redirect("/login");
    });
  },

  register: (req, res) => {
    res.render("auth/register", { message: null });
  },

  loginSubmit: (req, res, next) => {
    res.redirect("/reminders");
  },
  // createUser()
  registerSubmit: (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    createUser(res, email, password);
  },

  adminDash: (req, res, next) => {
    store = req.sessionStore;
    store.all(function (err, sessions) {
      for (const session in sessions) {
        console.log(sessions.passport);
      }
      if (err) {
        console.log(err);
      } else {
        res.render("admin", {
          user: req.user,
          sessions: sessions,
        });
      }
    });
  },
};

module.exports = authController;

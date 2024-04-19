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
    const email = req.query.email;
    res.render("auth/register", { message: null, email: email });
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
    store.all((err, sessions) => {
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

  adminRevokeSession: (req, res) => {
    store = req.sessionStore;
    store.destroy(req.params.sid, (err) => {
      if (err) {
        console.log(err);
      } else res.redirect("/admin/dashboard");
    });
  },
};

module.exports = authController;

// passport-local auth
// admin functionality (revoke a session)
// view, edit, delete reminders for the logged-in user
// hide the nav bar if not logged in

// Bonus:
// 1. When a user creates a new reminder, add an option for a "banner keyword".
// 2. When a user views a reminder, there should be a banner image related to that reminder on display.

let database = require("../database");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement later
    
  },

  registerSubmit: (req, res) => {
    // implement later
    
  },
};

module.exports = authController;

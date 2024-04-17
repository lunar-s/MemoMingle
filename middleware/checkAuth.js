module.exports = {
  // check if the user currently has a session
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },
  // if an user has logged in, there is no need for them to log in again
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/reminders");
  },
  // if an user is admin, then is directed to admin page
  isAdmin: function (req, res, next) {
    if (req.user.role === "admin") {
      return next();
    }
    res.redirect("/reminders");
  },
};

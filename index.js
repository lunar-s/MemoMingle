const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const passport = require("./middleware/passport");
const session = require("express-session");
const {
  forwardAuthenticated,
  ensureAuthenticated,
  isAdmin,
} = require("./middleware/checkAuth");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Passes the user variable to all views, if authenticated then shows navbar
// If role admin, then show admin button in navbar
app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    res.locals.admin = req.user.role;
  } else {
    res.locals.user = null;
    res.locals.admin = null;
  }
  next();
});

app.use(ejsLayouts);
app.set("view engine", "ejs");

// Routes start here
app.get("/reminders", ensureAuthenticated, reminderController.list);
app.get("/reminder/new", ensureAuthenticated, reminderController.new);
app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);
app.get(
  "/reminder/:id/edit",
  ensureAuthenticated,
  reminderController.edit
);
app.post("/reminder/", ensureAuthenticated, reminderController.create);
// ⭐ Implement these two routes below!
app.post(
  "/reminder/update/:id",
  ensureAuthenticated,
  reminderController.update
);
app.post(
  "/reminder/delete/:id",
  ensureAuthenticated,
  reminderController.delete
);

// Register
app.get("/register", authController.register);
// Login
app.get("/login", forwardAuthenticated, authController.login);
// Logout
app.get("/logout", ensureAuthenticated, authController.logout);

// Admin Dashboard
app.get(
  "/admin/dashboard",
  ensureAuthenticated,
  isAdmin,
  authController.adminDash
);

//Register post
app.post("/register", authController.registerSubmit);

// Login post
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),

  authController.loginSubmit
);

// Sessione revoking
app.post(
  "/admin/revoke-session/:sid",
  ensureAuthenticated,
  isAdmin,
  (req, res) => {
    store = req.sessionStore;
    store.destroy(req.params.sid, function (err) {
      if (err) {
        console.log(err);
      } else res.redirect("/admin");
    });
  }
);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
  );
});

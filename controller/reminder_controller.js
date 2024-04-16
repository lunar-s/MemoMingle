let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", {
        reminderItem: searchResult,
      });
    } else {
      res.render("reminder/index", {
        reminders: database.cindy.reminders,
      });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // Find the reminder to update
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    // Update the reminder from the form data
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    console.log(req.body.completed);
    if (req.body.completed === "true") {
      searchResult.completed = true;
    } else {
      searchResult.completed = false;
    }
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Splice the offending reminder
    database.cindy.reminders.splice(req.params.id - 1, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;

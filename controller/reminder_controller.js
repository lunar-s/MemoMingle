let database = require("../database");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { accessKey } = require("../access_key");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      getImage(searchResult.description)
        .then((url) => {
          res.render("reminder/single-reminder", {
              reminderItem: searchResult,
              imageUrl: url
          });
        })
        .catch((err) => console.log(err))
      // res.render("reminder/single-reminder", {
      //   reminderItem: searchResult,
      // });
    } else {
      res.render("reminder/index", {
        reminders: req.user.reminders,
      });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // Find the reminder to update
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    // Update the reminder from the form data
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    if (req.body.completed === "true") {
      searchResult.completed = true;
    } else {
      searchResult.completed = false;
    }
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Splice the offending reminder
    req.user.reminders.splice(req.params.id - 1, 1);
    res.redirect("/reminders");
  },
};

async function getImage(keyword) {
  const url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=` + keyword;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  return data.results[0].urls.regular;
}

module.exports = remindersController;

let { database, userModel } = require("../database");

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

// createUser(), auth_controller
const createUser = (res, email, password) => {
  let userExists = userModel.findOne(email);
  if (userExists) {
    res.render("auth/register", {
      message: "Email taken! Please choose another",
    });
    return "Error: Email taken!";
  }
  let user = {
    id: database.length + 1,
    email: email,
    password: password,
    reminders: [
      {
        id: 1,
        title: "Make my first list!",
        description: "Click create",
        completed: false,
      },
    ],
  };
  database.push(user);
  res.redirect("/login");
};

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  createUser,
};

let database = [
  {
    id: 1,
    name: "cindy",
    email: "cindy123@gmail.com",
    password: "cindy123",
    role: "admin",
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: "alex",
    email: "alex123@gmail.com",
    password: "alex123",
    reminders: [
      {
        id: 1,
        title: "Basketball practice",
        description: "Bring napkins for dribbling",
        completed: false,
      },
    ],
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    return null;
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

module.exports = {
  userModel,
  database,
};

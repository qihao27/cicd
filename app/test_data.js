let users = [
  {
    first_name: "Dena",
    last_name: "Charle",
    email: "dcharle0@indiegogo.com",
    user_id: 1,
    phone: "98765433"
  },
  {
    first_name: "Dynah",
    last_name: "Waiting",
    email: "dwaiting1@google.com.br",
    user_id: 2,
    phone: "98765434"
  },
  {
    first_name: "Marc",
    last_name: "Conibeer",
    email: "mconibeer2@desdev.cn",
    user_id: 3,
    phone: "98765555"
  }
];

function get_all_users() {
  return users;
}
function get_user_by_user_id(user_id) {
  for (i = 0; i < users.length; i++) {
    if (users[i].user_id == user_id) {
      return users[i];
    }
  }
}

function get_sum(a, b) {
  return a+b;
}

module.exports = {
  get_all_users,
  get_user_by_user_id,
  get_sum
};

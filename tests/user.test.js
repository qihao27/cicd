const data = require("../app/test_data");

test('Returns user by user_id', () => {
    const user =
        {
          first_name: "Dynah",
          last_name: "Waiting",
          email: "dwaiting1@google.com.br",
          user_id: 2,
          phone: "98765434"
        };
    expect(data.get_user_by_user_id(2)).toEqual(user);
})

test('Returns all users', () => {
    const users = [
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
    expect(data.get_all_users()).toEqual(users);
});

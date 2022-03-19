const express = require("express");
const path = require("path");
const database = require("./data");

let router = express.Router();
router.use("/public", express.static(path.join(__dirname, "public")));

router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname + "/index.html"));
});

router.get("/user/all", (request, response) => {
    let users = database.get_all_users();
    response.send(users);
});

router.get("/user/by-uid", (request, response) => {
    let users = database.get_user_by_user_id(request.query.uid);
    response.send(users);
});

router.post("/user/add", (request, response) => {
  let user = database.add_user(request.body.user);
  response.send("user added.");
});

router.get("/sum", (request, response) => {
    let sum = parseInt(request.query.a) + parseInt(request.query.b);
    response.send("Sum is: " + sum);
  });

router.post("/sum", (request, response) => {
    let sum = request.body.a + request.body.b;
    response.send("Sum is : " + sum);
});

module.exports = { router };

const express = require('express');
const data = require("./data");
const app = express();
require('dotenv').config();

// req.isAuthenticated is provided from the auth router
app.get('/', (request, response) => {
  response.send("Hello, World!")
});

app.get('/user/all', (request, response) => {
  let user = data.get_all_users();
  response.status(200).send(user);
});

app.get('/user/by-uid', (request, response) => {
  let user = data.get_user_by_user_id(request.query.user_id);
  response.status(200).send(user);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

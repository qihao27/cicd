const express = require("express");
const cors = require("cors");
const { router } = require("./routers");

let app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

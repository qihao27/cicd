const express = require("express");
const cors = require("cors");
const { router } = require("./routers");

let app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3000, (errors) => {
    if (errors) console.log(errors);
    else console.log("Server started on port 3000.");
})

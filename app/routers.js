const express = require("express");
const path = require("path");
require("dotenv").config();
const { connection } = require("./database");

let router = express.Router();
router.use("/public", express.static(path.join(__dirname, "public")));

router.get("/", (req, res) => {
    res.redirect("/index");
});

router.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

router.get("/user/all", (req, res) => {
    connection.query(`select * from user`, (err, result) => {
        if (err) {
            console.log(err);
            response.status(500).send("Something went wrong...");
        } else {
            result.length == 0
            ? res.status(404).send("data not found")
            : res.status(200).send(result);
        }
    });
});

router.get("/user/by-uid", (req, res) => {
    let uid = req.query.uid;
    connection.query(`select * from user where uid=${uid}`, (err, result) => {
        if (err) {
            console.log(err);
            response.status(500).send("Something went wrong...");
        } else {
            result.length == 0
            ? res.status(404).send("user not found")
            : res.status(200).send(result);
        }
    });
});

router.get("/query", (req, res) => {
    let sql = req.query.sql;
    connection.query(`${sql}`, (err, result) => {
        if (err) {
            console.log(err);
            response.status(500).send("Something went wrong...");
        } else {
            result.length == 0
            ? res.status(404).send("data not found")
            : res.status(200).send(result);
        }
    });
});

router.get("/db/tables", (req, res) => {
    connection.query(`show tables`, (err, result) => {
        if (err) {
            console.log(err);
            response.status(500).send("Something went wrong...");
        } else {
            result.length == 0
            ? res.status(404).send("data not found")
            : res.status(200).send(result);
        }
    });
});

router.get("/sum", (req, res) => {
    let sum = parseInt(req.query.a) + parseInt(req.query.b);
    res.send("Sum is: " + sum);
  });

module.exports = { router };

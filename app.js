console.log("Web Serverni boshlash");
const express = require("express");
const res = require("express/lib/response");
const app = express();

const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf-8", (err, data) => {
  if (err) {
    console.log("ERROR:", err);
  } else {
    user = JSON.parse(data)
  }
});

// MongoDB connect
const db = require("./server").db();

// 1 Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 2 Session
// 3 Views code
app.set("views", "views");
app.set("view engine", "ejs");
// Routing code
app.post("/create-item", (req, res) => {
  console.log("user entered /create-item");
  const new_reja = req.body.reja;
  db.collection("plans").insertOne({reja: new_reja }, (err, data) => {
    console.log(data.ops);
    res.jyson(data.ops[0]);
  });
});


// app.get("/author", (req, res) => {
// res.render("author", { user: user } );
// });

app.get("/", function (req, res) {
  console.log("user entered /");
  db.collection("plans")
  .find()
  .toArray((err, data) => {
    if (err) {
      console.log(err);
      res.end("something went wrong");
    } else {
      console.log(data);
      res.render("reja", { items: data });
    }
  });
});    

module.exports = app;
    

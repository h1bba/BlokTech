const express = require("express");
const http = require("http");
const app = express();

const host = "localhost";
const port = 8000;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routing
app.get("/liked", (req, res) => {
  res.render("liked.ejs", { data: port });
});

// app.get("*", (req, res) => {
//   res.render("404.ejs", { data: port });
// });

// 404 error
app.use(function (req, res) {
  res.status(404).render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

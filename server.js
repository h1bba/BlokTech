require("dotenv").config();
const express = require("express");

const http = require("http");
const app = express();

const password = process.env.PASSWORD;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://hibbayt:" +
  password +
  "@databasecluster.8o2zfan.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
console.log("connected");

//

const host = "localhost";
const port = 8000;
const ejs = require("ejs");

app.use(express.static("public"));
app.use("*/css", express.static("public/css"));
app.use("*/upload", express.static("public/upload"));
app.use("*/images", express.static("public/images"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routing
app.get("/liked", (req, res) => {
  res.render("liked.ejs", { data: port });
});

app.get("/header", (req, res) => {
  res.render("header.ejs", { data: port });
});

app.get("/footer", (req, res) => {
  res.render("footer.ejs", { data: port });
});

app.get("/index", (req, res) => {
  res.render("index.ejs", { data: port });
});

app.get("/form", (req, res) => {
  res.render("form.ejs", { data: port });
});

// 404 error
app.use(function (req, res) {
  res.status(404).render("404.ejs");
});

app.listen(port, () => console.log(`Host is live op port ${port}`));

// mongoose.connect.once("open", () => {
//   console.log("Connected to MongoDB");
//   app.listen(port, () => console.log(`Host is live op port ${port}`));
// });

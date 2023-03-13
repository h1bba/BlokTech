require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 8000;
const uri = process.env.MONGODB_URI;

const ejs = require("ejs");

const mongoose = require('mongoose');
const Profiles = require('./models/profiles')
mongoose.set('strictQuery', false);

app.use(express.static("public"));
app.use("*/css", express.static("public/css"));
app.use("*/upload", express.static("public/upload"));
app.use("*/images", express.static("public/images"));

app.set("view engine", "ejs");

const profiles = new Profiles({
  name: 'Anne',
  age: '21',
  pic: '',
  likeback: true
});

// profiles.save();

const profilesSchema = {
  name: String,
  age: String,
  pic: String,
  likeback: Boolean
}

const Profile = mongoose.model('Profile', profilesSchema);


app.get("/", (req, res) => {
  res.send(profiles);
});

app.get("/liked", async (req, res) => {
  try {
    const likes = await Profile.find({ liked: true });
    res.render("liked.ejs", {
      likesList: likes
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/header", (req, res) => {
  res.render("header.ejs", {
    data: {
      port
    }
  });
});

app.get("/footer", (req, res) => {
  res.render("footer.ejs", {
    data: {
      port
    }
  });
});

app.get("/index", (req, res) => {
  res.render("index.ejs", {
    data: {
      port
    }
  });
});

app.get("/swipe", (req, res) => {
  res.render("swipe.ejs", {
    data: {
      port
    }
  });
});

app.get("/form", (req, res) => {
  res.render("form.ejs", {
    data: {
      port
    }
  });
});

app.use((req, res) => {
  res.status(404).render("404.ejs", {
    data: {
      port
    }
  });
});

const start = async () => {
  try {
    await mongoose.connect(uri);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err.message)
  }
}

start();
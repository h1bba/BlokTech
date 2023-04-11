/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 8000;
const uri = process.env.MONGODB_URI;
const axios = require('axios');


const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

app.use(express.static("public"));
app.use("*/css", express.static("public/css"));
app.use("*/upload", express.static("public/upload"));
app.use("*/images", express.static("public/images"));

app.set("view engine", "ejs");


const profilesSchema = {
  name: String,
  age: String,
  pic: String,
  likeback: Boolean,
  liked: Boolean,
};

const Profile = mongoose.model("Profile", profilesSchema);

app.get("/", (req, res) => {
  res.redirect("/index");
});

app.get("/liked", async (req, res) => {
  const active = "liked";
  try {
    const likes = await Profile.find({
      liked: true,
    });
    res.render("liked.ejs", {
      likesList: likes,
      active: active,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/like/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await Profile.findByIdAndUpdate(
      id, {
        liked: false,
      }, {
        new: true,
      }
    );
    res.redirect("/liked");
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.get("/unlike/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // eslint-disable-next-line no-unused-vars
    const profile = await Profile.findByIdAndUpdate(
      id, {
        liked: true,
      }, {
        new: false,
      }
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

//

app.get("/header", (req, res) => {
  res.render("header.ejs", {
    data: {
      port,
    },
  });
});

app.get("/footer", (req, res) => {
  res.render("footer.ejs", {
    data: {
      port,
    },
  });
});

app.get("/chat", async (req, res) => {
  const active = "chat";

  try {
    const response = await axios.get('https://vinuxd.vercel.app/api/pickup');
    const data = response.data;
    res.render("chat.ejs", {
      data: data,
      active: active,
    });
    console.log(data)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

app.get("/index", async (req, res) => {
  const active = "home";
  try {
    const likes = await Profile.find({
      liked: false,
    });
    res.render("index.ejs", {
      likesList: likes,
      active: active,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/form", (req, res) => {
  res.render("form.ejs", {
    data: {
      port,
    },
  });
});

app.use((req, res) => {
  res.status(404).render("404.ejs", {
    data: {
      port,
    },
  });
});

const start = async () => {
  try {
    await mongoose.connect(uri);
    console.log("mongoose connected succesfully");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
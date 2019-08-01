require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const authCtrl = require("./controllers/authController");

const SERVER_PORT = 4000;
const { SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db connected");

  app.listen(SERVER_PORT, () =>
    console.log(`Listening on port ${SERVER_PORT}`)
  );
});

app.post("/auth/register", authCtrl.register);

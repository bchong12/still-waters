//requires here
require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCtrl = require("./controllers/authCtrl");
const postCtrl = require("./controllers/postCtrl");
const devoCtrl = require("./controllers/devoCtrl");
const path = require("path");

//create an express instance
const app = express();

//use express parsers
app.use(express.json());

//database
massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((db) => {
  app.set("db", db);
  console.log("db is connected");
});

//cookie sessions set up
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
  })
);

//endpoints
app.post("/auth/login", authCtrl.login);
app.post("/auth/register", authCtrl.register);
app.post("/auth/logout", authCtrl.logout);
app.get("/auth/me", authCtrl.me);

//journal endpoints
app.get("/journals/:userId/:id", postCtrl.getJournal);
app.get("/journals/:userId", postCtrl.getJournals);
app.post("/journal/new", postCtrl.createJournal);
app.put("/journal/:id", postCtrl.updateJournal);
app.delete("/journal/:userId/:id", postCtrl.deleteJournal);
app.get("/journal/:userId/:date", postCtrl.getJournalsBasedOn);

//devo endpoints
app.get("/devos/:userId/:id", devoCtrl.readDevo);
app.get("/devos/:userId", devoCtrl.readDevos);
app.post("/devos/new", devoCtrl.createDevo);
app.put("/devos/:id", devoCtrl.editDevos);
app.delete("/devos/:userId/:id", devoCtrl.deleteDevo);
app.get("/devo/:userId/:date", devoCtrl.getDevoBasedOn);

app.use(express.static(__dirname + "/../build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../build/index.html"));
});

//server
app.listen(SERVER_PORT, console.log(`Server is running on ${SERVER_PORT}`));

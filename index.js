const http = require("http");
const port = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const router = express.Router();
const app = express();
const server = http.createServer(app);
const database = require("./VillaDatabase");

var corsOptions = {
  origin: "http://localhost:8080",
};
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(database);
});

app.patch("/bookVilla/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params.id);

  let villaIndex = database.findIndex((db) => db.name === req.params.id);
  database[villaIndex].availableDates.startDate = req.body.startDate;
  database[villaIndex].availableDates.endDate = req.body.endDate;
  console.log(database[villaIndex]);
  res.json({ status: "success" });
});
server.listen(port, (req, res) => {
  console.log(`Server Startes on ${port}`);
});

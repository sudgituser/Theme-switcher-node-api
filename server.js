const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const Theme = db.theme;
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:5000"
};
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node-express theme changer application." });
});


  db.sequelize.sync().then((data)=>{
  }).catch((err)=>{});


// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
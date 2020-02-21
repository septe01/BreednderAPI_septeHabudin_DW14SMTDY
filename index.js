// instantiate express module
const express = require("express");
// initiate body-parser
const bodyParser = require("body-parser");
require("express-group-routes");

// use express in app variable
const app = express();

// define the server port
const port = 5001;

// allow this app to receive incoming json request
app.use(bodyParser.json());

// import controller
const LoginController = require("./controllers/login");
const RegistrasiController = require("./controllers/register/register");

// -- create groups routes
// -- Endpoint
app.group("/api/v1", router => {
  //strukturing folder
  router.post("/login", LoginController.index);
  router.post("/register", RegistrasiController.index);
});

// app.group("/api/v1", router => { //using group routes
//   router.get("/login", (req, res) => {
//     res.send("hallo");
//   });
// });

// --- create the homepage route
// app.get("/", (req, res) => {
//   //create route endpoind
//   res.send("hallo septehabudin");
// });

app.listen(port);

// instantiate express module
const express = require("express");
// initiate body-parser
const bodyParser = require("body-parser");
require("express-group-routes");

// -- authenticated
const { authenticated } = require("./middleware/auth");
// -- end authenticated

// use express in app variable
const app = express();

// define the server port
const port = 5001;

// allow this app to receive incoming json request
app.use(bodyParser.json());

// import controller
const LoginController = require("./controllers/login");
const RegistrasiController = require("./controllers/register/register");
const SpeciesController = require("./controllers/species/spesies");
const PetController = require("./controllers/pet/pet");
const UserController = require("./controllers/user/user");

// -- create groups routes
// -- Endpoint
app.group("/api/v1", router => {
  //strukturing folder
  router.post("/login", LoginController.store);
  router.post("/register", RegistrasiController.store);
  // user
  router.get("/user/:id", authenticated, UserController.show);
  router.patch("/user/:id", authenticated, UserController.update);
  router.delete("/user/:id", UserController.destroy);
  // species
  router.post("/species", SpeciesController.store);
  router.get("/species", SpeciesController.index);
  //pet
  router.get("/pet", PetController.index);
  router.get("/pet/:id", PetController.show);
  router.post("/pet", authenticated, PetController.store);
  router.patch("/pet/:id", authenticated, PetController.update);
  router.delete("/pet/:id", authenticated, PetController.destroy);
});

// app.group("/api/v1", router => { //using group routes
//   router.get("/login", (req, res) => {
//     res.send("hallo");
//   });
// });

// --- create the homepage route
app.get("/", (req, res) => {
  //create route endpoind
  res.send(authenticated);
});

app.listen(port);

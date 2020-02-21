// instantiate express module
const express = require("express");
// initiate body-parser
const bodyParser = require("body-parser");
require("express-group-routes");

// -- authenticated
const expressJwt = require("express-jwt");
const authenticated = expressJwt({
  secret: "my-secret-key"
});
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

// -- create groups routes
// -- Endpoint
app.group("/api/v1", router => {
  //strukturing folder
  router.post("/login", LoginController.store);
  router.post("/register", RegistrasiController.store);
  router.post("/species", SpeciesController.store);
  router.get("/species", SpeciesController.index);
  router.get("/pet", PetController.index);
  router.post("/pet", PetController.store);
  router.patch("/pet/:id", PetController.update);
  router.delete("/pet/:id", PetController.destroy);
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

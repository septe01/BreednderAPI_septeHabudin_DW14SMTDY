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
// const port = process.env.PORT || 4000;

// allow this app to receive incoming json request
app.use(bodyParser.json());

// import controller
const LoginController = require("./controllers/login");
const RegistrasiController = require("./controllers/register/register");
const SpeciesController = require("./controllers/species/spesies");
const AgeController = require("./controllers/age/age");
const PetController = require("./controllers/pet/pet");
const UserController = require("./controllers/user/user");
const PaymentController = require("./controllers/payment/payment");
const MatchController = require("./controllers/match/match");

// -- create groups routes
// -- Endpoint
app.group("/api/v1", router => {
  //strukturing folder
  router.post("/login", LoginController.store);
  router.post("/register", RegistrasiController.store);
  // user
  router.get("/user", authenticated, UserController.index);
  router.post("/user", authenticated, UserController.store);
  router.get("/user/:id", authenticated, UserController.show);
  router.patch("/user/:id", authenticated, UserController.update);
  router.delete("/user/:id", UserController.destroy);
  // species
  router.post("/species", SpeciesController.store);
  router.get("/species", SpeciesController.index);
  router.patch("/species/:id", SpeciesController.update);
  router.delete("/species/:id", SpeciesController.delete);
  // Ages
  router.post("/age", AgeController.store);
  router.get("/age", AgeController.index);
  router.patch("/age/:id", AgeController.update);
  router.delete("/age/:id", AgeController.delete);
  //pet
  router.get("/pet", PetController.index);
  router.get("/pet/:id", PetController.show);
  router.post("/pet", authenticated, PetController.store);
  router.patch("/pet/:id", authenticated, PetController.update);
  router.delete("/pet/:id", authenticated, PetController.destroy);
  //payment
  router.get("/payment", authenticated, PaymentController.index);
  router.post("/payment", authenticated, PaymentController.store);
  router.get("/payment/:id", authenticated, PaymentController.show);
  router.patch("/payment/:id", authenticated, PaymentController.update);
  //match
  router.get("/match", authenticated, MatchController.show);
  router.get("/matches", authenticated, MatchController.matchTrue);
  router.post("/match", authenticated, MatchController.store);
  router.post("/matchctf", authenticated, MatchController.autoTrue);
  router.patch("/match/:id", authenticated, MatchController.update);
});

// app.group("/api/v1", router => { //using group routes
//   router.get("/login", (req, res) => {
//     res.send("hallo");
//   });
// });

// --- create the homepage route
app.get("/", (req, res) => {
  //create route endpoind
  res.send("hello septe");
});

app.listen(port);

// instantiate express module
const express = require("express");

// use express in app variable
const app = express();

// define the server port
const port = 5001;

// create the homepage route
app.get("/", (req, res) => {
  res.send("hallo septehabudin");
});

app.listen(port);

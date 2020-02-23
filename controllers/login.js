const jwt = require("jsonwebtoken");
const User = require("../models").user;

exports.store = async (req, res) => {
  const { email, password } = req.body;

  const result = await User.findOne({ where: { email } });
  if (result) {
    if (result.password == password) {
      const token = jwt.sign({ userId: result.id }, "my-secret-key");
      res.send({
        status: 200,
        message: "success",
        email,
        token
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "Password Not Found"
      });
    }
  } else {
    res.status(404).send({
      status: 404,
      message: "Email Not Found"
    });
  }
};

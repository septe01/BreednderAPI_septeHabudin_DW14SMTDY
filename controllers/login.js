const jwt = require("jsonwebtoken");
const User = require("../models").user;

exports.store = async (req, res) => {
  try {
    const { email, password } = req.body;

    const Email = await User.findOne({
      where: { email: email }
    });
    if (Email != null) {
      const Password = await User.findOne({
        where: { password: password }
      }).then(user => {
        if (user) {
          const token = jwt.sign({ userId: user.id }, "my-secret-key");
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
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "Email Not Found"
      });
    }
  } catch (error) {}
};

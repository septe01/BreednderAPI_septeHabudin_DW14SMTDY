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
      });
      if (Password != null) {
        // console.log(Password);
        const token = jwt.sign({ userId: password }, "my-secret-key");
        res.send({
          status: 200,
          message: "success",
          email,
          token
        });
      } else {
        res.send({
          status: 404,
          message: "Password Not Found"
        });
      }
    }
    res.send({
      status: 404,
      message: "Email Not Found"
    });
  } catch (error) {}
};

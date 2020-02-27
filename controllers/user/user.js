const model = require("../../models");
const User = model.user;
const jwtDecode = require("jwt-decode");

exports.userAuth = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const idUser = jwtDecode(token);
    const userAut = await User.findOne({ where: { id: idUser.userId } });
    if (userAut) {
      res.status(200).send({
        status: 200,
        message: "success",
        userAut
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "not found",
        id: idUser
      });
    }
  } catch (error) {
    res.send(error);
  }
};

// --- get data by id
exports.show = (req, res) => {
  // const token = req.headers.authorization;
  const userId = req.params.id; //get id user
  User.findOne({
    where: { id: userId },
    attributes: [
      "breeder",
      "email",
      "password",
      "phone",
      "address",
      "createdAt",
      "updatedAt"
    ]
  }).then(result => {
    if (result) {
      res.status(200).send({
        status: 200,
        message: "success",
        result
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "not found"
      });
    }
  });
};
// !--- end get data by id

// --- update data
exports.update = (req, res) => {
  const id = req.params.id; //get id user
  // const email = req.body.email;
  User.findOne({ where: { id } }).then(result => {
    if (result) {
      User.update(req.body, { where: { id: id } }).then(result => {
        if (result) {
          User.findOne({ where: { id: id } }).then(result => {
            res.status(200).send({
              status: 200,
              message: "success",
              result
            });
          });
        } else {
          res.status(404).send({
            status: 404,
            message: "not found"
          });
        }
      });
    } else {
      res.status(404).send({
        status: 404,
        id,
        message: "not found"
      });
    }
  });
};
// !--- end update data user

// --- store data
exports.store = async (req, res) => {
  try {
    let stts = "";
    req.body.status == null ? (stts = "") : (stts = "admin");

    const data = {
      breeder: req.body.breeder,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      role: stts
    };
    const findEmail = await User.findOne({ where: { email: req.body.email } });
    if (!findEmail) {
      const result = await User.create(data);
      res.send(result);
      if (result) {
        res.status(200).send({
          status: 200,
          message: "success",
          result
        });
      } else {
        res.status(204).send({
          status: 204,
          message: "not content"
        });
      }
    } else {
      res.status(201).send({
        status: 201,
        message: "email is already in use"
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "Bad Request"
    });
  }
};
// !--- end store data user

// --- delete data user
exports.destroy = (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id } }).then(result => {
    if (result) {
      res.status(200).send({
        status: 200,
        message: "success",
        result
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "not found",
        result
      });
    }
  });
};
// !--- end delete data user

// --- get all user
exports.index = async (req, res) => {
  try {
    const result = await User.findAll();
    if (result) {
      res.status(200).send({
        status: 200,
        message: "success",
        result
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "not found"
      });
    }
  } catch (error) {
    res.status().send({
      status: 400,
      message: "bad request"
    });
  }
};
// --- get all user
